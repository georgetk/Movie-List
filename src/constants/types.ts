export type TContentItem = {
  name?: string;
  'poster-image'?: string;
};

export type TContentItems = {
  content?: TContentItem[];
};

export type TPage = {
  title?: string;
  'total-content-items'?: string;
  'page-num-requested'?: string;
  'page-size-requested'?: string;
  'page-size-returned'?: string;
  'content-items'?: TContentItems;
};

export type TMovieData = {
  page?: TPage;
};

export type TMovieAction = {
  type: 'data_fetching_start' | 'data_fetching_end';
  payload: TContentItems;
};
