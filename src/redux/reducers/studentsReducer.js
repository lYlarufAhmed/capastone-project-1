import {SET_STUDENTS, SET_STUDENTS_LOADING} from "../actions/types";

const initialState = {
    loading: true,
    students: []
}

export default function studentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STUDENTS_LOADING:
            state.loading = action.payload.status
            break
        case SET_STUDENTS:
            console.log(action.payload.students)
            state.students = action.payload.students.slice()
            state.loading = action.payload.loading
            break
        default:
            break
    }
    return JSON.parse(JSON.stringify(state))
}




