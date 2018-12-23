import React from 'react';
import ReactDOM from 'react-dom';
import BusTimes from './bus-times';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BusTimes />, div);
    ReactDOM.unmountComponentAtNode(div);
});
