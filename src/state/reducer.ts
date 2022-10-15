import { State } from "./state";
import { Diagnose, Patient, Entry } from "../types";

export type Action =
    {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |{
      type:"SET_DIAGNOSE_LIST";
      payload:Diagnose[];
  }
  |{
      type:"ADD_ENTRY";
      payload:Entry;
      id:string;
  };

export const setPatientList=(patients:Array<Patient>):Action=>{
		return {
			type:'SET_PATIENT_LIST',
			payload:patients
		};
};

export const setDiagnoseList=(diagnoses:Array<Diagnose>):Action=>{
	return{
		type:'SET_DIAGNOSE_LIST',
		payload:diagnoses
	};
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
	case "SET_DIAGNOSE_LIST":
		return {
			...state,
			diagnoses: { 
				...action.payload.reduce(
				(memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
				{}
            ),
            ...state.diagnoses
			}
        };
	case "ADD_ENTRY":
		const newPatients=state.patients[action.id];
		newPatients.entries.push(action.payload);
		return{
			...state,
			patients:{
				...state.patients,
				[action.id]:newPatients
			}
		};
    default:
      return state;
  }
};
