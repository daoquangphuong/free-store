import Store from './Store';

export default function createStore(name, initialValue) {
  return new Store(name, initialValue);
}
