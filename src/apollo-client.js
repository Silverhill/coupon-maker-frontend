import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'

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

const uploadLink = createUploadLink({ uri: `http://localhost:7001/graphql`});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: concat(middlewareAuthLink, uploadLink),
  cache: new InMemoryCache(),
});

export default client;