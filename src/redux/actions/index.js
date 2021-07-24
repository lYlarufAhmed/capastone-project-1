import {
    SET_CURRENT_USER,
    SET_ERROR,
    SET_APP_LOADING,
    SET_STUDENTS,
    SET_STUDENTS_LOADING,
    SET_DYNAMIC_STATUS
} from "./types";
import {firestore, sessionRef} from "../../firebaseProvider";

export const setAppLoading = (status) => ({
    type: SET_APP_LOADING,
    payload: {status}
})
export const setStudentsLoading = (status) => ({
    type: SET_STUDENTS_LOADING,
    payload: {status}
})

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: {user, error: null, loading: false}
})


export const setError = (msg) => ({
    type: SET_ERROR,
    payload: {msg, loading: false}
})
export const setStudents = (students) => ({
    type: SET_STUDENTS,
    payload: {students, loading: false}
})
export const setDynamicStatus = (status) => ({
    type: SET_DYNAMIC_STATUS,
    payload: {status}
})

export function deleteStudents(teacherUID) {
    return async function (dispatch, state) {
        const batch = firestore.batch()
        const students = await sessionRef.where('teacher_uid', '==', teacherUID).get()
        if (!students.empty) {
            students.docs.forEach(doc => batch.delete(doc.ref))
            batch.commit().then(() => {
                dispatch(setDynamicStatus(''))
                dispatch(setStudents([]))
            })
        }

    }
}

export function resetAnswers(teacherUID) {
    return async function (dispatch, getState) {
        // console.log(state)

        dispatch(setDynamicStatus('resetting'))
        const students = await sessionRef.where('teacher_uid', '==', teacherUID).get()

        if (!students.empty) {
            const batch = firestore.batch()
            students.forEach(doc => {
                batch.update(doc.ref, {content: ''})
            })
            await batch.commit()
        }
        dispatch(setDynamicStatus(''))
    }
}

export function createStudents(names) {
    return async function (dispatch, getState) {
        // console.log(state)
        const currentUser = getState().app.currentUser
        dispatch(setDynamicStatus('submitting'))
        let student_names
        if (names.includes(','))
            student_names = names.split(',')
        else
            student_names = names.split('\n')
        const batch = firestore.batch()
        for (let studentName of student_names) {
            if (studentName) {
                let docRef = sessionRef.doc()
                batch.set(docRef, {
                    "student_name": studentName,
                    teacher_uid: currentUser.uid,
                    content: ''
                })

            }


        }
        try {
            await batch.commit()
            dispatch(setError(''))
        } catch (e) {
            dispatch(setError(e.message))
        }
        dispatch(setDynamicStatus(''))
    }
}