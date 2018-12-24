import React from 'react';
import ReactDOM from 'react-dom';
import Roads from './roads';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Roads />, div);
    ReactDOM.unmountComponentAtNode(div);
});
