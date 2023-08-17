import Constants from "utils/Constants";
import { HeadCellPost } from "./template-head/HeadCellPost";

let initialState = {
    template: [
        {
            Key: Constants.TABLE_SCREEN.POST.VALUE,
            HeadCell: [
                ...HeadCellPost
            ]
        }
    ]
}

const myReducer = (state  = initialState , action)=>{
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}

export default myReducer;