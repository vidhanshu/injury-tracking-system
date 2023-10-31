import React from 'react';
import Image from 'next/image';
import Container from './container';

const Footer = () => {
    return (
        <footer className="bg-[#024145] text-white py-8">
            <Container>
                <div className="flex justify-between items-center">
                    <Image
                        src="/images/logo.svg"
                        width={100}
                        height={100}
                        className='w-[70px] h-[70px] md:w-[100px] md:h-[100px]'
                        alt="logo"
                    />

                    <h1 className="font-semibold text-2xl sm:text-3xl  md:text-4xl lg:text-5xl leading-8 lg:leading-[55px]">
                        Less Complexity, <br /> More Simplicity.
                    </h1>
                </div>
                <div className="h-8 border-t-2 border-[#11585a] border-b-2 my-6" />
                <div className="flex items-center justify-between">
                    <Image
                        src="/images/name.svg"
                        width={100}
                        height={50}
                        alt="logo"
                    />
                    <p className='font-medium text-lg'>Info@vatange.its</p>
                </div>
                <div className="text-[#6fa5a6] pt-4">
                    <p>© vantage Limited, 2023</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
