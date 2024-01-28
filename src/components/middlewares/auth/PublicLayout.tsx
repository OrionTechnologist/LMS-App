import React, {useEffect} from 'react';
import {useAuth} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {useIsFocused} from '@react-navigation/native';

interface PublicLayoutProps {
  children?: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = props => {
  // @ts-ignore
  const {replace} = useNavigation();
  const {loggedIn} = useAuth();
  const isFocused = useIsFocused();

  const gotoDashboardPage = () =>
    replace(routes.private.dashboardScreen as never);

  useEffect(() => {
    if (loggedIn) {
      gotoDashboardPage();
    }
  }, [loggedIn, isFocused]);

  return <>{props?.children}</>;
};

export {PublicLayout};
