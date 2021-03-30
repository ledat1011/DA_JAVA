import { applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import {location,savepost,authentication,alert,registration, notificate,post} from "./_recuder/index"
// import {userType,locationType,ALERT} from './_type/index'
var redux = require('redux');
var allReducer = redux.combineReducers({
    Account: authentication,
    location:location,
    alert:alert,
    registration:registration,
    notification: notificate,
    post:post,
    savepost: savepost
})
var store1 = redux.createStore(allReducer,applyMiddleware(thunk));


export default store1;