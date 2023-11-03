'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { User, X, Clipboard} from 'lucide-react';
import { Button, Card, DatePicker, Flex, Form, Input, TimePicker } from 'antd';

import FrontBody from './front-body';
import BackBody from './back-body';
import Container from '@/src/common/components/container';
import { TBodyMap, TBodyMapValue } from '../types';

const CreateReportForm = () => {
    const router = useRouter();
    const [bodyMapData, setBodyMapData] = useState<TBodyMap>({});

    const onSubmit = (values: any) => {
        // do something with values
    };

    console.log(bodyMapData);

    const addPart = (data: { key: string; value: TBodyMapValue }) => {
        if (data.key in bodyMapData) {
            return;
        }
        setBodyMapData((prev) => ({
            ...prev,
            [data.key]: data.value,
        }));

        router.push('/create-report/#body-map-details');
    };

    const removePart = (key: string) => {
        const newBodyMapData = { ...bodyMapData };
        delete newBodyMapData[key];
        setBodyMapData(newBodyMapData);
    };

    const onPartDetailChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string
    ) => {
        setBodyMapData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [e.target.name]: e.target.value,
            },
        }));
    };

    return (
        <Container className="py-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#345f54] mb-6">
                Create an Injury Report
            </h1>

            <div className="space-y-6">
                <Form onFinish={onSubmit}>
                    <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-4">
                        <Form.Item
                            name="report_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Report Name',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter report name"
                                size="large"
                                prefix={
                                    <Clipboard className="w-4 h-4 text-gray-600" />
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="reporter_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Your name',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter reporter name"
                                size="large"
                                prefix={
                                    <User className="w-4 h-4 text-gray-600" />
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Date of injury',
                                },
                            ]}
                        >
                            <DatePicker
                                size="large"
                                format="YYYY-MM-DD"
                                style={{ display: 'block' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Time of injury',
                                },
                            ]}
                        >
                            <TimePicker
                                size="large"
                                format="hh:mm"
                                style={{ display: 'block' }}
                            />
                        </Form.Item>
                    </div>

                    <p className="mb-2">
                        Click on the body map below and fill the Injury details
                    </p>
                    <div className="mb-4 flex justify-center items-center border rounded-md p-4 bg-white">
                        <div className="flex gap-x-8 flex-col md:flex-row">
                            <div>
                                <FrontBody
                                    addPart={addPart}
                                    removePart={removePart}
                                    bodyMap={bodyMapData}
                                />
                                <h1 className="text-center font-medium mt-4">
                                    Front
                                </h1>
                            </div>
                            <div>
                                <BackBody
                                    addPart={addPart}
                                    removePart={removePart}
                                    bodyMap={bodyMapData}
                                />
                                <h1 className="text-center font-medium mt-4">
                                    Back
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div
                        id="body-map-details"
                        className="grid md:grid-cols-2 gap-4 border-b pb-4 mb-4"
                    >
                        {Object.keys(bodyMapData).map((key, index) => (
                            <Card
                                key={key}
                                size="small"
                                title={`Injury #${index + 1}`}
                                extra={
                                    <X
                                        className="w-4 h-4 text-gray-600 cursor-pointer"
                                        onClick={() => {
                                            removePart(key);
                                        }}
                                    />
                                }
                            >
                                <Form.Item>
                                    <Input
                                        name="label"
                                        onChange={(e) =>
                                            onPartDetailChange(e, key)
                                        }
                                        placeholder="label"
                                        defaultValue={bodyMapData[key].label}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input.TextArea
                                        rows={2}
                                        maxLength={500}
                                        showCount
                                        placeholder="description"
                                        defaultValue={
                                            bodyMapData[key].description
                                        }
                                        name="description"
                                        onChange={(e) =>
                                            onPartDetailChange(e, key)
                                        }
                                    />
                                </Form.Item>
                            </Card>
                        ))}
                    </div>

                    <Form.Item>
                        <Flex justify="end">
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Create
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </Container>
    );
};

export default CreateReportForm;
