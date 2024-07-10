import {useMemo, useCallback} from 'react';
import {TContentItem} from '../constants/types';

const useFilteredData = (
  data: TContentItem[] | undefined,
  query: string,
  isSearchActive: boolean,
): TContentItem[] | undefined => {
  const filterData = useCallback(
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
    return isSearchActive ? filterData(data, query) : data;
  }, [isSearchActive, data, query, filterData]);

  return filteredData;
};

export default useFilteredData;
