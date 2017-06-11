import localForage from 'localforage';

const reduxLocalForage = localForage.createInstance({
  name: 'LocalSmoke',
  storeName: 'localForage-redux-persist',
  description: 'Contains persisted values for redux store.',
});

export default reduxLocalForage;
