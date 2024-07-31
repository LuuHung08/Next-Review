export default class CustomEventEmitter {
  events: any;
  constructor() {
    this.events = {};
  }

  _getEventListByName(event: string) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = new Set();
    }
    return this.events[event];
  }

  // Đăng ký một listener cho một sự kiện
  on(event: string, fn: (...args: any[]) => void) {
    this._getEventListByName(event).push(fn);
  }

  // Đăng ký một listener chỉ chạy một lần
  once(event: string, fn: (...args: any[]) => void) {
    const onceListener = (...args: any[]) => {
      fn.apply(this, args);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }

  // Hủy bỏ một listener cho một sự kiện
  off(event: string, fn: (...args: any[]) => void) {
    if (!this._getEventListByName(event)) return;

    this.events[event] = this._getEventListByName(event).filter(
      (registeredListener: (...args: any[]) => void) => registeredListener !== fn,
    );
  }

  // Phát một sự kiện với các tham số
  emit(event: string, ...args: any[]) {
    if (!this._getEventListByName(event)) return;

    this._getEventListByName(event).forEach((fn: (...args: any[]) => void) => {
      fn.apply(this, args);
    });
  }

  // Hủy bỏ tất cả các listener cho một sự kiện
  removeAllListeners(event: string, fn: (...args: any[]) => void) {
    if (this._getEventListByName(event)) {
      this._getEventListByName(event).delete(fn);
    }
  }
}
