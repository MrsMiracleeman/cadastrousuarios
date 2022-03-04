import React from "react";
import "./header.css"

export default props =>
    <header className="header">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted"> {props.subtitle}</p>
    </header>