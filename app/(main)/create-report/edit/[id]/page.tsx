import React from 'react';
import EditReportPage from '@/src/create/components/edit-report-page';
import prisma from '@/prisma/db';

const getReport = async (id: string) => {
    return await prisma.report.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            bodyMap: true,
            reporter: true,
        },
    });
};

const page = async ({ params: { id } }: { params: { id: string } }) => {
    return <EditReportPage data={await getReport(id)} />;
};

export default page;
