import React, {useEffect, useReducer, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {TContentItem} from '../../constants/types';
import CustomHeader from '../../components/CustomHeader';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import {styles} from './styles';
import {Separator} from '../../components/Separator';
import {useFetchMovieData} from '../../hooks/useFetchMovieData';
import {movieReducer} from '../../reducers/movieReducer';
import renderItem from './renderItem';
import useFilteredData from '../../hooks/useFilteredData';

const MoviesScreen = () => {
  const [movieData, dispatch] = useReducer(movieReducer, {content: []});
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const {fetchData, isLoading} = useFetchMovieData(dispatch);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useFilteredData(
    movieData.content,
    searchText,
    isSearchActive,
  );

  const keyExtractor = useCallback(
    (item: TContentItem, index: number) => `${item.name}-${index}`,
    [],
  );

  return (
    <>
      <CustomHeader
        searchText={searchText}
        setSearchText={setSearchText}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={keyExtractor}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={!isLoading ? <ListEmptyComponent /> : null}
      />
    </>
  );
};

export default React.memo(MoviesScreen);
