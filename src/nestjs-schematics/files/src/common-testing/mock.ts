/**
 * Replaces all methods of a class or interface with Jest mock functions.
 * @template TType Class or interface whose instances are to be mocked.
 */
export type MockObject<TType extends object> = {
  [K in keyof TType]: TType[K] extends (...args: infer TParams) => infer TReturn
    ? jest.Mock<TReturn, TParams>
    : never
}

/**
 * Creates an object whose methods are replaced by Jest mock functions.
 * This is an helper function similar to `jasmine.createSpyObj` that simplifies
 * initialization of mock objects with Jest.
 *
 * @template T Class or interface from which a mock instance should be created.
 * @param methodNames Name of methods to be mocked. Other methods will be
 * `undefined`.
 *
 * @example Mock method `sayHello` of class `MyService`.
 * ```typescript
 * const mockService = mock<MyService>(['sayHello'])
 * ```
 */
export function mock<T extends object>(
  methodNames: ReadonlyArray<keyof T>,
): MockObject<T> {
  return Object.fromEntries(
    methodNames.map((name) => [name, mockFunction(name)]),
  ) as MockObject<T>
}

function mockFunction(property: PropertyKey): jest.Mock {
  return jest.fn().mockName(property.toString())
}
