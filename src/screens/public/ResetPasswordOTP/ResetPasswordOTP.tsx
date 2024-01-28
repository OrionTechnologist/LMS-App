import React from 'react';
import {ResetPasswordOTPForm} from '@/components/molecules/ResetPasswordOTPForm';
import {PublicLayout} from '@/components/middlewares/auth';

const ResetPasswordOTP = () => {
  return (
    <>
      <PublicLayout>
        <ResetPasswordOTPForm />
      </PublicLayout>
    </>
  );
};

export default ResetPasswordOTP;
