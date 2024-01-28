import {store} from '@/redux/store';
import {
  closeImageViewer,
  openImageViewer,
  resetUiState,
  UiState,
} from '@/redux/reducers/uiSlice';

export function openImageViewerAction(
  options: Partial<UiState['imageViewer']>,
) {
  store.dispatch(openImageViewer(options));
}

export function closeImageViewerAction() {
  store.dispatch(closeImageViewer());
}

export function resetUiStatesAction() {
  store.dispatch(resetUiState());
}
