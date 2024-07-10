import {Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useNotchHeight = (): number => {
  const insets = useSafeAreaInsets();

  const ANDROID_DEFAULT_HEIGHT = 30;
  const IOS_ADDITIONAL_HEIGHT = 5;

  if (Platform.OS === 'android') {
    return StatusBar.currentHeight
      ? StatusBar.currentHeight / 3
      : ANDROID_DEFAULT_HEIGHT;
  } else {
    return insets.top + IOS_ADDITIONAL_HEIGHT;
  }
};
