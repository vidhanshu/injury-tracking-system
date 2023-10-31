import React, { HTMLAttributes } from 'react';

type TContainerProps = HTMLAttributes<HTMLDivElement>;

const Container = ({ className, children, ...props }: TContainerProps) => {
    return (
        <div className={`px-4 2xl:px-0 max-w-7xl mx-auto ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Container;
