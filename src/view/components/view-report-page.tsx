'use client';

import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from "next/navigation";
import { Card, Table, Modal, message, Button } from 'antd';

import Container from '@/src/common/components/container';
import FrontBody from '@/src/create/components/front-body';
import BackBody from '@/src/create/components/back-body';
import useAuth from '@/src/auth/context/use-auth-context';
import { Report } from '@prisma/client';

type DataType = Report & { key: number };

const ViewReportPage = ({ data }: { data: any }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const map = JSON.parse(data?.bodyMap[0].map);

    const cols: ColumnsType<DataType> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'reporterName',
            title: 'Reporter Name',
            dataIndex: 'reporterName',
        },
        {
            key: 'date',
            title: 'Injury Date',
            dataIndex: 'date',
            render: (date: Date) =>
                dayjs(date).format('YYYY-MM-DD, HH:mm:ss A'),
        },
        {
            key: 'createdAt',
            title: 'Reporting Date',
            dataIndex: 'createdAt',
            render: (date: Date) =>
                dayjs(date).format('YYYY-MM-DD, HH:mm:ss A'),
        },
    ];

    const deleteReport = async (id: number) => {
        try {
            await axios.delete(`/api/create-report/delete/${id}`);
            messageApi.success('Report deleted successfully');
            router.push("/view-reports")
        } catch (error: any) {
            messageApi.error(error.message);
        }
    };

    if (user?.id === data?.reporterId) {
        cols.push({
            key: 'action',
            title: 'Action',
            render: (record) => (
                <div className="flex gap-x-4">
                    <Link className="hover:underline" href={`/create-report/edit/${record.id}`}>Edit</Link>
                    <button
                        onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to delete this report?',
                                content: "Once deleted can't be recovered",
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>
                                        <CancelBtn />
                                        <Button
                                            danger
                                            type="primary"
                                            onClick={() =>
                                                deleteReport(record.id)
                                            }
                                        >
                                            Ok
                                        </Button>
                                    </>
                                ),
                            });
                        }}
                        className="text-red-500 hover:text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            ),
        });
    }

    return (
        <>
            {contextHolder}
            <Container className="py-8">
                <div className="max-w-[100vw] overflow-x-auto">
                    <Table
                        pagination={false}
                        columns={cols}
                        dataSource={[data!]}
                    />
                </div>
                <div className="flex gap-x-8 flex-col md:flex-row justify-center items-center py-8">
                    <FrontBody bodyMap={map} />
                    <BackBody bodyMap={map} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {Object.keys(map).map((key, index) => (
                        <Card
                            key={key}
                            size="small"
                            title={`Injury #${index + 1}`}
                        >
                            <h1 className="font-medium">{map[key].label}</h1>
                            <p>{map[key].description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default ViewReportPage;
