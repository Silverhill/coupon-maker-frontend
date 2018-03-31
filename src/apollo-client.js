import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: `http://localhost:7001/graphql` });

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

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: concat(middlewareAuthLink, httpLink),
  cache: new InMemoryCache(),
});

export default client;