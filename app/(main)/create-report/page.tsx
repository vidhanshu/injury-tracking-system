import React from 'react';
import CreateReportPage from '@/src/create/components/create-report-page';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const CreateReport = withPageAuthRequired(
    async () => {
        return <CreateReportPage />;
    },
    {
        returnTo: '/api/auth/login',
    }
);

export default CreateReport;
