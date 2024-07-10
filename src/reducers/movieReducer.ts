import {TContentItems, TMovieAction} from '../constants/types';

export function movieReducer(
  state: TContentItems,
  action: TMovieAction,
): TContentItems {
  switch (action.type) {
    case 'update_data':
      return {
        content: [
          ...(state?.content ?? []),
          ...(action.payload?.content ?? []),
        ],
      };

    default:
      return state;
  }
}
