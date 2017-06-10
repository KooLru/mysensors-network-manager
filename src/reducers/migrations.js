const migrations = [
  networks => networks, // Need this for the greater good
];

export const currentVersion = migrations.length;

export default (state, action) => {
  if(action.type !== 'MIGRATE') return state;

  return {
    ...state,
    networks: migrations.slice(state.version ? state.version - 1 : 0).reduce((acc, migrate) => {
      return acc.map(migrate);
    }, state.networks),
    version: migrations.length
  }
}
