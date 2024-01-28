import React from 'react';
import {SignUpOTPForm} from '@/components/molecules/SignUpOTPForm';
import {PublicLayout} from '@/components/middlewares/auth';

const SignUpOTP = () => {
  return (
    <>
      <PublicLayout>
        <SignUpOTPForm />
      </PublicLayout>
    </>
  );
};

export default SignUpOTP;
