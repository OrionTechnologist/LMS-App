import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@/hooks';

interface ReduxServiceProps {
  children?: React.ReactNode;
}

const ReduxService: React.FC<ReduxServiceProps> = props => {
  const [ready, setReady] = useState(false);
  const reduxState = useAppSelector(state => state);

  useEffect(() => {
    if (typeof reduxState === 'object') {
      setReady(true);
    }
  }, [reduxState]);

  return <React.Fragment>{ready && props.children}</React.Fragment>;
};

export {ReduxService};
