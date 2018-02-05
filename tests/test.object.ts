import {Type} from '../lib';

export class TestObject {

  @Type()
  private _objectName: string;

  @Type()
  private _itemOrder: number;


  constructor(objectName: string, itemOrder: number) {
    this._objectName = objectName;
    this._itemOrder = itemOrder;
  }

  get objectName(): string {
    return this._objectName;
  }

  set objectName(value: string) {
    this._objectName = value;
  }

  get itemOrder(): number {
    return this._itemOrder;
  }

  set itemOrder(value: number) {
    this._itemOrder = value;
  }

}
