import React from 'react';

import Footer from '@/src/common/components/footer';
import Navbar from '@/src/common/components/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default MainLayout;
