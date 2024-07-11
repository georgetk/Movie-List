import {Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useNotchHeight = (): number => {
  const insets = useSafeAreaInsets();

  const ANDROID_DEFAULT_HEIGHT = 30;
  const IOS_ADDITIONAL_HEIGHT = 5;

  if (Platform.OS === 'android') {
    let androidHeight = ANDROID_DEFAULT_HEIGHT;
    if (StatusBar.currentHeight) {
      androidHeight = StatusBar.currentHeight / 3;
    }
    return androidHeight;
  } else {
    let iOSHeight = insets.top + IOS_ADDITIONAL_HEIGHT;
    return iOSHeight;
  }
};
