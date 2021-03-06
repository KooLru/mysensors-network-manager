import React from 'react';

import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import Collapsible from './Collapsible';
import NotFound from './NotFound';
import { NavPage } from './Layouts';
import { InlineLabel, RightAlignedLabel } from './FormLabels';
import { Checkbox } from './FormControls';
import { AnalogPins } from './Pins';
import PageMenu from './PageMenu';
import Sensor from './Sensor';
import SensorPicker from './SensorPicker';
import TimeInput from './TimeInput';
import { Button } from './Buttons';
import BoardPicker from './BoardPicker';

import { css } from 'glamor';
import { PageHeading } from '../styles/blocks';
import { pageSubheading, subheading } from '../styles/typography';
import { info } from '../styles/forms';

export const Form = ({ network, node, handlers }) => {
  let addSensorDropdown;
  const chip = (node.type === 'gateway' && node.gatewayType === 'esp8266') ? 'esp8266' : 'atmega328';

  return (
    <ColumnContainer>
      <LeftColumn>
        <div>
          {node.type !== 'gateway' && (
            <div>
              <RightAlignedLabel label='Name this node'>
                <input type='text' value={node.name}
                  onChange={e => handlers.setName(e.target.value)} />
                <p className={info}>
                  Example: 'MotionSensor', or 'GardenLights'
                </p>
              </RightAlignedLabel>

              <RightAlignedLabel label='Board'>
                <BoardPicker filter={b => b.chip === chip}
                  value={node.board}
                  recommended='pro8MHzatmega328'
                  onChange={e => handlers.setBoard(e.target.value)} />
                <p className={info}>
                  Pick the board that you are basing the node on.
                </p>
              </RightAlignedLabel>
            </div>
          )}

          {network.radio === 'NRF24L01+' && (
            <InlineLabel
              label={'This node uses the NRF24L01+ PA+LNA module with a good power supply.'}
              info='The power supply should be able to supply 100 mA bursts.'>
              <Checkbox checked={node.pa} onChange={e => handlers.setPA(e.target.checked)} />
            </InlineLabel>
          )}

          {network.radio === 'RFM69' && (
            <InlineLabel label={'This node uses the RFM69HW module with a good power supply.'}
              info='The power supply should be able to supply 130mA bursts.'>
              <Checkbox checked={node.hw} onChange={e => handlers.setHW(e.target.checked)} />
            </InlineLabel>
          )}

          {node.type !== 'gateway' && (
            <div>
              <InlineLabel label='This node is battery-powered'>
                <Checkbox checked={node.battery.powered}
                  onChange={e => handlers.setBatteryPowered(e.target.checked)} />
              </InlineLabel>
            </div>
          )}

          {node.type !== 'gateway' && node.battery.powered && (
            <div>
              <RightAlignedLabel label='Sleep for'>
                <TimeInput
                  value={node.sleepTime}
                  unit={node.sleepUnit}
                  onValueChange={e => handlers.setSleepTime(parseInt(e.target.value, 10))}
                  onUnitChange={e => handlers.setSleepUnit(e.target.value)}
                  />
              </RightAlignedLabel>
            </div>
          )}

          <h3 className={subheading}>Sensors</h3>

          {
            node.sensors.length > 0 && (
              <ul className={css({marginBottom: 10, listStyle: 'none', padding: 0})}>
                {node.sensors.map((sensor, sensorIndex) => (
                  <li key={sensorIndex}>
                    <Sensor {...{ node, sensorIndex, sensor, handlers }} />
                  </li>
                ))}
              </ul>
            )
          }


          <form onSubmit={e => {
              e.preventDefault();
              handlers.addSensor(addSensorDropdown.value);
            }}>
            Add {node.sensors.length ? 'another' : 'a'} sensor
            {' '}
            <SensorPicker dropdownRef={r => addSensorDropdown = r}
              className={css({ display: 'inline-block', marginRight: 10 })} />
            <Button type='submit'>Add</Button>
          </form>
        </div>
      </LeftColumn>
      <RightColumn>
        {node.battery.powered && (
          <fieldset>
            <legend>Battery measurement</legend>

            <RightAlignedLabel label='Battery voltage range'>
              <div className={css({display: 'table'})}>
                <div className={css({display: 'table-cell', paddingRight: 10})}>
                  <input type='number' min='0' max='24' step='0.1' pattern='\d*'
                    value={node.battery.min} onChange={e => handlers.setBatteryMin(parseFloat(e.target.value))} />
                  <p className={info}>Min</p>
                </div>
                <div className={css({display: 'table-cell'})}>
                  <input type='number' min='0' max='24' step='0.1' pattern='\d*'
                    value={node.battery.max} onChange={e => handlers.setBatteryMax(parseFloat(e.target.value))} />
                  <p className={info}>Max</p>
                </div>
              </div>
            </RightAlignedLabel>

            <RightAlignedLabel label='Measure battery voltage'>
              <select value={node.battery.measure} onChange={e => handlers.setMeasure(e.target.value)}>
                <option value='internal'>internally, using the Vcc voltage</option>
                <option value='external'>externally, using an analog pin</option>
              </select>
            </RightAlignedLabel>

            {node.battery.measure === 'external' && (
              <RightAlignedLabel label='Measurement pin'>
                <AnalogPins value={node.battery.measurePin}
                  onChange={e => handlers.setMeasurePin(e.target.value)} />
              </RightAlignedLabel>
            )}

            {node.battery.measure === 'external' && (
              <RightAlignedLabel label='Volts per bit'>
                <input type='text' value={node.battery.voltsPerBit}
                  onChange={e => handlers.setVoltsPerBit(e.target.value)} />
                <p className={info}>
                  This value depends on your choice of voltage divider resistors.
                </p>
              </RightAlignedLabel>
            )}
          </fieldset>
        )}

        <Collapsible trigger='Security settings' withBg={true}>
          <RightAlignedLabel label='Sign messages using'>
            <select value={node.signing} onChange={e => handlers.setSigning(e.target.value)}>
              <option value='software'>software signing</option>
              <option value='atsha204'>an ATSHA204A chip</option>
            </select>
          </RightAlignedLabel>

          {node.signing === 'software' && (
            <RightAlignedLabel label='Random seed pin'>
              <AnalogPins value={node.softSigningPin}
                onChange={e => handlers.setSoftSigningPin(e.target.value)} />
              <p className={info}>
                It is important to keep this pin floating. Do not connect it to anything.
              </p>
            </RightAlignedLabel>
          )}

          {node.signing !== 'software' && (
            <RightAlignedLabel label='ATSHA204A pin'>
              <AnalogPins value={node.atshaSigningPin}
                onChange={e => handlers.setAtshaSigningPin(e.target.value)} />
            </RightAlignedLabel>
          )}

          {node.signing === 'software' && (
            <RightAlignedLabel label='Device key'>
              <input type='text' value={node.key} required
                pattern='[0-9a-fA-F]{18}|(0x[0-9a-fA-F]{2}\s*,\s*){9}'
                onChange={e => handlers.setDeviceKey(e.target.value)} />
              <p className={info}>A 9 byte device ID, used for whitelisting</p>
            </RightAlignedLabel>
          )}
        </Collapsible>
      </RightColumn>
    </ColumnContainer>
  )
}

export default props => {
  const { networks, match } = props;

  const networkId = match.params.networkId;
  const network = networks.find(n => n.id === networkId);
  if(!network) return <NotFound />

  const node = network.nodes.find(n => n.id === match.params.nodeId);
  if(!node) return <NotFound />

  const handlers = props.createHandlers(networkId, node.id);

  return (
    <NavPage {...props}>
      <PageMenu network={network} node={node} handlers={handlers} view='edit' />

      <PageHeading>
        {node.name || 'Unnamed node'}
      </PageHeading>

      <p className={pageSubheading}>
        Describe how this node is built
      </p>

      <Form network={network} node={node} handlers={handlers} />
    </NavPage>
  )
};
