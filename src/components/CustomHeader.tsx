import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNotchHeight} from '../hooks/useNotchHeight';
import {Icons} from '../constants/images';

type TCustomHeaderProps = {
  searchText: string;
  isSearchActive: boolean;
  setSearchText: (text: string) => void;
  setIsSearchActive: (isActive: boolean) => void;
};

const CustomHeader = ({
  searchText,
  setSearchText,
  isSearchActive,
  setIsSearchActive,
}: TCustomHeaderProps) => {
  const textInputRef = useRef<TextInput>(null);
  const topHeight = useNotchHeight();

  useEffect(() => {
    if (isSearchActive) {
      textInputRef.current?.focus();
    }
  }, [isSearchActive]);

  const toggleSearchActive = () => {
    setSearchText('');
    setIsSearchActive(!isSearchActive);
  };

  return (
    <View style={styles.headerMainContainer}>
      <View style={{...styles.headerHeightContainer, height: topHeight}} />
      <ImageBackground source={Icons.navBar}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Image source={Icons.back} style={styles.headerLeftImage} />
            </TouchableOpacity>
            {isSearchActive ? (
              <TextInput
                ref={textInputRef}
                style={styles.headerTextInput}
                value={searchText}
                onChangeText={setSearchText}
              />
            ) : (
              <Text style={styles.headerTitle}>Romantic Comedy</Text>
            )}
          </View>
          <TouchableOpacity onPress={toggleSearchActive}>
            <Image
              source={isSearchActive ? Icons.close : Icons.search}
              style={styles.headerRightImage}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMainContainer: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    justifyContent: 'center',
  },
  headerHeightContainer: {backgroundColor: 'black'},
  header: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingTop: 10,
    top: -15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftImage: {height: 24, width: 24},
  headerTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white',
  },
  headerTextInput: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white',
    width: '83%',
  },
  headerRight: {
    marginRight: 10,
  },
  headerRightImage: {height: 27, width: 27},
});

export default CustomHeader;
