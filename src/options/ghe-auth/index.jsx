import React, { Component } from 'react';
import { map } from 'lodash';
import GHEList from './ghe-list';
import GHEAddSiteForm from './ghe-add-site-form';

class GHEAuthPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            permissionsMap: {},
            addSiteForm: {
                url: '',
                token: '',
            },
            siteListForm: {},
        };

        this.handleAddSiteFormSubmit = this.handleAddSiteFormSubmit.bind(this);
        this.createAddSiteFormValueHandler = this.createAddSiteFormValueHandler.bind(this);

        this.handleSiteListForm = this.handleSiteListForm.bind(this);
        this.createSiteListFormValueHandler = this.createSiteListFormValueHandler.bind(this);
    }

    componentDidMount() {
        chrome.storage.sync.get({
            permissions: {}
        }, (items) => {
            this.setState({
                permissionsMap: items.permissions,
            });
        });
    }

    createAddSiteFormValueHandler(valueKey) {
        return (event) =>
            this.setState({
                addSiteForm: {
                    ...this.state.addSiteForm,
                    [valueKey]: event.target.value,
                }
            });
    }

    handleAddSiteFormSubmit(event) {
        event.preventDefault();
        chrome.storage.sync.set({
            permissions: {
                ...this.state.permissionsMap,
                [this.state.addSiteForm.url]: this.state.addSiteForm,
            },
        }, () => {
            this.setState({
                addSiteForm: {
                    url: '',
                    token: '',
                },
                permissionsMap: {
                    ...this.state.permissionsMap,
                    [this.state.addSiteForm.url]: this.state.addSiteForm,
                }
            });
        });
    }

    createSiteListFormValueHandler(siteKey) {
        return (event) => {
            const checked = event.target.value;
            const cloneState = { ...this.state.addSiteForm };

            if(checked) {
                cloneState[siteKey] = siteKey;
            } else {
                delete cloneState[siteKey];
            }

            this.setState({
                addSiteForm: cloneState
            });
        }
    }

    handleSiteListForm(event) {
        event.preventDefault();

        const clonedPermissionsMap = { ...this.state.permissionsMap };

        map(this.state.addSiteForm, (key) => {
            delete clonedPermissionsMap[key];
        });

        chrome.storage.sync.set({
            permissions: clonedPermissionsMap,
        }, () => {
            this.setState({
                permissionsMap: clonedPermissionsMap,
                siteListForm: {},
            });
        });
    }

    render() {
        return(
            <div>
                <h3>GHEAuthPanel</h3>
                <GHEAddSiteForm
                    url={ this.state.addSiteForm.url }
                    token={ this.state.addSiteForm.token }
                    onSubmit={ this.handleAddSiteFormSubmit }
                    valueHandlerCreator={ this.createAddSiteFormValueHandler }
                    />

                <GHEList
                    siteList={ map(this.state.permissionsMap) }
                    onSubmit={ this.handleSiteListForm }
                    valueHandlerCreator={ this.createSiteListFormValueHandler } />
            </div>
        );
    }
}

export default GHEAuthPanel;
