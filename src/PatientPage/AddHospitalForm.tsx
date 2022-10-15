import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { EntryFormHospitalValues } from "../types";
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';

interface Props{
	onSubmit:(values:EntryFormHospitalValues)=>void;
	onCancel:()=>void;
}

const AddHospitalForm=({onSubmit,onCancel}:Props)=>{
	
	const [{diagnoses}]=useStateValue();

	return(
		<Formik
			initialValues={
				{
					date:"",
					specialist:"",
					type:"Hospital",
					description:"",
					discharge:{date:"",criteria:""},
					diagnosisCodes:[]
				}
			}
			onSubmit={onSubmit}
			validate={values=>{
				const requiredError="Field is required";
				const errors:{[field:string]:string}={};
				if(!values.date){
					errors.date=requiredError;
				}
				if(!values.specialist){
					errors.specialist=requiredError;
				}
				if(!values.type){
					errors.type=requiredError;
				}
				if(!values.description){
					errors.description=requiredError;
				}
				if(!values.discharge.date || !values.discharge.criteria){
					errors.discharge=requiredError;
				}
				if(!values.diagnosisCodes){
					errors.diagnosisCodes=requiredError;
				}
				return errors;
            }}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {

			return (
			<Form className="form ui">
				<Field 
					label="Date"
					placeholder="date"
					name="date"
					component={TextField}
				/>
				<Field 
					label="Specialist"
					placeholder="specialist"
					name="specialist"
					component={TextField}
				/>
				<Field 
					label="Type"
					placeholder="type"
					name="type"
					component={TextField}
				/>
				<Field
					label="Description"
					placeholder="description"
					name="description"
					component={TextField}
				/>
				
				<DiagnosisSelection
				setFieldValue={setFieldValue}
				setFieldTouched={setFieldTouched}
				diagnoses={Object.values(diagnoses)}
				/>    

				<Field
					label="Discharge/date"
					placeholder="date"
					name="discharge.date"
					component={TextField}
				/>

				<Field
					label="Discharge/criteria"
					placeholder="criteria"
					name="discharge.criteria"
					component={TextField}
				/>

				<Grid>
					<Grid.Column floated="left" width={5}>
						<Button type="button" onClick={onCancel} color="red">
							Cancel
						</Button>
					</Grid.Column>
					<Grid.Column floated="right" width={5}>
						<Button 
							type="submit"
							floated="right"
							color="green"
							disabled={!dirty || !isValid}
						>
							Add
						</Button>
					</Grid.Column>
				</Grid>
			</Form>);
			}}
		</Formik>
		
	);

};

export default AddHospitalForm;