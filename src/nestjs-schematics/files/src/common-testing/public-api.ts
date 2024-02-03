/**
 * Only exposes public members of a type.
 *
 * The main purpose of this type is to make it easier to define fake
 * implementations of a service in tests by implementing the service class, not
 * requiring to implement its constructor and private/protected members.
 *
 * @example
 * class HelloService {
 *   constructor(private readonly message: string) {}

 *   greet() {
 *     console.log(this.message)
 *   }
 * }
 *
 * class FakeHelloService implements PublicApi<HelloService> {
 *   greet() {
 *     console.log('Fake hello')
 *   }
 * }
 */
export type PublicApi<T> = {
  [K in keyof T]: T[K]
}
