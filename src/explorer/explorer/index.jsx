import React, { Component } from 'react';
import classNames from 'classnames';
import TreeViewContainer from '../../tree-view/tree-view-container/index';

import './explorer.scss';

class Explorer extends Component {
    render() {
        const explorerClassNames = classNames({
            'simpr-explorer': true,
            'simpr-explorer--close': !this.props.isOpen,
        });

        return (
            <div className={ explorerClassNames }>
                <div className="simpr-explorer__menu">
                    <div>
                        <h4>[PR {this.props.prData.id}] {this.props.prData.title}</h4>
                        <h5>Branch: {this.props.prData.branch}</h5>
                    </div>
                    <button
                        type="button"
                        className="simpr-explorer__menu__button"
                        onClick={ this.props.onToggleExplorer }>
                        { this.props.isOpen ?
                            '<' :
                            '>'}
                    </button>
                </div>
                <div className="simpr-explorer__panel-container">
                    <div className="simpr-explorer__panel">
                        {
                            this.props.extensionOptionsLoaded
                                ? <TreeViewContainer />
                                : <div>Loading extension ...</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Explorer;
