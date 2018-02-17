import {Injectable} from '@angular/core';

@Injectable()
export class ReflectionService {

  public static classProperties = new Map<Function, Map<string, Function | null>>();

  public static addPropertyType(clazz: Function, propertyName: string, type: Function | null) {

    let mapForClass = ReflectionService.classProperties.get(clazz);
    if (!mapForClass) {
      mapForClass = new Map<string, Function>();
      ReflectionService.classProperties.set(clazz, mapForClass);
    }
    mapForClass.set(propertyName, type);
  }

  public getClassPropertyType(clazz: Function, propertyName: string): Function | null {

    const parents = this.getParents(clazz, {includeSelf: true});

    const classWithProperty = parents.find(
      parent => {
        const parentProperty = ReflectionService.classProperties.get(parent);
        if (parentProperty) {
          return parentProperty.has(propertyName);
        } else {
          return false;
        }
      }
    );

    if (classWithProperty) {
      const clazzProperties = ReflectionService.classProperties.get(classWithProperty);
      if (clazzProperties) {
        const type = clazzProperties.get(propertyName);
        if (!type) {
          return null;
        } else {
          if (type.name) {
            return type;
          }
          return type();
        }
      }
    }

    return null;

  }

  public getObjectPropertyType(obj: Object, propertyName: string): Function | null {
    return this.getClassPropertyType(obj.constructor, propertyName);
  }

  public getObjectProperties(obj: Object, options: { includeClassProperties?: boolean, includeOwnProperties?: boolean } = {
    includeClassProperties: true,
    includeOwnProperties: true
  }): Array<string> {
    let properties: any = [];
    if (options.includeClassProperties) {
      properties = this.getClassProperties(obj.constructor);
    }
    if (options.includeOwnProperties) {
      const ownProps = Object.getOwnPropertyNames(obj);
      ownProps.forEach(
        ownProp => {
          if (properties.indexOf(ownProp) === -1) {
            properties.push(ownProp);
          }
        }
      );
    }
    return properties;
  }

  public getClassProperties(clazz: Function): Array<string> {

    let properties: Array<string> = [];
    const clazzProperties = ReflectionService.classProperties.get(clazz);
    if (clazzProperties) {
      properties = Array.from(clazzProperties.keys());
      this.getParents(clazz).forEach(
        parent => {
          const parentProperties = ReflectionService.classProperties.get(parent);
          if (parentProperties) {
            properties = properties.concat(Array.from(parentProperties.keys()));
          }
        }
      );
    }
    return properties;

  }

  public getParents(clazz: Function, options: { includeSelf?: boolean, includeObject?: boolean } = {
    includeSelf: false,
    includeObject: false
  }): Array<Function> {

    const parents: Array<Function> = [];

    if (options.includeSelf) {
      parents.push(clazz);
    }

    function addParent(childClass: Function) {
      if (Object.getPrototypeOf(childClass.prototype)) {
        const parent = Object.getPrototypeOf(childClass.prototype).constructor;
        if (parent && (options.includeObject || parent !== Object)) {
          parents.push(parent);
          addParent(parent);  // Recur
        }
      }
    }

    addParent(clazz);

    return parents;
  }

}
