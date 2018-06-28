import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import store from '../store';

import * as SingleTestAction from '../actions/SingleTestAction';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.onItemClicked = this.onItemClicked.bind(this);
        this.onSearchClicked = this.onSearchClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            searchText: ""
        };
    }

    onItemClicked(event) {
        let additionalpath = event.target.getAttribute("additionalpath");
        hashHistory.replace(event.target.getAttribute("path") + (additionalpath == null ? "" : additionalpath));
    }

    onSearchClicked(event) {
        store.dispatch(SingleTestAction.getSingleTestResults(this.state.searchText));
        hashHistory.replace("/summaryPage/" + (this.state.searchText === "" ? "0" : this.state.searchText));
    }

    handleChange(event) {
        this.setState({
            [event.target.getAttribute('name')]: event.target.value
        });
    }

    render() {
        return (
            <Navbar className="navbar-dark info-color" collapseOnSelect fluid >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Android Performance Tests</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.onItemClicked} path="/summaryPage" additionalpath="/0">
                            Tests summary 
                        </NavItem>
                        <NavItem eventKey={1} onClick={this.onItemClicked} path="/allTestsSummary">
                            All tests summary 
                        </NavItem>
                        <NavDropdown title="Common" id="basic-nav-dropdown">
                            <MenuItem eventKey={2}>Action</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" name="searchText" placeholder="Search test results" value={this.state.searchText} onChange={this.handleChange}/>
                        </FormGroup>{' '}
                        <Button onClick={this.onSearchClicked}>Search</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}