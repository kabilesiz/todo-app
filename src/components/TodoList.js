import React, {useEffect, useState} from 'react';
import {Popconfirm, Table, message, Pagination, Tag, Progress, Modal, Spin} from "antd";
import {DeleteOutlined, EditOutlined, PieChartOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {deleteItem, getItems} from "../slices/item-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {Link} from "react-router-dom";
import {deletingFailed, loadTaskFailed, statisticsTitle, successfullyDeleted} from "../utils/popupMessages";
import {createdDate, pageSize} from "../utils/commonConfigurations";

function TodoList({getItems, deleteItem}) {
    const [sort, setSort] = useState('descend');
    const [isStatisticOpen, setIsStatisticOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsInfo, setItemsInfo] = useState({})

    const showStatistics = () => {
        setIsStatisticOpen(true);
    };

    const handleCancel = () => {
        setIsStatisticOpen(false);
    };


    const handleDeleteItem = (record) => {
        setLoading(true)
        deleteItem({id: record.id})
            .then(unwrapResult)
            .then(() => {
                message.success(successfullyDeleted)
                    .then(() => {
                        handlePaginationRequest(currentPage)
                        setLoading(false)
                    })
            })
            .catch(() => {
                message.error(deletingFailed).then(() => setLoading(false))
            })

    }
    const calculateRate = () => {
        const doneTask = itemsInfo.items.filter(x => x.isCompleted === true)
        return doneTask.length / itemsInfo.items.length * 100;
    }

    const prepareByPageAndSort = (page) => {
        const baseSearch = `?sortBy=${createdDate}&page=${page}&limit=${pageSize}`
        if (sort === 'ascend'){
            return baseSearch + `&order=asc`
        }
        return baseSearch + `&order=desc`
    }
    const handlePaginationRequest = (page) => {
        console.log("girdi")
        setLoading(true)
        setCurrentPage(page)
        getItems({sortParams:prepareByPageAndSort(page)})
            .then(unwrapResult)
            .then(res => {
                setItemsInfo(res)
                setLoading(false)
            })
            .catch(() => {
                message.error(loadTaskFailed)
                    .then(() => setLoading(false))
            })
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'isCompleted',
            render: (val) => (
                <span>
                    {
                        val ?
                            <Tag color={"green"}>DONE</Tag>
                            :
                            <Tag color={"volcano"}>IN PROGRESS</Tag>
                    }
                </span>
            ),
            align: 'center',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            render: val => (new Date(val).toLocaleDateString() + " " + new Date(val).toLocaleTimeString()),
            align: 'center',
            sorter: val => val,
            sortOrder: sort,
            onHeaderCell: () => ({
                onClick: () => setSort(sort === 'ascend' ? 'descend' : 'ascend'),
            }),
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            render: val => (new Date(val).toLocaleDateString() + " " + new Date(val).toLocaleTimeString()),
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <>
                    <Link to={`/update/${record.id}`}>
                        <EditOutlined style={{marginRight: "10px"}}/>
                    </Link>
                    <Popconfirm
                        title="Are you sure delete the item ?"
                        onConfirm={() => handleDeleteItem(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{marginRight: "10px", color: '#08c'}}/>
                    </Popconfirm>
                </>
            ),
        }
    ];
    useEffect(() => {
        handlePaginationRequest(currentPage);
    }, [sort])
    return (
        <div style={{position: 'relative'}}>
            {
                loading ?
                    <>
                        <Spin size={"large"} style={{
                            height: `${window.innerHeight}px`,
                            width: `${window.innerWidth}`,
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}></Spin>
                    </>
                    :
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            marginRight: '3%',
                            marginTop: '1%'
                        }}>
                            <PieChartOutlined
                                style={{fontSize: '20px', color: '#08c', marginBottom: '1%', marginRight: '.3%'}}
                                onClick={showStatistics}></PieChartOutlined>
                            <p style={{color: '#08c'}}>Statistics</p>
                        </div>
                        <Modal closable={false} centered title={statisticsTitle}
                               okButtonProps={{style: {display: 'none'}}} cancelButtonProps={{style: {display: 'none'}}}
                               open={isStatisticOpen} onCancel={handleCancel}>
                            {
                                itemsInfo.items ?
                                    <Progress style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}
                                              size={"small"} strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }} type="circle" percent={calculateRate()}/> : null
                            }
                        </Modal>
                        <Table
                            pagination={false}
                            rowKey={obj => obj.id}
                            columns={columns}
                            dataSource={itemsInfo.items}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p
                                        style={{
                                            margin: 0,
                                            color: '#08c',
                                        }}
                                    >
                                        {record.content}
                                    </p>
                                ),
                                rowExpandable: (record) => record.hasContent,
                            }}
                        />
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'flex-end',
                            marginTop: '10px'
                        }}>
                            <Pagination
                                defaultCurrent={currentPage}
                                pageSize={10}
                                total={itemsInfo.count}
                                showSizeChanger={false}
                                onChange={(page, pageSize) => handlePaginationRequest(page)}
                            />
                        </div>
                        {itemsInfo.items ? <h1>Total Count : {itemsInfo.count}</h1> : null}
                    </div>
            }

        </div>
    );
}
export default connect(null, {getItems, deleteItem})(TodoList)