import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { Config } from '../helpers/config'

const httpLink = new HttpLink({
  uri: Config.apiUrl,
})

const authLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext()

  operation.setContext({
    ...context,
    headers: {
      ...context.headers,
      'x-token': localStorage.getItem('token'),
    },
  })

  return forward(operation)
})

const link = ApolloLink.from([authLink, httpLink])

export const Client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      initialFetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
})
