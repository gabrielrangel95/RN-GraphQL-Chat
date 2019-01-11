import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2c4241;
  padding-top: ${Platform.OS === 'ios' ? 24 : 0};
`;

export const KeyboardSafeView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`

`;

export const ScrollViewContentContainer = {
  padding: 12,
};

export const Bubble = styled.View`
  padding: 6px;
  background-color: ${props => (props.right ? '#D1EDC1' : '#F5F5F5')};
  border-radius: 6;
  shadow-color: rgba(0,0,0, 0.5);
  shadow-offset: { width: 0; height: 1};
  shadow-opacity: 0.5;
  shadow-radius: 0;
  margin-top: 12;
  max-width: ${SCREEN_WIDTH - 60};
  align-self: ${props => (props.right ? 'flex-end' : 'flex-start')};
`;

export const Author = styled.Text`
  font-weight: bold;
  margin-bottom: 4;
  color: #333;
`;

export const Message = styled.Text`
  font-size: 16;
  color: #333;
`;

export const LoadingStyle = {
  paddingTop: 24,
  color: '#FFF',
};
