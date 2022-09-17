import React from 'react';
import {Button, Form, Input, message} from "antd";
import {connect} from "react-redux";
import {login} from "../slices/auth-slice";
import {useNavigate} from "react-router";
import checkInput from "../utils/checkInput";
import {inputUsername, invalidUsername} from "../utils/formInputValidationMessages";
import {loginFailed, successfullyLoggedIn} from "../utils/popupMessages";

function Login({login}) {
    const navigate = useNavigate();
    const onFinish = (values) => {
        login({userName:values.userName})
            .then(() =>{
                message.success(successfullyLoggedIn).then()
                navigate("/")
            })
            .catch(() =>  message.error(loginFailed))
    };
    const formStyle = {
        marginTop: '1%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        marginBottom: '1%'
    }
    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop: '10%'}}>LOGIN FORM</h1>
            <Form
                style={formStyle}
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
                    label="User Name"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: inputUsername,
                        },
                        ({ getFieldValue }) => ({
                            validator() {
                                if (!checkInput(getFieldValue('userName'), 1)) {
                                    return Promise.reject(new Error(invalidUsername));
                                }
                                return Promise.resolve();
                            }
                        }),
                    ]}
                >
                    <Input style={{width: '50%'}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{width: '50%'}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default connect(null, {login})(Login);