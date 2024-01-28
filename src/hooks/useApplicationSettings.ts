import {useAppSelector} from '@/hooks/useAppSelector';
import {selectApplicationSettingsState} from '@/redux/reducers/applicationSettingsSlice';

export const useApplicationSettings = () => {
  return useAppSelector(selectApplicationSettingsState);
};
