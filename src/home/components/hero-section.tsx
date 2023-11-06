'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

import Container from '@/src/common/components/container';

const HeroSection = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    return (
        <>
            <div className="bg-[#f4f9fa] py-16">
                <Container className="grid lg:grid-cols-2">
                    <div className="space-y-6">
                        <p className="text-[#00aeab] text-2xl font-medium">
                            Less complexity, More simplicity
                        </p>
                        <h1 className="text-5xl md:text-6xl font-semibold">
                            Future of <br />
                            injury tracking system <br />
                            Is now here!
                        </h1>
                        <p className="text-[#345f54] text-[18px] font-medium">
                            It is a web application that can be used by an
                            organization (such as the police) to easily record
                            and track the injuries reported by a person
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                if (session?.user) {
                                    router.push('/create-report');
                                } else {
                                    signIn();
                                }
                            }}
                        >
                            Get started
                        </Button>
                    </div>
                    <div className="hidden lg:block">
                        <Image
                            src="/images/its.png"
                            width={640}
                            height={427}
                            alt=""
                        />
                    </div>
                </Container>
            </div>
            <Container className="py-16">
                <h1 className="text-center text-xl font-semibold text-[#00aeab]">
                    Start hassle free Reporting & tracking of Injuries!
                </h1>
            </Container>
        </>
    );
};

export default HeroSection;
