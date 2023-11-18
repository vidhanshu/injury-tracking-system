'use client';

import { useState } from 'react';
import { Table, message } from 'antd';

import { Report } from '@prisma/client';
import Container from '@/src/common/components/container';
import useTable from '@/src/view/hooks/useTable';

const ViewReportsPage = ({ reports }: { reports: Report[] }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState(
        reports.map((data) => {
            return {
                ...data,
                key: data.id,
            };
        })
    );

    const { columns } = useTable({ messageApi, setData });

    return (
        <>
            {contextHolder}
            <Container className="py-8 max-w-[100vw] md:max-w-7xl overflow-x-auto min-h-[calc(100vh-76px-300px)]">
                <h1 className="mb-6 text-xl font-semibold">All reports</h1>
                <Table pagination={false} dataSource={data} columns={columns} />
            </Container>
        </>
    );
};

export default ViewReportsPage;
