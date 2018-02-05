import {ReflectionService} from './reflection.service';

/**
 * Defines Type for a property, it's safer to use a function
 * that returns the type as the argument instead of the type itself
 *
 * @param {Function} type
 * @returns {(target: any, propertyKey: string) => void}
 * @constructor
 */
export function Type(type: Function | null = null) {
  return function (target: any, propertyKey: string) {
    ReflectionService.addPropertyType(target.constructor, propertyKey, type);
  };
}

// This system address problem with circular reference in classes and class load ordering
// allows to reference as Type types not still defined (loaded)
// See https://github.com/Microsoft/TypeScript/issues/4521



