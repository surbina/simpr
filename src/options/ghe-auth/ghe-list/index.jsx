import React, { Component } from 'react';

class GHEList extends Component {
    componentDidMount() {
        // When the component is mounted, grab a reference and add a DOM listener;
        this.form.addEventListener('submit', this.props.onSubmit); // React .14+
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted
        this.form.removeEventListener('submit', this.props.onSubmit); // React .14+
    }

    render() {
        return(
            <form ref={(form) => { this.form = form; }}>
                {this.props.siteList.length ?
                    <div>
                        <ul>
                            {this.props.siteList.map((siteInfo) =>
                                <li key={ siteInfo.url }>
                                    <input
                                        type="checkbox"
                                        onChange={ this.props.valueHandlerCreator(siteInfo.url) }/> {siteInfo.url}
                                </li>
                            )}
                        </ul>
                        <button type="submit">Delete auth tokens</button>
                    </div> :
                    <span>Permission list is empty</span>}
            </form>
        );
    }
}

export default GHEList;
