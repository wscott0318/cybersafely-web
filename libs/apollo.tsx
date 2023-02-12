import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import React, { useMemo } from 'react'
import { Config } from '../helpers/config'
import { useAlert } from '../utils/context/alert'
import { StorageManager } from '../utils/storage'

type ApolloClientProviderProps = {
  children: React.ReactNode
  schoolId?: string
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
        'x-token': StorageManager.get('token'),
        'x-school-id': props.schoolId ?? StorageManager.get('schoolId'),
      }

      if (typeof context.schoolId === 'string') {
        headers['x-school-id'] = context.schoolId
      }

      operation.setContext({ ...context, headers })

      return forward(operation)
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      const error = graphQLErrors?.[0] ?? networkError

      if (error) {
        pushAlert({
          type: 'alert',
          title: 'Error',
          message: error.message,
        })
      }
    })

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    const cache = new InMemoryCache()

    return new ApolloClient({
      link,
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          nextFetchPolicy: 'no-cache',
          initialFetchPolicy: 'no-cache',
          notifyOnNetworkStatusChange: true,
        },
        query: {
          fetchPolicy: 'no-cache',
          notifyOnNetworkStatusChange: true,
        },
        mutate: {
          fetchPolicy: 'no-cache',
        },
      },
    })
  }, [props.schoolId])

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
