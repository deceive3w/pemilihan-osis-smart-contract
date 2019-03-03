import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import options from '../contracts'
import { Provider } from 'react-redux'
import { DrizzleProvider } from "drizzle-react";
import store from '../redux/store';
import historyRoute from './historyRoute';
import { ConnectedRouter } from 'connected-react-router';
import App from '../App';
import LoaderWeb3 from '../components/LoaderWeb3';
const StoreContext = React.createContext(null);

export default (
    <DrizzleProvider options={options}>
        <LoaderWeb3>
        <Provider store={store}>
            <ConnectedRouter  history={historyRoute}>
                <BrowserRouter >
                    <Switch>
                        <Route path="/" component={App}/>
                    </Switch>
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>
        </LoaderWeb3>

    </DrizzleProvider>
)