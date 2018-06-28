import * as React from "react"
import* as Menu from './Menu';

export default class Layout extends React.Component<{},{}> {
    constructor(props: {}) {
        super(props);
    }

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