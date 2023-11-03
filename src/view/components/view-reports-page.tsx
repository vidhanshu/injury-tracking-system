'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Table, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import Highlighter from 'react-highlight-words';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';

import { REPORTS } from '@/src/view/utils/constants';
import Container from '@/src/common/components/container';

interface DataType {
    key: number;
    name: string;
    reporterName: string;
    date: string;
    createdAt: string;
}
type DataIndex = keyof DataType;

const ViewReportsPage = () => {
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data] = useState(
        REPORTS.map((data) => {
            return {
                ...data,
                key: data.id,
            };
        })
    );

    const getColumnDateProps = (
        dataIndex: DataIndex
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <RangePicker
                    onChange={(date, dateString) => {
                        setSelectedKeys(dateString);
                    }}
                    allowClear={true}
                    style={{ marginBottom: 8, width: '100%', display: 'flex' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#00aeab' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            dayjs(record[dataIndex]).format('YYYY-MM-DD') == value,
    });

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#00aeab' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Report Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Reporter Name',
            dataIndex: 'reporterName',
            key: 'reporterName',
            ...getColumnSearchProps('reporterName'),
        },
        {
            title: 'Date Time of Injury',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Date of Report',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ...getColumnDateProps('createdAt'),
            sorter: (a, b) =>
                dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Link href={`/view-reports/${record.key}`}>View</Link>
            ),
        },
    ];
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    return (
        <Container className="py-8 max-w-[100vw] md:max-w-7xl overflow-x-auto">
            <h1 className="mb-6 text-xl font-semibold">All reports</h1>
            <Table dataSource={data} columns={columns} />
        </Container>
    );
};

export default ViewReportsPage;
