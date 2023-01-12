import '@apollo/client/core'

declare module '@apollo/client/core' {
  export declare type DefaultContext = {
    orgId?: string
    behalfId?: string
  }
}
