import {useState} from 'react';

interface ComponentInitialState {}

export function useComponentState<T>(initialState: ComponentInitialState & T) {
  const [state, setState] = useState<ComponentInitialState & T>({
    ...initialState,
  });

  const updateState = (stateObject: Partial<ComponentInitialState & T>) => {
    setState(prevState => ({
      ...prevState,
      ...stateObject,
    }));
  };

  return {
    state,
    setState: updateState,
  };
}
