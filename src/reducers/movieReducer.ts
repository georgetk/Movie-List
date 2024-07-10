import {TContentItem, TMovieAction} from '../constants/types';

type TInitialState = {
  isLoading: boolean;
  content: TContentItem[];
};

export const initialState: TInitialState = {
  isLoading: false,
  content: [],
};

export function movieReducer(
  state: TInitialState,
  action: TMovieAction,
): TInitialState {
  switch (action.type) {
    case 'data_fetching_start':
      return {...state, isLoading: true};

    case 'data_fetching_end':
      return {
        ...state,
        content: [...state.content, ...(action.payload?.content ?? [])],
        isLoading: false,
      };

    default:
      return state;
  }
}
