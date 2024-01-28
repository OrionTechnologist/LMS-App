import React from 'react';
import {ResetPasswordForm} from '@/components/molecules/ResetPasswordForm';
import {PublicLayout} from '@/components/middlewares/auth';

const ResetPassword = () => {
  return (
    <>
      <PublicLayout>
        <ResetPasswordForm />
      </PublicLayout>
    </>
  );
};

export default ResetPassword;
