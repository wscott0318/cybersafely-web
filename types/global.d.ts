import '@apollo/client/core'

declare module '@apollo/client/core' {
  export declare type DefaultContext = {
    teamId?: string
    behalfId?: string
  }
}
