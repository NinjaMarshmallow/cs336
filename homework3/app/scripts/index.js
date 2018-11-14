import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';

import PeopleBox from './peopleBox';

ReactDOM.render(
    <PeopleBox url="/api/people" pollInterval={2000} />,
    document.getElementById('content')
);

// tutorial2.js
