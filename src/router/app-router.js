import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import UpdateTodo from "../components/UpdateTodo";
import TodoList from "../components/TodoList";
import NotFound from "../utils/NotFound";
import NotAuthenticated from "../utils/NotAuthenticated";
import RequireAuth from "../utils/require-auth";
import Login from "../components/Login";
import Navbar from "../navbar/Navbar";
import CreateTodo from "../components/CreateTodo";

function AppRouter(props) {
    return (
        <>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route
                        path="/login"
                        element={<Login></Login>}>
                    </Route>
                    <Route
                        path="/update/:id"
                        element={<RequireAuth><UpdateTodo/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/create"
                        element={<RequireAuth><CreateTodo/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/"
                        element={<RequireAuth><TodoList/></RequireAuth>}>
                    </Route>
                    <Route
                        path="*"
                        element={<NotFound></NotFound>}>
                    </Route>
                    <Route
                        path="/not-authenticated"
                        element={<NotAuthenticated></NotAuthenticated>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;