import {useCallback, useRef} from 'react';
import {axiosInstance} from '../network';
import {TMovieAction, TMovieData} from '../constants/types';
import {NETWORK_URLS} from '../constants/networkUrls';
import {ITEMS_PER_PAGE} from '../constants/appConstants';

export const useFetchMovieData = (
  dispatch: React.Dispatch<TMovieAction>,
  isLoading: boolean,
) => {
  const page = useRef(1);
  const hasMore = useRef(true);

  const fetchData = useCallback(async () => {
    if (isLoading || !hasMore.current) {
      // API call already started or no more items to fetch
      return;
    }

    dispatch({
      type: 'data_fetching_start',
      payload: {},
    });

    try {
      const response = await axiosInstance.get<TMovieData>(
        `${NETWORK_URLS.MOVIES_ENDPOINT}CONTENTLISTINGPAGE-PAGE${page.current}.json`,
      );
      const result = response.data;

      dispatch({
        type: 'data_fetching_end',
        payload: result.page?.['content-items'] ?? {},
      });

      const currentContentItemsInResponse =
        result.page?.['content-items']?.content?.length ?? 0;

      // Count of items that are currently available in app
      const totalContentItemsFetched =
        currentContentItemsInResponse + (page.current - 1) * ITEMS_PER_PAGE;

      // Total count of items available at the server side
      const totalContentItemsAvailable = parseInt(
        result.page?.['total-content-items'] ?? '0',
        10,
      );

      if (totalContentItemsAvailable <= totalContentItemsFetched) {
        // We have fetched all the items
        hasMore.current = false;
      }

      page.current += 1;
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }, [dispatch, isLoading]);

  return {fetchData};
};
