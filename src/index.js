import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import {Provider} from "react-redux";
import store from "./store";
import AppRouter from "./router/app-router";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </>
)
;
