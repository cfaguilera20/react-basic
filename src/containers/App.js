import React, { PureComponent } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/Aux";
import withClass from "../hoc/WithClass";

export const AuthContext = React.createContext(false);

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log("[App.js] Inside contructor", props);
        this.state = {
            persons: [
                { id: 1, name: "Carlos", age: 31 },
                { id: 12, name: "Mark", age: 33 },
                { id: 13, name: "Lauren", age: 32 }
            ],
            showPersons: false,
            toggleClicked: 0,
            authenticated: false
        };
    }

    // componentWillMount() {
    //     console.log("[App.js] componentWillMount");
    // }

    componentDidMount() {
        console.log("[App.js] componentDidMount");
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(
    //         "[UPDATE App.js] shouldComponentUpdate",
    //         nextProps,
    //         nextState
    //     );
    //     return (
    //         nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons
    //     );
    //     //return true;
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log(
    //         "[UPDATE App.js] componentWillUpdate",
    //         nextProps,
    //         nextState
    //     );
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(
            "[UPDATE App.js] getDerivedStateFromProps",
            nextProps,
            prevState
        );

        return prevState;
    }

    getSnapshotBeforeUpdate() {
        console.log("[UPDATE App.js] getSnapshotBeforeUpdate");
        return null;
    }

    componentDidUpdate() {
        console.log("[UPDATE App.js] componentDidUpdate");
    }

    // state = {
    //     persons: [
    //         { id: 1, name: "Carlos", age: 31 },
    //         { id: 12, name: "Mark", age: 33 },
    //         { id: 13, name: "Lauren", age: 32 }
    //     ],
    //     showPersons: false
    // };

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = { ...this.state.persons[personIndex] };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    };

    deletePersonHandler = personIndex => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({ persons: persons });
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            };
        });
    };

    longinHandler = () => {
        this.setState({ authenticated: true });
    };

    render() {
        console.log("[App.js] render");
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangeHandler}
                />
            );
        }

        return (
            <Aux>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    login={this.longinHandler}
                    clicked={this.togglePersonsHandler}
                />
                <button
                    onClick={() => {
                        this.setState({ showPersons: true });
                    }}
                >
                    Show persons
                </button>
                <AuthContext.Provider value={this.state.authenticated}>
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, classes.App);
