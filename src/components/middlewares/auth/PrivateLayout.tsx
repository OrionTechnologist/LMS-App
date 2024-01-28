import React, {useEffect} from 'react';
import {useAuth} from '@/hooks';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';

interface PrivateLayoutProps {
  children?: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = props => {
  // @ts-ignore
  const {replace} = useNavigation();
  const isFocused = useIsFocused();
  const {loggedIn} = useAuth();

  const gotoLoginPage = () => replace(routes.public.loginScreen as never);

  useEffect(() => {
    if (!loggedIn) {
      gotoLoginPage();
    }
  }, [loggedIn, isFocused]);

  return <>{props?.children}</>;
};

export {PrivateLayout};
