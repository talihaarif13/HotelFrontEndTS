import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";

const RequireAdminAuth = () => {

    const aunthenticate = useSelector(state=> state.users?.authenticated);
    const navigate = useNavigate();
    return aunthenticate ? <Outlet/> : navigate("/admin/dashbord");
}

export default RequireAdminAuth;