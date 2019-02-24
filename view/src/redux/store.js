import { generateContractsInitialState } from 'drizzle'
import options from '../contracts'
import reducer from './reducer/rootReducer';
import { createStore, compose, applyMiddleware } from 'redux';
import historyRoute from '../routes/historyRoute';
import { routerMiddleware } from 'connected-react-router';
// ...

const initialState = {
  contracts: generateContractsInitialState(options)
}

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(historyRoute)
    )
  )
)

export default store