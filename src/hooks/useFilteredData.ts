import {useMemo} from 'react';
import {TContentItem} from '../constants/types';

const useFilteredData = (
  data: TContentItem[] | undefined,
  query: string,
  isSearchActive: boolean,
): TContentItem[] | undefined => {
  const filteredData = useMemo(() => {
    if (!isSearchActive) {
      // User is not searching, so return the whole data
      return data;
    }

    if (!data) {
      return [];
    }

    // User is searching, so apply filter and only return the matching data
    return data.filter(item =>
      item.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [isSearchActive, data, query]);

  return filteredData;
};

export default useFilteredData;
