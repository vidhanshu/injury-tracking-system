'use client';

import { useState } from 'react';
import { Table, message } from 'antd';

import Container from '@/src/common/components/container';
import { Report } from '@prisma/client';
import useTable from '@/src/view/hooks/useTable';

const ViewReportsPage = ({ reports }: { reports: Report[] }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data] = useState(
        reports.map((data) => {
            return {
                ...data,
                key: data.id,
            };
        })
    );

    const { columns } = useTable({ messageApi });

    return (
        <>
            {contextHolder}
            <Container className="py-8 max-w-[100vw] md:max-w-7xl overflow-x-auto">
                <h1 className="mb-6 text-xl font-semibold">All reports</h1>
                <Table pagination={false} dataSource={data} columns={columns} />
            </Container>
        </>
    );
};

export default ViewReportsPage;
