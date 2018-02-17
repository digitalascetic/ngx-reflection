import {TestObject} from './test.object';
import {TestObjectHolder} from './test.object.holder';
import {ChildTestObject} from './child.test.object';
import {ReflectionService} from '../src';

describe('Metadata tests', () => {

  const reflectionService: ReflectionService = new ReflectionService();

  it('should correctly get primitive class properties from annotated class', () => {

    const testObjectProps = reflectionService.getClassProperties(TestObject);

    expect(testObjectProps).toBeDefined();
    expect(testObjectProps.length).toBeDefined();
    expect(testObjectProps.length).toBe(2);
    expect(testObjectProps.indexOf('_objectName')).toBeGreaterThan(-1);
    expect(testObjectProps.indexOf('_itemOrder')).toBeGreaterThan(-1);

  });

  it('should correctly get primitive class properties from annotated class object', () => {

    const testObject: TestObject = new TestObject('test', 0);

    const testObjectProps = reflectionService.getObjectProperties(testObject);

    expect(testObjectProps).toBeDefined();
    expect(testObjectProps.length).toBeDefined();
    expect(testObjectProps.length).toBe(2);
    expect(testObjectProps.indexOf('_objectName')).toBeGreaterThan(-1);
    expect(testObjectProps.indexOf('_itemOrder')).toBeGreaterThan(-1);

  });

  it('should correctly get class property type', () => {

    const testObjectType: Function | null = reflectionService.getClassPropertyType(TestObjectHolder, '_testObject');
    expect(testObjectType).toBeDefined();
    expect(testObjectType).toBe(TestObject);

    const nameType: Function | null = reflectionService.getClassPropertyType(TestObjectHolder, '_name');
    expect(nameType).toBeDefined();
    expect(nameType).toBeNull();

  });

  it('should correctly get object property type', () => {

    const testObject: TestObject = new TestObject('test', 0);

    const testObjectHolder: TestObjectHolder = new TestObjectHolder('test', testObject);

    const testObjectType: Function | null = reflectionService.getObjectPropertyType(testObjectHolder, '_testObject');
    expect(testObjectType).toBeDefined();
    expect(testObjectType).toBe(TestObject);

    const nameType: Function | null = reflectionService.getClassPropertyType(TestObjectHolder, '_name');
    expect(nameType).toBeDefined();
    expect(nameType).toBeNull();

  });

  it('should correctly get parents', () => {

    const parents = reflectionService.getParents(ChildTestObject);

    expect(parents).toBeDefined();
    expect(parents.length).toBeDefined();
    expect(parents.length).toBe(1);
    expect(parents[0]).toBe(TestObject);

  });

});
