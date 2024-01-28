import React from 'react';
import {RegisterForm} from '@/components/molecules/RegisterForm';
import {PublicLayout} from '@/components/middlewares/auth';

const Register = () => {
  return (
    <>
      <PublicLayout>
        <RegisterForm />
      </PublicLayout>
    </>
  );
};

export default Register;
