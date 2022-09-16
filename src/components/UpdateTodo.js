import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Button, Form, Input, message, Select, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import {connect} from "react-redux";
import checkInput from "../utils/checkInput";
import {updateItem} from "../slices/item-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {successfullyUpdated, updatingFailed} from "../utils/popupMessages";
import {inputContent, inputTitle, invalidContent, invalidTitle} from "../utils/formInputValidationMessages";

function UpdateTodo({items, updateItem}) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams();
    const [currentTodo, setCurrentTodo] = useState({})
    useEffect(() => {
        setCurrentTodo(getTodoByIdFromState(params.id))
        if (currentTodo !== null || currentTodo !== undefined)
            setFormValues()
    }, [currentTodo])
    const status = [
        {
            label: "True",
            value: true
        },
        {
            label: "False",
            value: false
        }
    ]

    const handleChange = () => {
        form.setFieldsValue({sights: []});
    };

    const setFormValues = () => {
        form.setFieldsValue({
            title: currentTodo.title,
            content: currentTodo.content,
            isCompleted: currentTodo.isCompleted,
        })
    }

    const getTodoByIdFromState = (id) => {
        let ru = items.items.filter(x => x.id === id)
        if (ru.length > 0) return ru[0]
        navigate("/");
    }

    const handleUpdateItem = (id, payload) => {
        setLoading(true)
        updateItem({id, payload})
            .then(unwrapResult)
            .then(() => {
                message.success(successfullyUpdated)
                    .then(() => {
                            setLoading(false)
                            navigate("/")
                        }
                    )
            })
            .catch(() => {
                message.error(updatingFailed)
                    .then(() => setLoading(false))
            })
    }

    const onFinish = (values) => {
        const hasContent = values.content.length > 0 ? true : false
        const currentDate = new Date().valueOf()
        const finalValues = {
            ...values,
            updatedDate: currentDate,
            createdDate: currentTodo.createdDate,
            id: params.id,
            hasContent
        }
        handleUpdateItem(params.id, finalValues)

    };

    const [form] = Form.useForm();
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            height: `${window.innerHeight}px`
        }}>
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
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: inputTitle,
                                },
                                ({getFieldValue}) => ({
                                    validator() {
                                        if (!checkInput(getFieldValue('title'), 3)) {
                                            return Promise.reject(new Error(invalidTitle))
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: inputContent,
                                },
                                ({getFieldValue}) => ({
                                    validator() {
                                        if (!checkInput(getFieldValue('content'), 3)) {
                                            return Promise.reject(new Error(invalidContent))
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            ]}
                        >
                            <TextArea/>
                        </Form.Item>

                        <Form.Item name="isCompleted" label="Status" initialValue={currentTodo.isCompleted}>
                            <Select options={status} onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{position: "absolute", right: "10px"}}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        items: state.item,
    };
};

export default connect(mapStateToProps, {updateItem})(UpdateTodo);
