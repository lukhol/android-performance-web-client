import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import Layout from './components/Layout';
import  MainPage from './pages/MainPage';
import SummaryPage from './pages/SummaryPage';
import AllSummaryPage from './pages/AllSummaryPage';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={MainPage}></IndexRoute>
                <Route path="/summaryPage/:id" component={SummaryPage} />
                <Route path="/allTestsSummary" component={AllSummaryPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();