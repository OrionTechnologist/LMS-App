import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PageHeader} from '@/components/molecules/PageHeader';
import {TasksContainer} from '@/components/molecules/Tasks';

const Tasks = () => {
  const {goBack} = useNavigation();

  return (
    <>
      <PageHeader
        variant={'title-bar'}
        titleInfoProps={{
          title: 'Tasks',
        }}
        showBackButton={true}
        onClickBackButton={goBack}
      />
      <TasksContainer />
    </>
  );
};

export default Tasks;
