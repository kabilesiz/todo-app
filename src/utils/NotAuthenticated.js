import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

function NotAuthenticated(props) {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:'center',height:`${window.innerHeight}px`}}>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to={`/login`}><Button type="primary">Login</Button></Link>}
            />
        </div>
    );
}

export default NotAuthenticated;