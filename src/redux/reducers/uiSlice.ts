import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '@/redux/store';
import {ImageViewerImage} from '@/components/organisms/ImageViewer/ImageViewer';

export interface UiState {
  imageViewer: {
    open?: boolean;
    initialImageIndex?: number;
    images?: ImageViewerImage[];
  };
}

const initialState: UiState = {
  imageViewer: {
    open: false,
    initialImageIndex: 0,
    images: [],
  },
};

export const uiSlice = createSlice({
  name: 'uiStates',
  initialState,
  reducers: {
    openImageViewer: (
      state,
      action: PayloadAction<Partial<UiState['imageViewer']>>,
    ) => {
      return {
        ...state,
        imageViewer: {
          ...state.imageViewer,
          open: true,
          ...action?.payload,
        },
      };
    },
    closeImageViewer: state => {
      return {
        ...state,
        imageViewer: initialState.imageViewer,
      };
    },
    resetUiState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const selectUiState = (state: AppState) => state.ui;
export const {openImageViewer, closeImageViewer, resetUiState} =
  uiSlice.actions;

export default uiSlice.reducer;
