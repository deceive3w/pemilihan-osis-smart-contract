import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { drizzleReducers } from 'drizzle'
import historyRoute from '../../routes/historyRoute';

const reducer = combineReducers({
  router: connectRouter(historyRoute),
  ...drizzleReducers
})

export default reducer