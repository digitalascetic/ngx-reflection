import {TestObject} from './test.object';

export class ChildTestObject extends TestObject {

  private _childOrder: number;

  constructor(objectName: string, itemOrder: number, childOrder: number) {
    super(objectName, itemOrder);
    this._childOrder = childOrder;
  }

  get childOrder(): number {
    return this._childOrder;
  }

  set childOrder(value: number) {
    this._childOrder = value;
  }
}
