'use client';

import Container from '@/src/common/components/container';
import { Timer, LayoutDashboard, FileSearch2 } from 'lucide-react';
import React from 'react';

const FEATURES = [
    {
        Icon: Timer,
        title: 'Create injury report in minutes',
        description:
            'You can create an injury report quickly and easily, using a body map image to indicate the areas of injury and give details for each one.',
    },
    {
        Icon: LayoutDashboard,
        title: 'Manage your injury reports',
        description:
            'You can view your own reports and edit or delete them as needed. You can also see a list of all the reports made by other users in your organization. You can sort the list by name, date, or report number.',
    },
    {
        Icon: FileSearch2,
        title: 'Search and filter injury reports',
        description:
            'You can search for any report by name or keyword. You can also filter the reports by date range, status, severity, or category.',
    },
];
const Features = () => {
    return (
        <div className="bg-[#f4f9fa] py-16">
            <h1 className="text-[#1f6064] text-center font-semibold text-4xl md:text-5xl  lg:text-6xl mb-16">
                Features
            </h1>
            <Container className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map(({ title, description, Icon }) => (
                    <div
                        key={title}
                        className="px-8 py-10 rounded-lg bg-white space-y-4"
                    >
                        <div className="p-4 rounded-md bg-[#e2f3f2] w-fit">
                            <Icon className="w-8 h-8 text-[#00aeab]" />
                        </div>
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p className="text-lg font-medium text-[#1f6064]">
                            {description}
                        </p>
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default Features;
