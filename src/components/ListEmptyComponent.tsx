import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const ListEmptyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No items</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default ListEmptyComponent;
