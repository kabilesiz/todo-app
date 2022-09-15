import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const RequireAuth = ({ children,isAuth }) => {
    if (isAuth === null || isAuth === undefined || !isAuth) {
        return <Navigate to={"/not-authenticated"}></Navigate>;
    }
    return children;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    };
};

export default connect(mapStateToProps, null)(RequireAuth);
