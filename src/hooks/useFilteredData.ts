import {useMemo} from 'react';
import {TContentItem} from '../constants/types';

const useFilteredData = (
  data: TContentItem[] | undefined,
  query: string,
  isSearchActive: boolean,
): TContentItem[] | undefined => {
  const filteredData = useMemo(() => {
    if (!isSearchActive) {
      return data;
    }

    if (!data) {
      return [];
    }

    return data.filter(item =>
      item.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [isSearchActive, data, query]);

  return filteredData;
};

export default useFilteredData;
