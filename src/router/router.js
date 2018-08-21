const initRouter = () => {
  let url = window.location.pathname;
  window.history.replaceState(url, null, url);

  const subscribers = [];

  const router = {};

  router.subscribe = (listener) => {
    subscribers.push(listener);
    listener(url);
  };

  router.go = (newUrl) => {
    window.history.pushState(newUrl, null, newUrl);
    url = newUrl;
    subscribers.forEach(subscriber => subscriber(url));
  };

  window.addEventListener('popstate', (event) => {
    url = event.state;
    subscribers.forEach(subscriber => subscriber(url));
  });

  return router;
};

const router = initRouter();

export const withRouteEvent = handler => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();

      router.subscribe((url) => {
        handler(url, this);
        this.update();
      });
    }
  };

export const withRouteAction = (handlerName = 'go') => Base =>
  class extends Base {
    [handlerName](url) {
      router.go(url);
    }
  };
