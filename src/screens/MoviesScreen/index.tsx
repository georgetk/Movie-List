import React, {useEffect, useReducer, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {TContentItem} from '../../constants/types';
import CustomHeader from '../../components/CustomHeader';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import {styles} from './styles';
import {Separator} from '../../components/Separator';
import {useFetchMovieData} from '../../hooks/useFetchMovieData';
import {initialState, movieReducer} from '../../reducers/movieReducer';
import renderItem from './renderItem';
import useFilteredData from '../../hooks/useFilteredData';

const MoviesScreen = () => {
  const [{isLoading, content}, dispatch] = useReducer(
    movieReducer,
    initialState,
  );
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const {fetchData} = useFetchMovieData(dispatch, isLoading);
  const filteredData = useFilteredData(content, searchText, isSearchActive);

  useEffect(() => {
    fetchData();
  }, []);

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
        onEndReachedThreshold={0.8}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={!isLoading ? <ListEmptyComponent /> : null}
      />
    </>
  );
};

export default React.memo(MoviesScreen);
