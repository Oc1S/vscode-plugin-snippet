import { DrawerProps } from '.';

type Subscriber = (drawer: DrawerProps) => void;

class Observer {
  subscribers: Array<Subscriber>;

  constructor() {
    this.subscribers = [];
  }

  // We use arrow functions to maintain the correct `this` reference
  subscribe = (subscriber: Subscriber) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  addToast = (data: DrawerProps) => {
    this.subscribers.forEach(subscriber => subscriber(data));
  };

  create = (data: DrawerProps) => {
    const { ...rest } = data;

    const dismissible = data.dismissible ?? true;

    this.addToast({ title: message, ...rest, dismissible, id });

    return id;
  };

  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach(toast => {
        this.subscribers.forEach(subscriber =>
          subscriber({ id: toast.id, dismiss: true })
        );
      });
    }

    this.subscribers.forEach(subscriber => subscriber({ id, dismiss: true }));
    return id;
  };
}

export const ToastState = new Observer();

const basicToast = (message: JSX.Element, data?: ExternalToast) => {
  ToastState.addToast({
    title: message,
    ...data,
  });
  return id;
};

export const toast = Object.assign(basicToast, {
  dismiss: ToastState.dismiss,
});
