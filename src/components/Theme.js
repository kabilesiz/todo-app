import React, {useEffect, useState} from 'react';
import {Space, Switch} from "antd";
import getDataOrAriaProps from "antd/es/_util/getDataOrAriaProps";

function Theme(props) {
    const { updateAppComponent } = props;
    const [isLightMode, setIsLightMode] = useState(localStorage.getItem("mode") === 'light' ? true : false);
    const changeTheme = () => {
        setIsLightMode(!isLightMode)
    }
    useEffect(() => {
        if (isLightMode) localStorage.setItem("mode","light")
        else localStorage.setItem("mode","dark")
        updateAppComponent()
    },[isLightMode])
    return (
        <div>
            <Space align="center" style={{ marginBottom: 16 }}>
                <Switch checked={isLightMode} onChange={changeTheme} />
            </Space>
        </div>
    );
}

export default Theme;