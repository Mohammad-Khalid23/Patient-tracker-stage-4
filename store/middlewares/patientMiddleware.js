import PatientActions from "../actions/patientActions.js"
import * as firebase from 'firebase'
import { AsyncStorage } from 'react-native'
export default class PatientMiddleware {
    static asyncAddPatient(patientData) {
        console.log(patientData, "mw")
        var myvalue = []
        return (dispatch) => {
            // AsyncStorage.clear();
            try {
                firebase.database().ref('patients').push(patientData);

                const rootRef = firebase.database().ref('patients');
                rootRef.on('value', snap => {
                    console.log(snap.val(), "snap value")
                    let obj = snap.val();

                    let newArray = []
                    for (let key in obj) {
                        newArray.push(obj[key]);
                    }
                    dispatch(PatientActions.addPatient(newArray))

                })
            }
            catch (error) {
                alert(error)
            }
        }
    }

    static asyncLoadPatient() {
        return (dispatch) => {

            if (firebase.database().ref('patients')) {
                const rootRef = firebase.database().ref('patients');
                rootRef.on('value', snap => {
                    console.log(snap.val(), "snap value")
                    let obj = snap.val();

                    let newArray = []
                    for (let key in obj) {
                        newArray.push(obj[key]);
                    }
                    dispatch(PatientActions.addPatient(newArray))

                })

            }
        }
    }


    static asyncDeletePatient(index) {
        // console.log(data, "middleware of del")
        return (dispatch) => {
            var removePatient;
            const rootRef = firebase.database().ref('patients');
            rootRef.on('value', snap => {
                console.log(snap.val(), "snap value")
                let obj = snap.val();

                let keys = []
                for (let key in obj) {
                    keys.push(key);
                }
                removePatient = keys[index]
            })

            firebase.database().ref('patients/'+ removePatient).remove();

            // AsyncStorage.getItem("patients", (err, result) => {
            //     patients = JSON.parse(result);
            //     patients.splice(data, 1);
            //     AsyncStorage.setItem("patients", JSON.stringify(patients))
            //     dispatch(PatientActions.addPatient(patients))

            // })

        }
    }

}