class Store {
  constructor(initialState) {
    this._nextSubId = 0;
    this._state = initialState;
    this._subscribers = [];
  }

  subscribe(onChange) {
    const subId = ++this._nextSubId;
    this._subscribers.push({id: subId, fn: onChange});
    return () => {
      const idx = this._subscribers.findIndex(({id}) => id === subId);
      this._subscribers.splice(idx, 1);
    };
  }

  set state(newState) {
    this._state = newState;
    this._subscribers.forEach(({fn}) => fn(this._state));
  }

  get state() {
    return this._state;
  }
}

export function createStore(initialState = {}) {
  return new Store(initialState);
}
