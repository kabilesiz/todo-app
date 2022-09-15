import React, {useEffect, useState} from 'react';
import {Popconfirm, Table, message, Pagination, Tag, Progress, Modal, Spin} from "antd";
import {DeleteOutlined, EditOutlined, PieChartOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {deleteItem, getItems} from "../slices/item-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {Link} from "react-router-dom";
import {deletingFailed, loadTaskFailed, statisticsTitle, successfullyDeleted} from "../utils/popupMessages";

function TodoList({getItems, deleteItem}) {
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
                        handlePaginationRequest(currentPage, 10, null)
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
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        /*if (sorter.order !== undefined && sorter.order === 'ascend') {
            const sortParams = `sortBy=${sorter.field}&order=asc`
            handlePaginationRequest(1, 10, sortParams);
        } else {
            handlePaginationRequest(1, 10, null);
        }*/


    };
    const handlePaginationRequest = (page, pageSize, sortParams) => {
        setLoading(true)
        setCurrentPage(page)
        getItems({page, pageSize, sortParams})
            .then(unwrapResult)
            .then(res => {
                setItemsInfo(res)
                setLoading(false)
            })
            .catch(() => {
                message.error(loadTaskFailed)
                setLoading(false)
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
            defaultSortOrder: 'descend',
            render: val => (new Date(val).toLocaleDateString() + " " + new Date(val).toLocaleTimeString()),
            align: 'center',
            sorter: val => val
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
                        <DeleteOutlined style={{marginRight: "10px",color: '#08c'}}/>
                    </Popconfirm>
                </>
            ),
        }
    ];
    useEffect(() => {
        handlePaginationRequest(currentPage, 10, null);
    }, [])
    return (
        <div style={{position: 'relative'}}>
            {
                loading ?
                    <>
                        <Spin size={"large"} style={{height:`${window.innerHeight}px`, width:`${window.innerWidth}`, display:"flex", alignItems:'center', justifyContent:'center'}}></Spin>
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
                            <PieChartOutlined style={{fontSize: '20px', color: '#08c', marginBottom: '1%', marginRight: '.3%'}}
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
                            onChange={onChange}
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
                        <div style={{display: "flex", alignItems: "center", justifyContent: 'flex-end', marginTop: '10px'}}>
                            <Pagination
                                defaultCurrent={1}
                                pageSize={10}
                                total={itemsInfo.count}
                                showSizeChanger={false}
                                onChange={(page, pageSize) => handlePaginationRequest(page, pageSize)}
                            />
                        </div>
                        {itemsInfo.items ? <h1>Total Count : {itemsInfo.count}</h1> : null}
                    </div>
            }

        </div>
    );
}

export default connect(null, {getItems, deleteItem})(TodoList)