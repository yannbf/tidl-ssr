export {}
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveDispatched(action): R
    }
  }

  interface Window {
    GA_INITIALIZED: boolean
  }
}
