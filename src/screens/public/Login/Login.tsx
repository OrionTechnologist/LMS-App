import React from 'react';
import {LoginForm} from '@/components/molecules/LoginForm';
import {PublicLayout} from '@/components/middlewares/auth';

const Login = () => {
  return (
    <>
      <PublicLayout>
        <LoginForm />
      </PublicLayout>
    </>
  );
};

export default Login;
