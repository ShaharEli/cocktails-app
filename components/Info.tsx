import React from 'react';
import {View, Text} from 'react-native';

export function Info({info, navigation}: {info: string; navigation: any}) {
  return (
    <View>
      <Text>{info}</Text>
    </View>
  );
}
