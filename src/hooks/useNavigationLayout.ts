import {useContext, useEffect} from 'react';
import {NavTabLayoutContext} from '@/context';

interface UseNavigationLayoutProps {
  isRefreshing?: boolean;
}

export function useNavigationLayout(props?: UseNavigationLayoutProps) {
  const methods = useContext(NavTabLayoutContext);

  useEffect(() => {
    if (props?.isRefreshing !== undefined) {
      methods?.setIsRefreshing(props?.isRefreshing);
    }
  }, [props?.isRefreshing]);

  return methods;
}
