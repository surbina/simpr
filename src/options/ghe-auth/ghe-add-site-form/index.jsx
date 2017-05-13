import React, { Component } from 'react';

class GHEAddSiteForm extends Component {
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
                <select
                    value={ this.props.protocol }
                    onChange={ this.props.valueHandlerCreator('protocol') }>
                    <option value="http://">http://</option>
                    <option value="https://">https://</option>
                </select>
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
