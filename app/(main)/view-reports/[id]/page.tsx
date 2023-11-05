import React from 'react';
import { notFound } from 'next/navigation';

import prisma from '@/prisma/db';
import ViewReportPage from '@/src/view/components/view-report-page';

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

const ViewReport = async ({ params: { id } }: { params: { id: string } }) => {
    const data = await getReport(id);

    if (!data) {
        return notFound();
    }

    return <ViewReportPage data={data} />;
};

export default ViewReport;
