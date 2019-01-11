import * as React from 'react';
import { StatusBar, Platform, ActivityIndicator } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Author,
  Bubble,
  Container,
  KeyboardSafeView,
  Message,
  ScrollView,
  ScrollViewContentContainer,
  LoadingStyle,
} from './style';
import { Input } from './components';

const author = 'UserOne';

const ConversationQuery = gql`
  query {
    allMessages(
      orderBy: createdAt_ASC
    ) {
      id
      from
      message
    }
  }
`;

class Chat extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    const { conversation } = this.props;
    // will subscribe for new queries
    // and will subscribe the queries that arent from the current author (userone)
    conversation.subscribeToMore({
      document: gql`
        subscription onMessageAdded($author: String!) {
          Message(filter: {
            mutation_in: [CREATED]
            node: {
              from_not: $author
            }
          }) {
            node {
              id
              from
              message
            }
          }
        }
      `,
      variables: {
        author,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.Message) return prev;

        const newItem = subscriptionData.data.Message.node;

        return { ...prev, allMessages: [...prev.allMessages, newItem] };
      },
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated: false });
    }, 0);
  }

  renderChat = () => {
    const { conversation } = this.props;
    const { allMessages } = conversation;
    return allMessages.map(item => (
      <Bubble
        key={item.id}
        right={item.from === author && true}
      >
        <Author>{item.from}</Author>
        <Message>{item.message}</Message>
      </Bubble>
    ));
  }

  handleAddMessage = (proxy, { data: { createMessage } }) => {
    const data = proxy.readQuery({
      query: ConversationQuery,
    });

    data.allMessages.push(createMessage);

    proxy.writeQuery({
      query: ConversationQuery,
      data,
    });
  }


  render() {
    const { conversation } = this.props;
    return (
      <Container>
        <KeyboardSafeView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView
            // eslint-disable-next-line no-return-assign
            ref={scrollView => this.scrollView = scrollView}
            keyboardShouldPersistTaps="never"
            contentContainerStyle={ScrollViewContentContainer}
          >
            {
              conversation.loading ? (
                <ActivityIndicator style={LoadingStyle} />
              ) : this.renderChat()
            }
          </ScrollView>
          <Input author={author} onAddMessage={this.handleAddMessage} />
        </KeyboardSafeView>
      </Container>
    );
  }
}

const WithGraphQL = graphql(ConversationQuery, {
  name: 'conversation',
})(Chat);
export { WithGraphQL as Chat };
