import React from 'react';
import { View, Text } from 'react-native';

export default function MapMarker({ title }: { title?: string }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
