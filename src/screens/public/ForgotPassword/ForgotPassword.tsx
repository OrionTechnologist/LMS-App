import React from 'react';
import {ForgotPasswordForm} from '@/components/molecules/ForgotPasswordForm';
import {PublicLayout} from '@/components/middlewares/auth';

const ForgotPassword = () => {
  return (
    <>
      <PublicLayout>
        <ForgotPasswordForm />
      </PublicLayout>
    </>
  );
};

export default ForgotPassword;
