import AuthForm from '@/src/auth/components/auth-form';
import React from 'react';

const page = () => {
    return (
        <div className="bg-[#024044] h-screen flex justify-center items-center">
            <AuthForm type="sign-up"/>
        </div>
    );
};

export default page;
