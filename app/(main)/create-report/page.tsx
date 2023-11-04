'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Spin } from 'antd';

import CreateReportPage from '@/src/create/components/create-report-page';

const CreateReport = () => {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="h-[calc(100vh-100px)] flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    } else if (status === 'authenticated') {
        return <CreateReportPage />;
    }

    return redirect('/sign-in')
};
export default CreateReport;
