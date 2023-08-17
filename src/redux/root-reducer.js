/**
 * ****************************************************************************
 * @description     :   Combinie all reducers on app
 * @created at      :   2020/12/03
 * @created by      :   QuyPN - quy.pham@toploop.co
 * @package         :   dashlite-admin-react
 * @copyright       :   Copyright (c) TOPLOOP
 * @version         :   1.0.0
 * ****************************************************************************
 */

/**
 * import libraries
 */
import { combineReducers } from 'redux';

/**
 * import reducer process for all child components
 */
import app from './app/reducer';
import userReducer from './user/reducer';
import AppReruitmentProposal from './recruitment-proposal/reducer';
import ConfigTableReducer from './table-config/reducer';

/**
 * Combinie all reducers on app
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @access : public
 */
const rootReducer = combineReducers({
    app,
    userReducer,
    AppReruitmentProposal,
    TableConfig: ConfigTableReducer,
});

export default rootReducer;
