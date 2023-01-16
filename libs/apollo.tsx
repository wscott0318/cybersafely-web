import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import React, { useMemo } from 'react'
import { Config } from '../helpers/config'
import { useAlert } from '../utils/context/alert'

type ApolloClientProviderProps = {
  children: React.ReactNode
}

export function ApolloClientProvider(props: ApolloClientProviderProps) {
  const { pushAlert } = useAlert()

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: Config.apiUrl,
    })

    const authLink = new ApolloLink((operation, forward) => {
      const context = operation.getContext()

      const headers = {
        ...context.headers,
        'x-token': localStorage.getItem('token'),
        'x-team-id': localStorage.getItem('teamId'),
      }

      if (typeof context.teamId === 'string') {
        headers['x-team-id'] = context.teamId
      }
      if (typeof context.behalfId === 'string') {
        headers['x-behalf-id'] = context.behalfId
      }

      operation.setContext({ ...context, headers })

      return forward(operation)
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      const error = graphQLErrors?.[0] ?? networkError

      if (error) {
        pushAlert('Error', error.message)
      }
    })

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    const cache = new InMemoryCache()

    return new ApolloClient({
      link,
      cache,
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
  }, [])

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
