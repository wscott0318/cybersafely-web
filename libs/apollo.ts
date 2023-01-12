import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Config } from '../helpers/config'

export const Client = new ApolloClient({
  uri: Config.apiUrl,
  cache: new InMemoryCache(),
})
