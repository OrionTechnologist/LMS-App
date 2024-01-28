import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '@/redux/store';
import {AxiosRequestConfig} from 'axios';
import {apiClient} from '@/api';
import {
  HttpState,
  httpInitialState,
  createStateObject,
} from './httpInitialState';
import {
  handleServiceUnavailableError,
  handleUnauthorizedError,
} from '@/exceptions';

export interface HttpPayload {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  params?: any;
  body?: any;
  headers?: AxiosRequestConfig['headers'];
  useBearerToken?: boolean;
  multipart?: boolean;
  extra?: {
    absolutePath?: boolean;
    dontResetDefault?: boolean;
  };
}

export interface HttpAction {
  correlationKey: keyof HttpState;
  response?: any;
  error?: any;
  payload: HttpPayload;
}

export const performHttpCall = createAsyncThunk(
  'http/sendRequest',
  async (payload: HttpAction, thunkAPI) => {
    const {payload: httpPayload} = payload;

    try {
      return await apiClient[httpPayload?.method]({
        url: httpPayload?.url,
        useBearerToken: httpPayload?.useBearerToken,
        params: httpPayload?.params,
        data: httpPayload?.body,
        headers: httpPayload?.headers,
        multipart: httpPayload?.multipart,
      });
    } catch (e: any) {
      if (e?.response) {
        if (e?.response?.status === 503) {
          await handleServiceUnavailableError(e);
          return;
        }

        if (httpPayload?.useBearerToken && e?.response?.status === 401) {
          await handleUnauthorizedError(e);
          return;
        }
      }

      throw thunkAPI.rejectWithValue(e);
    }
  },
);

export const httpSlice = createSlice({
  name: 'http',
  initialState: httpInitialState,
  reducers: {
    resetHttpState(
      state,
      action: PayloadAction<{
        coreRelationKey: keyof HttpState;
        data: any;
      }>,
    ) {
      return {
        ...state,
        [action?.payload?.coreRelationKey]: {
          ...createStateObject(action?.payload?.data),
        },
      } as any;
    },
  },
  extraReducers(builder) {
    builder.addCase(performHttpCall.pending, (state, {meta}) => {
      (state as any)[meta.arg.correlationKey] = {
        // ...(state as any)[meta.arg.correlationKey],
        loading: true,
        error: null,
        payload: meta?.arg?.payload?.body,
      };
    });
    builder.addCase(performHttpCall.rejected, (state, {meta, payload}) => {
      (state as any)[meta.arg.correlationKey] = {
        ...(state as any)[meta.arg.correlationKey],
        loading: false,
        success: false,
        data: null,
        error: (payload as any)?.response ?? payload,
        payload: meta?.arg?.payload?.body,
      };
    });
    builder.addCase(performHttpCall.fulfilled, (state, {meta, payload}) => {
      (state as any)[meta.arg.correlationKey] = {
        ...(state as any)[meta.arg.correlationKey],
        loading: false,
        success: true,
        error: null,
        data: payload?.data,
        payload: meta?.arg?.payload?.body,
      };
    });
  },
});

export const selectHttpState = (state: AppState) => state.http;
export const {resetHttpState} = httpSlice.actions;
export default httpSlice.reducer;
