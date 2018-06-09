import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws';
import { toIdValue, getMainDefinition } from 'apollo-utilities';
import config from './environment';

const token = localStorage.getItem('jwt');
const authorizationHeader = token ? `${token}` : null;
const uploadLink = createUploadLink({ uri: config.API_URL});
const wsLink = new WebSocketLink({
  uri: config.wsEndpoint,
  options: {
    reconnect: true,
    connectionParams: {
      authentication: authorizationHeader,
    }
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  uploadLink,
);
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      myCampaigns: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'PaginatedCampaigns', id })),
    },
  },
  dataIdFromObject: object => object.key || null,
});
const stateLink = withClientState({ cache })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      authentication: authorizationHeader,
      ...headers
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: ApolloLink.from([middlewareAuthLink, stateLink, link]),
  cache: new InMemoryCache(),
});

export default client;