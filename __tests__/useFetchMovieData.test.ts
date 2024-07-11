import {renderHook, act} from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import {useFetchMovieData} from '../src/hooks/useFetchMovieData';
import {ITEMS_PER_PAGE} from '../src/constants/appConstants';
import {NETWORK_URLS} from '../src/constants/networkUrls';
import {it, describe, expect, afterEach, jest} from '@jest/globals';
import {axiosInstance} from '../src/network';

const mock = new MockAdapter(axiosInstance);

describe('useFetchMovieData', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = {
      page: {
        'content-items': {
          content: [
            {name: 'The Birds', 'poster-image': 'poster1.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster2.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster3.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster2.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster1.jpg'},
            {name: 'The Birds', 'poster-image': 'poster3.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster3.jpg'},
            {name: 'The Birds', 'poster-image': 'poster2.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster1.jpg'},
            {name: 'The Birds', 'poster-image': 'poster1.jpg'},
            {name: 'The Birds', 'poster-image': 'poster1.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster2.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster3.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster2.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster1.jpg'},
            {name: 'The Birds', 'poster-image': 'poster3.jpg'},
            {name: 'Rear Window', 'poster-image': 'poster3.jpg'},
            {name: 'The Birds', 'poster-image': 'poster2.jpg'},
            {name: 'Family Pot', 'poster-image': 'poster1.jpg'},
            {name: 'The Birds', 'poster-image': 'poster1.jpg'},
          ],
        },
        'total-content-items': '20',
      },
    };

    mock
      .onGet(`${NETWORK_URLS.MOVIES_ENDPOINT}CONTENTLISTINGPAGE-PAGE1.json`)
      .reply(200, mockData);

    const {result} = renderHook(() => useFetchMovieData(dispatch, false));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'data_fetching_start',
      payload: {},
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'data_fetching_end',
      payload: mockData.page['content-items'],
    });
  });

  it('should handle fetch error', async () => {
    mock
      .onGet(`${NETWORK_URLS.MOVIES_ENDPOINT}CONTENTLISTINGPAGE-PAGE1.json`)
      .reply(500);

    const {result} = renderHook(() => useFetchMovieData(dispatch, false));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'data_fetching_start',
      payload: {},
    });

    expect(dispatch).not.toHaveBeenCalledWith({
      type: 'data_fetching_end',
      payload: expect.anything(),
    });
  });

  it('should not fetch data when isLoading is true', async () => {
    const {result} = renderHook(() => useFetchMovieData(dispatch, true));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should not fetch data when there are no more items to fetch', async () => {
    const mockData = {
      page: {
        'content-items': {content: Array(ITEMS_PER_PAGE).fill({})},
        'total-content-items': '10',
      },
    };

    mock
      .onGet(`${NETWORK_URLS.MOVIES_ENDPOINT}CONTENTLISTINGPAGE-PAGE1.json`)
      .reply(200, mockData);

    const {result} = renderHook(() => useFetchMovieData(dispatch, false));

    // Fetch data to mark hasMore as false
    await act(async () => {
      await result.current.fetchData();
    });

    // Try to fetch data again
    await act(async () => {
      await result.current.fetchData();
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'data_fetching_start',
      payload: {},
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'data_fetching_end',
      payload: mockData.page['content-items'],
    });
  });
});
