import React, {useEffect, useState} from 'react';
import {Space, Switch} from "antd";

function Theme(props) {
    const { updateAppComponent } = props;
    const [isLightMode, setIsLightMode] = useState(
        localStorage.getItem("mode") === null ? false :
            localStorage.getItem("mode") === 'light');
    const changeTheme = () => {
        setIsLightMode(!isLightMode)
    }
    useEffect(() => {
        if (isLightMode) localStorage.setItem("mode","light")
        else localStorage.setItem("mode","dark")
        updateAppComponent()
    },[isLightMode])
    return (
        <div style={{display:"flex", justifyContent: "flex-end"}}>
            <Space align="center" style={{ marginBottom: 16 }}>
                Dark | Light  <Switch checked={isLightMode} onChange={changeTheme} />
            </Space>
        </div>
    );
}

export default Theme;