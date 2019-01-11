import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 42;
  padding: 6px 12px;
  background-color: #FAFAFA;
  border-top-width: ${StyleSheet.hairlineWidth};
  border-top-color: #CCC;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
  height: 30;
  padding: 0px 10px;
  background-color: #FFF;
  border-width: 1;
  border-color: #DDD;
  border-radius: 12;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 10;

`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: #358cff;
`;
