import {useMemo, useCallback} from 'react';
import {TContentItem} from '../constants/types';

const useFilteredData = (
  data: TContentItem[] | undefined,
  query: string,
  isSearchActive: boolean,
): TContentItem[] | undefined => {
  const filterFunction = useCallback(
    (
      dataToFilter: TContentItem[] | undefined,
      searchQuery: string,
    ): TContentItem[] | undefined => {
      if (!dataToFilter) {
        return [];
      }
      return dataToFilter.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    },
    [],
  );

  const filteredData = useMemo(() => {
    return isSearchActive ? filterFunction(data, query) : data;
  }, [isSearchActive, data, query, filterFunction]);

  return filteredData;
};

export default useFilteredData;
