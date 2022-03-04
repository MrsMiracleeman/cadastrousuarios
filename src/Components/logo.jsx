import "./logo.css"
import React from "react"
import logo from '../images/logo.png'

export default props=>
<aside className="logo">
    <a href="/" className="logo">
        <img src={logo} alt="logo da página" />
    </a>
</aside>