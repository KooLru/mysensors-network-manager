import { generateId } from '../lib/utils';
import { generateHexNumber } from '../lib/utils';

import gatewayReducer from './gateway';
import nodeReducer from './node';

const defaultNode = _ => ({
  name: 'MyNode',
  board: 'pro8MHzatmega328',
  type: 'node',
  key: generateHexNumber(18),
  pa: false,
  hw: false,
  battery: {
    powered: false,
    min: 2.5,
    max: 3.3,
    measure: 'internal',
    measurePin: 'A0',
    voltsPerBit: 0.003363075
  },
  sleepTime: 60,
  sleepUnit: 'minutes',
  sensors: [],
  signing: 'software',
  softSigningPin: 'A7',
  atshaSigningPin: 'A3'
});

const defaultGateway = _ => ({
  ...defaultNode(),

  id: generateId(),
  name: 'Gateway',

  type: 'gateway',
  gatewayType: 'serial',
  key: generateHexNumber(18),
  ethernet: {
    dhcp: true,
    module: 'w5100',
    ip: '192.168.1.10',
    gateway: '192.168.1.1',
    subnet: '255.255.255.0'
  },
  wifi: { ssid: '', password: '' },
  conn: {
    type: 'server',
    serverPort: 5003,
    serverMaxClients: 1,
    controllerIp: '',
    controllerPort: 5003,
    mqttHost: '',
    mqttPort: 1883
  }
});

export default (state = [], action) => {
  const modify = propName => state.map(network => {
    if(network.id !== action.networkId) return network;
    return { ...network, [propName]: action[propName] };
  })

  switch(action.type) {
    case 'CREATE_NETWORK': return [
      ...state,
      {
        ...action.network,
        hmac: generateHexNumber(64),
        aes: generateHexNumber(32),
        nodes: [{ ...defaultGateway() }]
      }
    ];

    case 'DELETE_NETWORK':
      const networkIndex = state.findIndex(n => n.id === action.networkId);
      if(networkIndex === -1) return state;
      return [
        ...state.slice(0, networkIndex),
        ...state.slice(networkIndex + 1)
      ];

    case 'ADD_NODE': return [
      ...state.map(network => {
        if(network.id !== action.networkId) return network;
        return {...network, nodes: [
          ...network.nodes,
          { id: action.id, ...defaultNode() }
        ]}
      })
    ]
    case 'CHANGE_RADIO': return modify('radio')
    case 'CHANGE_CHANNEL': return modify('nrfChannel');
    case 'CHANGE_FREQUENCY': return modify('rfmFrequency');
    case 'CHANGE_HMAC': return modify('hmac');
    case 'CHANGE_AES': return modify('aes');

    default: break;
  }

  if(action.type.indexOf('GATEWAY/') === 0) {
    return state.map(network => {
      if(network.id !== action.networkId) return network;

      return {
        ...network,
        nodes: network.nodes.map(node => {
          if(node.type !== 'gateway') return node;
          return gatewayReducer(node, action);
        })
      };
    })
  }

  if(action.type === 'NODE/DELETE') {
    return state.map(network => {
      if(network.id !== action.networkId) return network;

      const nodeIndex = network.nodes.findIndex(n => n.id === action.nodeId);

      return {
        ...network,
        nodes: [
          ...network.nodes.slice(0, nodeIndex),
          ...network.nodes.slice(nodeIndex + 1)
        ]
      }
    })
  }

  if(action.type.indexOf('NODE/') === 0) {
    return state.map(network => {
      if(network.id !== action.networkId) return network;

      return {
        ...network,
        nodes: network.nodes.map(node => {
          if(node.id !== action.nodeId) return node;
          return nodeReducer(node, action);
        })
      };
    })
  }

  return state;
}
