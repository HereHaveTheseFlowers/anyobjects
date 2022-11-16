/* eslint-disable @typescript-eslint/ban-ts-comment */
import { set } from './helpers';
import { EventBus } from './EventBus';

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    let eventname = keypath
    if(eventname.includes('.')) {
      eventname = keypath.substring(0, keypath.indexOf('.'));
    }
    this.emit(eventname, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
//window.store = store;

export default store;
