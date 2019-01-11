import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Chat } from './screens';
import client from './apollo/client';

const App = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);

export { App };
