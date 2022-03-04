import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom'


import Router from '../src/Routers'
import React from "react"
import Logo from "../src/Components/logo"
import Nav from "../src/Components/nav"
import Footer from"../src/Components/footer"

export default props =>
    <BrowserRouter>
          <div className="app">
            <Logo />
            <Nav />
            <Router />
            <Footer />
         </div>
    </BrowserRouter>

