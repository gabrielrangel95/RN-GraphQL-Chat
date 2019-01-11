import * as React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Button,
  ButtonText,
  InputContainer,
  MessageInput,
} from './style';

class Input extends React.Component {
  state = {
    message: '',
  }

  addMessage = async () => {
    const { author } = this.props;
    const { message } = this.state;
    if (message.length > 0) {
      await this.props.addMessage({ author, message });
    }
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    return (
      <InputContainer>
        <MessageInput
          value={message}
          onChangeText={text => this.setState({ message: text })}
        />
        <Button onPress={this.addMessage}>
          <ButtonText>Send</ButtonText>
        </Button>
      </InputContainer>
    );
  }
}

const AddMessageMutation = gql`
  mutation(
    $author: String!
    $message: String!
  ) {
    createMessage(
      from: $author
      message: $message
    ) {
      id
      from
      message
    }
  }
`;

const WithGraphQL = graphql(AddMessageMutation, {
  props: ({ ownProps, mutate }) => ({
    addMessage: ({ author, message }) => mutate({
      variables: { author, message },
      update: ownProps.onAddMessage
    })
  })
})(Input);
export { WithGraphQL as Input };
