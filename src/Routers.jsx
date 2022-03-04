import React from "react";
import {Routes, Route} from "react-router-dom"

import Home from "../src/Components/home"
import UserCrud from "../src/Components/usersCrud";


export default props=>
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/users" element={<UserCrud />}/>
        <Route path="*" to={<Home />} />
    </Routes>