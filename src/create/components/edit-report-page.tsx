'use client';

import axios from 'axios';
import { message } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ReportForm from './report-form';
import { TBodyMap } from '../types';

const EditReportPage = ({ data }: { data: any }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [bodyMapData, setBodyMapData] = useState<TBodyMap>(
        JSON.parse(data.bodyMap[0].map)
    );

    const onSubmit = async (values: any) => {
        try {
            console.log('Called');
            if (Object.keys(bodyMapData).length === 0) {
                return messageApi.error(
                    'Please select atleast one injury on the body map'
                );
            }
            setLoading(true);
            const d1 = new Date(values.date);
            const d2 = new Date(values.time);
            const date = new Date(
                d1.getFullYear(),
                d1.getMonth(),
                d1.getDate(),
                d2.getHours(),
                d2.getMinutes()
            );
            await axios.patch(`/api/create-report/edit/${data.id}`, {
                date,
                name: values.report_name,
                reporterName: values.reporter_name,
                email: session?.user?.email,
                map: {
                    id: data.bodyMap[0].id,
                    data: JSON.stringify(bodyMapData),
                },
            });

            messageApi.success('Report updated successfully');
            setBodyMapData({});
            router.refresh();
            router.push(`/view-reports/${data.id}`);
        } catch (error: any) {
            messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f4f9fa]">
            {contextHolder}
            <ReportForm
                formTitle={`Edit an Injury report: ${data.name}`}
                submitButtonTitle="Update"
                bodyMapData={bodyMapData}
                setBodyMapData={setBodyMapData}
                onSubmit={onSubmit}
                loading={loading}
                defaultValues={{
                    name: data.name,
                    reporterName: data.reporterName,
                    date: data.date,
                    time: data.createdAt,
                }}
            />
        </div>
    );
};

export default EditReportPage;
