import {Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useNotchHeight = () => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    return StatusBar.currentHeight ? StatusBar.currentHeight / 3 : 30;
  } else {
    return insets.top + 5;
  }
};
