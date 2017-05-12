import React, { Component } from 'react';

class GHEAddSiteForm extends Component {
    render() {
        return(
            <form onSubmit={ this.props.onSubmit } >
                <span>https://</span>
                <input
                    type="text"
                    placeholder="URL"
                    value={ this.props.url }
                    onChange={ this.props.valueHandlerCreator('url') }
                />
                <input
                    type="text"
                    placeholder="Token"
                    value={ this.props.token }
                    onChange={ this.props.valueHandlerCreator('token') }
                />
                <button type="submit">Save Auth Token</button>
            </form>
        );
    }
}

export default GHEAddSiteForm;
