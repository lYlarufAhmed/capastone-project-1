import {
    SET_CURRENT_USER,
    SET_ERROR,
    SET_APP_LOADING,
    SET_DYNAMIC_STATUS,
} from "../actions/types";

const initialState = {
    loading: true,
    dynamicStatus: '',
    showingDashboard: false
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APP_LOADING:
            state.loading = action.payload.status
            break
        case SET_CURRENT_USER:
            state.currentUser = action.payload.user
            state.error = action.payload.error
            state.loading = action.payload.loading
            break
        case SET_ERROR:
            state.error = action.payload.msg
            state.loading = action.payload.loading
            break
        case SET_DYNAMIC_STATUS:
            state.dynamicStatus = action.payload.status
            break
        default:
            break
        // throw Error('Invalid action'+action.type)
    }
    return JSON.parse(JSON.stringify(state))
}



