import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { IBM_Plex_Sans } from 'next/font/google';
import { ConfigProvider } from 'antd';

import StyledComponentsRegistry from '@/lib/AntdRegistry';
import theme from '@/lib/themeConfig';

import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
    title: 'Vantage | Injury Tracking System',
    description:
        'Vantage is a web application that allows users to track injuries and their recovery progress.',
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <UserProvider>
            <ConfigProvider theme={theme}>
                <body className={ibmPlexSans.className}>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </body>
            </ConfigProvider>
        </UserProvider>
    </html>
);

export default RootLayout;
