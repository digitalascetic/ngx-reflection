import {TestObject} from './test.object';
import {Type} from '../src';

export class TestObjectHolder {

  @Type()
  private _name: string;

  @Type(() => TestObject)
  private _testObject: TestObject;

  constructor(name: string, testObject: TestObject) {
    this._name = name;
    this._testObject = testObject;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get testObject(): TestObject {
    return this._testObject;
  }

  set testObject(value: TestObject) {
    this._testObject = value;
  }
}
