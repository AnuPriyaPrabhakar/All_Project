import { combineReducers } from "redux"
import saveApplicationReducer from "../pages/KYC_NEW/Insert/state/save-application-reducer";


const appReducers = combineReducers(
    {
        kycApplication:saveApplicationReducer
    }
)
export default appReducers;