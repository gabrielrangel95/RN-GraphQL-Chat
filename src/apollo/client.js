import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { keys } from './keys';

const httpLink = new HttpLink({
  uri: keys.LINK_HTTP,
});

const wsLink = new WebSocketLink({
  uri: keys.LINK_WS,
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink, // if subscription, will return websocket
  httpLink, // else return normal link
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
