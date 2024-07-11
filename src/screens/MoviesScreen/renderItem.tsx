import React from 'react';
import {Image, ListRenderItem, Text, View} from 'react-native';
import {styles} from './styles';
import {TContentItem} from '../../constants/types';
import {posterImages} from '../../constants/images';

const renderItem: ListRenderItem<TContentItem> = ({item}) => {
  const {name, 'poster-image': posterImage} = item;

  // Assigning placeholder_for_missing_posters.png as the fallback image by default
  let imageSource = posterImages.fallback;

  if (posterImage && Object.keys(posterImages).includes(posterImage)) {
    // Current posterImage is a key of the pre-defined posterImages object
    imageSource = posterImages[posterImage as keyof typeof posterImages];
  }

  return (
    <View style={styles.itemContainer}>
      <Image source={imageSource} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text numberOfLines={1} style={styles.itemText}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default renderItem;
