'use client';

import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Form, Input, message, Divider } from 'antd';
import { Mail, SquareAsterisk } from 'lucide-react';
// import { GoogleOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type TAuthFormProps = {
    type?: 'sign-in' | 'sign-up';
};
const AuthForm = ({ type = 'sign-in' }: TAuthFormProps) => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: any) => {
        try {
            setLoading(true);
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: '/',
            });
            if (!res?.error) {
                messageApi.success('You have successfully signed in');
                router.replace('/');
            } else {
                throw new Error(res.error);
            }
        } catch (error: any) {
            messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (data: any) => {
        setLoading(true);
        try {
            await axios.post('/api/auth/sign-up', {
                email: data.email,
                password: data.password,
            });

            messageApi.success('You have successfully registered');
            router.replace('/sign-in');
        } catch (error: any) {
            messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = type === 'sign-in' ? loginUser : registerUser;

    return (
        <>
            {contextHolder}
            <div className="bg-white rounded-md p-6 w-full mx-4 md:w-fit md:min-w-[400px]">
                <div className="flex justify-center items-center py-6 flex-col">
                    <h1 className="text-xl font-semibold">
                        {type === 'sign-in' ? 'Sign in' : 'Sign up'}
                    </h1>
                    <Link href="/">
                        <Image
                            src="/images/logo-name.svg"
                            alt="logo"
                            width={200}
                            height={50}
                        />
                    </Link>
                </div>

                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            disabled={loading}
                            loading={loading}
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            {type === 'sign-in' ? 'Sign in' : 'Sign up'}
                        </Button>
                    </Form.Item>
                    <p className="text-center">
                        {type === 'sign-in' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <Link href={loading ? '#' : '/sign-up'}>
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link href={loading ? '#' : '/sign-in'}>
                                    Sign in
                                </Link>
                            </>
                        )}
                    </p>

                    <Divider>OR</Divider>

                    <Button
                        disabled={loading}
                        loading={loading}
                        block
                        size="large"
                        // icon={}
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: false,
                            })
                        }
                    >
                        Google
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default AuthForm;
