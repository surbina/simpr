import React, { Component } from 'react';
import classNames from 'classnames';
import TreeView from '../../../tree-view/components/tree-view';

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
                    <span>
                        { this.props.isOpen ?
                            'EXPLORER IS OPEN' :
                            'EXPLORER IS CLOSED'}
                    </span>
                    <button
                        type="button"
                        className="simpr-explorer__menu__button"
                        onClick={ this.props.onToggleExplorer }>
                        { this.props.isOpen ?
                            '<' :
                            '>'}
                    </button>
                </div>
                <div className="simpr-explorer__panel">
                    <TreeView />
                </div>
            </div>
        );
    }
}
export default Explorer;
