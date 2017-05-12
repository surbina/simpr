import React from 'react';
import { render } from 'react-dom';

import GHEAuthPanel from './ghe-auth';

render(
    <div>
        <GHEAuthPanel />
    </div>,
    document.getElementById('optionsContainer')
);
