import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Menu} from "antd";
import {
    LogoutOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";
import {logout} from "../slices/auth-slice";

function Navbar(props) {
    const rightStyle = {position: 'absolute', top: 0, right: 0}
    const location = useLocation();
    const userName = props.auth.userName

    return (
        <>
            <Menu mode="horizontal"
                  theme={localStorage.getItem("mode") ? localStorage.getItem("mode") : 'light'}
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
                            <Menu.SubMenu key="account" style={rightStyle} title={userName} icon={<UserOutlined/>}>
                                <Menu.Item key="logout" icon={<LogoutOutlined/>}
                                           onClick={() => props.logout()}>
                                    Logout
                                </Menu.Item>
                            </Menu.SubMenu>
                        </> : null
                }
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {logout})(Navbar);