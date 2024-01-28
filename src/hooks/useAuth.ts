import {useAppSelector} from '@/hooks/useAppSelector';
import {selectAuthState} from '@/redux/reducers/authSlice';

export const useAuth = () => {
  const authData = useAppSelector(selectAuthState);

  return {
    ...authData,
  };
};
