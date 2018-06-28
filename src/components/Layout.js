import React from 'react';
//import { connect } from 'react-redux';
import Menu from './Menu';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}