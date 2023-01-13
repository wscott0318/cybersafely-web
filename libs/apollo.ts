import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { Config } from '../helpers/config'

const httpLink = new HttpLink({
  uri: Config.apiUrl,
})

const authLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext()

  const headers = {
    ...context.headers,
    'x-token': localStorage.getItem('token'),
    'x-org-id': localStorage.getItem('orgId'),
  }

  if (typeof context.orgId === 'string') {
    headers['x-org-id'] = context.orgId
  }
  if (typeof context.behalfId === 'string') {
    headers['x-behalf-id'] = context.behalfId
  }

  operation.setContext({ ...context, headers })

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
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
})
