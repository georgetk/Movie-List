import React from 'react';
import {Image, ListRenderItem, Text, View} from 'react-native';
import {styles} from './styles';
import {TContentItem} from '../../constants/types';
import {posterImages} from '../../constants/images';

const renderItem: ListRenderItem<TContentItem> = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={
          item?.['poster-image'] &&
          Object.keys(posterImages).includes(item['poster-image'])
            ? posterImages[item['poster-image'] as keyof typeof posterImages]
            : posterImages.fallback
        }
        style={styles.itemImage}
      />
      <View style={styles.itemTextContainer}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

export default renderItem;
