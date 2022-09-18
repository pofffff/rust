import {
    ApolloClient,
    InMemoryCache,
    PossibleTypesMap,
    createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// import introspection from '@hultafors/hultafors-api'
  
  export const createGraphQLClient = (
    datoEndpoint: string,
    datoToken: string,
    introspection: { possibleTypes: PossibleTypesMap }
  ) => {
    const httpLink = createHttpLink({
      uri: datoEndpoint,
    });
  
    const cache = new InMemoryCache({
      possibleTypes: introspection.possibleTypes,
    });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: Object.assign(headers || {}, {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${datoToken}`,
        }),
      };
    });
  
    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: cache,
    });
  
    return apolloClient;
  };