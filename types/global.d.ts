import '@apollo/client/core'

declare module '@apollo/client/core' {
  export interface DefaultContext {
    schoolId?: string
  }
}
