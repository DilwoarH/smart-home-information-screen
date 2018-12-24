import React from 'react';
import ReactDOM from 'react-dom';
import TrainLines from './train-lines';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TrainLines />, div);
    ReactDOM.unmountComponentAtNode(div);
});
