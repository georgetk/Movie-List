import React from 'react';
import {StyleSheet} from 'react-native';
import MoviesScreen from './src/screens/MoviesScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <MoviesScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
