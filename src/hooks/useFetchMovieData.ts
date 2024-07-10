import {useCallback, useRef, useState} from 'react';
import {axiosInstance} from '../network';
import {TMovieAction, TMovieData} from '../constants/types';
import {NETWORK_URLS} from '../constants/networkUrls';
import {ITEMS_PER_PAGE} from '../constants/appConstants';

export const useFetchMovieData = (dispatch: React.Dispatch<TMovieAction>) => {
  const [isLoading, setIsLoading] = useState(false);

  const page = useRef(1);
  const hasMore = useRef(true);

  const fetchData = useCallback(async () => {
    if (isLoading || !hasMore.current) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.get<TMovieData>(
        `${NETWORK_URLS.MOVIES_ENDPOINT}CONTENTLISTINGPAGE-PAGE${page.current}.json`,
      );
      const result = response.data;

      console.log(result);

      dispatch({
        type: 'update_data',
        payload: result.page?.['content-items'] ?? {},
      });

      const currentContentItems =
        result.page?.['content-items']?.content?.length ?? 0;

      let combinedContentLength = currentContentItems;
      if (page.current !== 1) {
        combinedContentLength += (page.current - 1) * ITEMS_PER_PAGE;
      }

      const totalContentItems = parseInt(
        result.page?.['total-content-items'] ?? '0',
        10,
      );

      if (totalContentItems === combinedContentLength) {
        hasMore.current = false;
      }

      page.current += 1;
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isLoading]);

  return {fetchData, isLoading};
};
