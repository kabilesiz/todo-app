import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Menu, Modal, Progress} from "antd";
import {
    LogoutOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";
import {logout} from "../slices/auth-slice";
import {statisticsTitle} from "../utils/popupMessages";

function Navbar(props) {
    const location = useLocation();
    const userName = props.auth.userName
    const menuItems = [
        {
            label: (
                <NavLink to={"/"}>List</NavLink>
            ),
            key: '/',
            icon: <UserOutlined/>
        },
        {
            label: (
                <NavLink to={"/create"}>New</NavLink>
            ),
            key: '/create',
            icon: <PlusOutlined/>
        },
        {
            label: userName,
            key:'/account',
            icon: <UserOutlined/>,
            children: [
                {
                    label: "Logout",
                    key: '/logout',
                    onClick: props.logout,
                    icon:<LogoutOutlined/>
                },
            ]
        },

    ];
    return (
        <>
             {/*<Menu mode="horizontal"
                  selectedKeys={[location.pathname]}>
                {
                    localStorage.getItem("isAuth")
                        ?
                        <>
                            <Menu.Item key="/" icon={<UserOutlined/>}>
                                <NavLink to={"/"}>List</NavLink>
                            </Menu.Item>
                            <Menu.Item key="create" icon={<PlusOutlined/>}>
                                <NavLink to={"/create"}>New</NavLink>
                            </Menu.Item>
                            <Menu.SubMenu key="account" title={userName} icon={<UserOutlined/>}>
                                <Menu.Item key="logout" icon={<LogoutOutlined/>}
                                           onClick={() => props.logout()}>
                                    Logout
                                </Menu.Item>
                            </Menu.SubMenu>
                        </> : null
                }
            </Menu>*/}
            {
                props.auth.isAuth ? <Menu selectedKeys={[location.pathname]} mode="horizontal" items={menuItems}/> : null
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {logout})(Navbar);