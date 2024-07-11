import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  flatListContent: {
    paddingTop: Platform.OS === 'ios' ? 130 : 100,
    paddingBottom: 50,
    marginHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemImage: {
    width: 105,
    height: 155,
  },
  itemTextContainer: {
    marginTop: 8,
    width: 115,
  },
  itemText: {
    color: 'white',
    width: '92%',
  },
});
