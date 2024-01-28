import {CORRELATION_IDS} from '@/redux/reducers/http';

export interface HttpStateData<Data> {
  loading: boolean;
  success: boolean;
  error: any;
  data: Data;
  payload: any;
}

type RelationKeys = keyof typeof CORRELATION_IDS;
type RelationIds = (typeof CORRELATION_IDS)[RelationKeys];

export type HttpState = {
  [key in RelationIds]: HttpStateData<any>;
};

export function createStateObject<D>(data: D) {
  return {
    loading: false,
    success: false,
    error: null,
    data,
  };
}

export const httpInitialState: Partial<HttpState> = {};
