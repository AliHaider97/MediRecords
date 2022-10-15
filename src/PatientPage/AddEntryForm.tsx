import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';

interface Props{
	onSubmit:(values:EntryFormValues)=>void;
	onCancel:()=>void;
}

const AddEntryForm=({onSubmit,onCancel}:Props)=>{
	
	const [{diagnoses}]=useStateValue();

	return(
		<Formik
			initialValues={
				{
					date:"",
					specialist:"",
					type:"HealthCheck",
					description:"",
					healthCheckRating:0,
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
				if(!values.healthCheckRating){
					errors.healthCheckRating=requiredError;
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
				label="HealthCheckRating"
				name="healthCheckRating"
				component={NumberField}
				min={0}
				max={3}
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

export default AddEntryForm;