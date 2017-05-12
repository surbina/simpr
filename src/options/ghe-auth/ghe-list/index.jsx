import React, { Component } from 'react';

class GHEList extends Component {
    render() {
        return(
            this.props.siteList.length ?
                <form onSubmit={ this.props.onSubmit }>
                    <ul>
                        {this.props.siteList.map((siteInfo) =>
                            <li key={ siteInfo.url }>
                                <input
                                    type="checkbox"
                                    onChange={ this.props.valueHandlerCreator(siteInfo.url) }/> {siteInfo.url}
                            </li>
                        )}
                    </ul>
                    <button type="submit">Delte auth tokens</button>
                </form> :
                <span>Permission list is empty</span>
        );
    }
}

export default GHEList;
