import React from "react";
import logo from "../../assets/logo.svg";
import classes from "./Cockpit.css";
import Aux from "../../hoc/Aux";

const cockpit = props => {
    const assignedClasses = [];
    let btnClass = classes.Button;

    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(" ");
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
            <header className={classes["Cockpit-header"]}>
                <img
                    src={logo}
                    className={classes["Cockpit-logo"]}
                    alt="logo"
                />
                <h1 className={classes["Cockpit-title"]}>{props.appTitle}</h1>
            </header>

            <p className={assignedClasses.join(" ")}>This is really working!</p>

            <button className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
            <br />
            <button onClick={props.login}>Log in</button>
        </Aux>
    );
};

export default cockpit;
