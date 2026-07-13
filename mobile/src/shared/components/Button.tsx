import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ children, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
