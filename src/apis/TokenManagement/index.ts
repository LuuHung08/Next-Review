import EventEmitter from './EventEmitter';
export default class TokenManagement {
  getAccessToken(): string | PromiseLike<string> {
    throw new Error('Method not implemented.');
  }
  event: any = null;

  isRefreshing: boolean = false;
  refreshTimeout: number = 3000;

  constructor({
    isTokenValid,
    getAccessToken,
    onRefreshToken,
    refreshTimeout = 3000,
  }: {
    isTokenValid: (token: string) => boolean | undefined;
    getAccessToken: () => string;
    onRefreshToken?: (cb: (token: string | null) => void) => void;
    refreshTimeout?: number;
  }) {
    const event = new EventEmitter();
    this.refreshTimeout = refreshTimeout;

    event.on('refresh', () => {
      (async () => {
        try {
          const token: string = await getAccessToken();
          if (isTokenValid(token)) {
            event.emit('refreshDone', token);
          } else {
            event.emit('refreshing');
          }
        } catch (e) {}
      })();
    });

    event.on('refreshing', () => {
      if (this.isRefreshing) {
        return;
      }
      // fetch
      this.isRefreshing = true;

      const evtFire = false;
      onRefreshToken?.((newToken: any) => {
        this.event.emit('refreshDone', newToken);
        this.isRefreshing = false;
      });

      if (this.refreshTimeout) {
        setTimeout(() => {
          if (!evtFire) {
            this.event.emit('refreshDone', null);
            this.isRefreshing = false;
          }
        }, this.refreshTimeout);
      }
    });

    this.event = event;
  }

  getToken() {
    return new Promise((resolve) => {
      let isCalled = false;

      const refreshDoneHandler = (token: string) => {
        resolve(token);
        isCalled = true;
      };

      this.event.once('refreshDone', refreshDoneHandler);

      if (!isCalled) {
        this.event.emit('refresh');
      }
    });
  }

  inject(service: (token: string, params: any) => any) {
    return async (...args: any) => {
      const token = await this.getToken();
      //@ts-ignore
      const response = await service(token, ...args);

      return response;
    };
  }
}
