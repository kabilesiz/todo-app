import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {Button, Form, Input, message, Select, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import {connect} from "react-redux";
import checkInput from "../utils/checkInput";
import {createItem} from "../slices/item-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {inputContent, inputTitle, invalidContent, invalidTitle} from "../utils/formInputValidationMessages";
import {creationFailed, successfullyCreated} from "../utils/popupMessages";

function CreateTodo({createItem}) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [form] = Form.useForm();
    useEffect(() => {
    }, [])
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

    const handleCreateItem = (payload) => {
        setLoading(true)
        createItem({payload})
            .then(unwrapResult)
            .then(() => {
                message.success(successfullyCreated)
                    .then(() => {
                            setLoading(false)
                            navigate("/")
                        }
                    )
            })
            .catch(() => {
                message.error(creationFailed)
                    .then(() => setLoading(false))
            })
    }

    const onFinish = (values) => {
        const currentDate = new Date().valueOf()
        const hasContent = values.content && values.content.length > 0 ? true : false
        const finalValues = {...values, updatedDate: currentDate, createdDate: currentDate, hasContent}
        handleCreateItem(finalValues)
    };
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            height: `${window.innerHeight}px`,
            width: `${window.innerWidth}`
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
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item name="isCompleted" label="Status" initialValue={false}>
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

export default connect(null, {createItem})(CreateTodo);