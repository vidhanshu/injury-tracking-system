'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ReportForm from './report-form';
import { TBodyMap } from '../types';
import { message } from 'antd';

const CreateReportPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [bodyMapData, setBodyMapData] = useState<TBodyMap>({});
    const [messageApi, contextHolder] = message.useMessage();

    const onSubmit = async (values: any) => {
        try {
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
            await axios.post('/api/create-report', {
                date,
                name: values.report_name,
                reporterName: values.reporter_name,
                email: session?.user?.email,
                map: JSON.stringify(bodyMapData),
            });

            messageApi.success('Report created successfully');
            setBodyMapData({});
            router.refresh();
            router.push('/view-reports');
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
                bodyMapData={bodyMapData}
                setBodyMapData={setBodyMapData}
                onSubmit={onSubmit}
                loading={loading}
            />
        </div>
    );
};

export default CreateReportPage;
