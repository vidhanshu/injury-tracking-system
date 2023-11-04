import React from 'react';
import { Card, Table } from 'antd';

import Container from '@/src/common/components/container';
import FrontBody from '@/src/create/components/front-body';
import BackBody from '@/src/create/components/back-body';
import { TBodyMap } from '@/src/create/types';

const DUMMY_REPORT: {
    name: string;
    reporterName: string;
    date: string;
    createdAt: string;
    bodyMap: TBodyMap;
} = {
    name: 'Report1',
    reporterName: 'Reporter1',
    date: '11/3/2023, 11:13:03 AM',
    createdAt: '11/3/2023, 11:13:03 AM',
    bodyMap: {
        'left-back-elbow': {
            label: 'left-back-elbow',
            description: '',
        },
        'right-feet': {
            label: 'right-feet',
            description: '',
        },
        'left-feet': {
            label: 'left-feet',
            description: '',
        },
        'left-leg': {
            label: 'left-leg',
            description: '',
        },
        'right-jaw': {
            label: 'right-jaw',
            description: '',
        },
        'right-eye': {
            label: 'right-eye',
            description: '',
        },
        'left-eye': {
            label: 'left-eye',
            description: '',
        },
        head: {
            label: 'head',
            description: '',
        },
        nose: {
            label: 'nose',
            description: '',
        },
        abdomen: {
            label: 'abdomen',
            description: '',
        },
        'right-lower-arm': {
            label: 'right-lower-arm',
            description: '',
        },
    },
};

const ViewReportPage = () => {
    return (
        <Container className="py-8">
            <div className="max-w-[100vw] overflow-x-auto">
                <Table
                    pagination={false}
                    columns={[
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
                        },
                        {
                            key: 'createdAt',
                            title: 'Reporting Date',
                            dataIndex: 'createdAt',
                        },
                    ]}
                    dataSource={[DUMMY_REPORT]}
                />
            </div>
            <div className="flex gap-x-8 flex-col md:flex-row justify-center py-8">
                <FrontBody bodyMap={DUMMY_REPORT.bodyMap} />
                <BackBody bodyMap={DUMMY_REPORT.bodyMap} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(DUMMY_REPORT.bodyMap).map((key, index) => (
                    <Card key={key} size="small" title={`Injury #${index + 1}`}>
                        <h1>{DUMMY_REPORT.bodyMap[key].label}</h1>
                        <p>{DUMMY_REPORT.bodyMap[key].description}</p>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ViewReportPage;
