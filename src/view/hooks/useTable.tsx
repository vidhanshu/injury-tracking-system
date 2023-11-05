'use client';

import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    InputRef,
    Space,
    DatePicker,
    Modal,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';

const { RangePicker } = DatePicker;

import { Report } from '@prisma/client';
import useAuth from '@/src/auth/context/use-auth-context';
import { MessageInstance } from 'antd/es/message/interface';

type DataType = Report & { key: number };
type DataIndex = keyof DataType;

export default function useTable({
    messageApi,
}: {
    messageApi: MessageInstance;
}) {
    const { user } = useAuth();
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef<InputRef>(null);

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

    const deleteReport = async (id: number) => {
        try {
            await axios.delete(`/api/create-report/delete/${id}`);
            messageApi.success('Report deleted successfully');
            window.location.reload();
        } catch (error: any) {
            messageApi.error(error.message);
        } 
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Report Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Reporter Name',
            dataIndex: 'reporterName',
            key: 'reporterName',
            ...getColumnSearchProps('reporterName'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Date Time of Injury',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
            sortDirections: ['descend', 'ascend'],
            render: (date) => dayjs(date).format('YYYY-MM-DD, HH:mm:ss A'),
        },
        {
            title: 'Date of Report',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ...getColumnDateProps('createdAt'),
            sorter: (a, b) =>
                dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            sortDirections: ['descend', 'ascend'],
            render: (date) => dayjs(date).format('YYYY-MM-DD, HH:mm:ss A'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div className="flex gap-x-2">
                        <Link
                            className="hover:underline"
                            href={`/view-reports/${record.key}`}
                        >
                            View
                        </Link>
                        {user?.id === record.reporterId && (
                            <>
                                <Link
                                    className="hover:underline"
                                    href={`/create-report/edit/${record.key}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        Modal.confirm({
                                            title: 'Are you sure you want to delete this report?',
                                            content:
                                                "Once deleted can't be recovered",
                                            footer: (
                                                _,
                                                { OkBtn, CancelBtn }
                                            ) => (
                                                <>
                                                    <CancelBtn />
                                                    <Button
                                                        danger
                                                        type="primary"
                                                        onClick={() =>
                                                            deleteReport(
                                                                record.id
                                                            )
                                                        }
                                                    >
                                                        Ok
                                                    </Button>
                                                </>
                                            ),
                                        });
                                    }}
                                    className="text-red-500 hover:text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                );
            },
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

    return { columns };
}
