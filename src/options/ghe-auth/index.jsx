import React, { Component } from 'react';
import { map, forEach } from 'lodash';
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
                protocol: 'https://',
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

        const urlPermission = `${this.state.addSiteForm.protocol}${this.state.addSiteForm.url}`;
        const siteForm = {
            ...this.state.addSiteForm,
            url: urlPermission,
        };

        chrome.permissions.request({
            origins: [`${urlPermission}/*`],
        }, (granted) => {
            if(granted) {
                chrome.storage.sync.set({
                    permissions: {
                        ...this.state.permissionsMap,
                        [urlPermission]: siteForm,
                    },
                }, () => {
                    this.setState({
                        addSiteForm: {
                            url: '',
                            token: '',
                            protocol: 'https://',
                        },
                        permissionsMap: {
                            ...this.state.permissionsMap,
                            [urlPermission]: siteForm,
                        }
                    });
                });
            }
        });
    }

    createSiteListFormValueHandler(siteKey) {
        return (event) => {
            const checked = event.target.value;
            const cloneState = { ...this.state.siteListForm };

            if(checked) {
                cloneState[siteKey] = siteKey;
            } else {
                delete cloneState[siteKey];
            }

            this.setState({
                siteListForm: cloneState,
            });
        }
    }

    handleSiteListForm(event) {
        event.preventDefault();

        const clonedPermissionsMap = { ...this.state.permissionsMap };

        forEach(this.state.siteListForm, (value, key) => {
            delete clonedPermissionsMap[key];
        });

        chrome.permissions.remove({
            origins: map(this.state.siteListForm, (value, key) => `${key}/*`),
        }, (removed) => {
            if(removed) {
                chrome.storage.sync.set({
                    permissions: clonedPermissionsMap,
                }, () => {
                    this.setState({
                        permissionsMap: clonedPermissionsMap,
                        siteListForm: {},
                    });
                });
            }
        });
    }

    render() {
        return(
            <div>
                <h3>GHEAuthPanel</h3>
                <GHEAddSiteForm
                    protocol={ this.state.addSiteForm.protocol }
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
