window.GlobalStore = {};

class Store {
  constructor(name, initialState) {
    this.name = name;
    this.initialState = initialState;
    this.state = this.initialState;
    this.subStoreMap = {};
    this.listeners = [];
    if (process.env.NODE_ENV !== 'production') {
      if (this.name in window.GlobalStore) {
        this.state = window.GlobalStore[this.name];
      } else {
        window.GlobalStore[this.name] = this.state;
      }
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(i => i !== listener);
  }

  getState() {
    return this.state;
  }

  setState(callback) {
    if (this.isSetState) {
      throw new Error('Store is updating');
    }
    try {
      this.isSetState = true;
      const { state } = this;
      this.state = callback(state);
      if (state === this.state) {
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        window.GlobalStore[this.name] = this.state;
        // eslint-disable-next-line
        const { difference, getConsoleLog } = require('./diff');
        const dif = difference(
          { [this.name]: state },
          { [this.name]: this.state }
        );
        const { groupCollapsed, groupEnd } = console;
        (groupCollapsed || console.info)(
          `%c Store: %c ${this.name}`,
          `background: blue; color: white`,
          `color: blue`,
          {
            OLD: state,
            NEW: this.state
          }
        );
        console.info(...getConsoleLog(dif));
        groupEnd && groupEnd();
      }
    } finally {
      this.isSetState = false;
    }

    setTimeout(() => {
      const { listeners } = this;

      listeners.forEach(listener => {
        listener();
      });
    }, 0);
  }

  subStore(name) {
    this.subStoreMap[name] =
      this.subStoreMap[name] || new Store(`${this.name}:${name}`);
    return this.subStoreMap[name];
  }
}

export default Store;
