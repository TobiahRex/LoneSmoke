import localForage from 'localforage';

const reduxLocalForage = localForage.createInstance({
  name: 'LocalSmoke',
  storeName: 'LocalSmoke-redux-persist',
  description: 'Contains persisted values for redux store.',
});

export default reduxLocalForage;
