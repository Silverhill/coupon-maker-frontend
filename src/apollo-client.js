import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client'
import config from './environment';

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwt')
  const authorizationHeader = token ? `${token}` : null
  operation.setContext(({ headers }) => ({
    headers: {
      authentication: authorizationHeader,
      ...headers
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null,
});
const uploadLink = createUploadLink({ uri: config.API_URL});
const stateLink = withClientState({ cache })

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: ApolloLink.from([middlewareAuthLink, stateLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;