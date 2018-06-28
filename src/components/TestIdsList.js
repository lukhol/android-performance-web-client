import React, { Component } from 'react';

export default class TestIdsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testIds: this.props.testIds
        }
    }

    render() {
        const listItems = [];
        let i = 0;
        for(let testId of this.state.testIds) {
            listItems.push(
                <li key={i++}>{testId}</li>
            );
        }

        return (
            <ul>
                {listItems}  
            </ul>
        );
    }
}