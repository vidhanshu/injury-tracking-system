import React from 'react';
import { Button, Flex } from 'antd';

const HomePage = () => {
    return (
        <div className='p-4'>
            <Flex gap={4}>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
                <Button type='primary'>Click me</Button>
            </Flex>
        </div>
    );
};

export default HomePage;
