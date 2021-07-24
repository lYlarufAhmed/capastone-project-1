import {sessionRef} from "./firebaseProvider";

export const getStudents = async (teacherUID) => {
    let students = []
    const query = sessionRef.where('teacher_uid', '==', teacherUID)
    await query.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            students.push(data)
        })
    })
    return students
}
