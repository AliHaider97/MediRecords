import React from "react";
import axios  from "axios";

import { useParams } from "react-router";
import { Divider, Form, Radio } from "semantic-ui-react";

import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Diagnose, Patient, Entry, EntryFormValues,EntryFormHospitalValues, EntryFormOccupationalHealthcareValues } from "../types";

import "./index.css";
import AddEntryForm from './AddEntryForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalHealthcareForm from './AddOccupationalHealthcareForm';

const PatientPage=()=>{

	const {id}=useParams<{id:string}>();

	const [{patients,diagnoses},dispatch]=useStateValue();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = React.useState<string | undefined>();
	const [flag,setFlag]=React.useState<boolean>(true);
    const patient=Object.values(patients).find((patient:Patient)=>patient.id===id);

	const submitNewEntry=async(values:EntryFormValues)=>{
		try{
			const {data:newEntry}=await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,values
			);
			console.log(newEntry);
			dispatch({type:'ADD_ENTRY',payload:newEntry,id:id});
			console.log(flag);
			setFlag(!flag);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catch(e:any){

			console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
		}
	};

	const submitNewHospitalEntry=async(values:EntryFormHospitalValues)=>{
		try{
			const {data:newEntry}=await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,values
			);
			
			dispatch({type:'ADD_ENTRY',payload:newEntry,id:id});
			setFlag(!flag);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catch(e:any){

			console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
		}
	};

	const submitNewOccupationalHealthcareEntry=async(values:EntryFormOccupationalHealthcareValues)=>{
		try{
			console.log(values);
			const {data:newEntry}=await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,values
			);
			
			dispatch({type:'ADD_ENTRY',payload:newEntry,id:id});
			setFlag(!flag);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catch(e:any){

			console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
		}
	};

	const onCancelEntry=()=>{
		setFlag(!flag);
	};

	const [entryType, setEntryType] = React.useState<string>("");
    
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleEntryChange = (_event: any,{value}: any) =>{ 
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		setEntryType(value);
	};

	if(patient){
	return(
		<div>
			<div>
				<h2>{patient.name}
				{(() => {
						switch (patient.gender) {
						case "male":   return <i className="mars icon"></i>;
						case "female": return <i className="venus icon"></i>;
						case "others":  return <i className="transgender icon"></i>;
						default: return null;
						}
                })()}
				</h2>
			</div>
			<div className="marginTop">
				ssn: {patient.ssn}
			</div>
			<div>
				occupation: {patient.occupation}
			</div>
			<div>
				dateOfBirth: {patient.dateOfBirth}
			</div>
			<div className="marginTopBottom">
				<h3>entries</h3>
			</div>
			<div>
				{patient.entries.map(((e,i)=>{
					return(
						<div key={i} className="marginTopBottom">
							<div>
								{e.date}
								{(() => {
								switch (e.type) {
								case "Hospital":   return <i className="hospital icon"></i>;
								case "HealthCheck": return <i className="user md icon"></i>;
								case "OccupationalHealthcare":  return <i className="stethoscope icon"></i>;
								default: return null;
								}
                            })()}
							</div>
							<div>
							{e.description}
							</div>
							<div>
								{(e.diagnosisCodes!==undefined)?
									<ul>
									{e.diagnosisCodes.map((code,i)=>
										{	
											if(diagnoses){	
											
                                                const d=Object.values(diagnoses).find((d:Diagnose)=>d.code===code);
						
												if(d){
													return(
														<li key={i}>{code} {d.name}</li>
													);
												}
												else
													return null;
											}
											else{
												return null;
											}
										}
									)
									}	
									</ul>
									:null
								}
							</div>		
						</div>
					);
				}))}
				</div>
				{(error!==undefined)?
				<div className="ui negative message">
					<i className="close icon"></i>
					<div className="header">
						Something is broken, check the console
					</div>
				</div>:null}

				<div><h4>Add New Entry</h4><Divider/></div>
				<div>
					<Form>
					<Form.Field>
						Selected an entry type value: 
					</Form.Field>
					<Form.Field>
						<Radio
							label='HealthCheck'
							name='radioGroup'
							value='HealthCheck'
							checked={entryType === 'HealthCheck'}
							onChange={handleEntryChange}
						/>
					</Form.Field>
					<Form.Field>
						<Radio
							label='Hospital'
							name='radioGroup'
							value='Hospital'
							checked={entryType === 'Hospital'}
							onChange={handleEntryChange}
						/>
					</Form.Field>
					<Form.Field>
						<Radio
							label='OccupationalHealthcare'
							name='radioGroup'
							value='OccupationalHealthcare'
							checked={entryType === 'OccupationalHealthcare'}
							onChange={handleEntryChange}
						/>
					</Form.Field>
				</Form>
			</div>
			{(() => {
					switch (entryType) {
						case "HealthCheck":	return (
													<div className="marginTopBottom">
														<AddEntryForm onSubmit={submitNewEntry} onCancel={onCancelEntry} />
													</div>
											);
						case "Hospital": return (
							<div className="marginTopBottom">
								<AddHospitalForm onSubmit={submitNewHospitalEntry} onCancel={onCancelEntry} />
							</div>
					);
						case "OccupationalHealthcare":return (
							<div className="marginTopBottom">
								<AddOccupationalHealthcareForm onSubmit={submitNewOccupationalHealthcareEntry} onCancel={onCancelEntry} />
							</div>
					);
						default: return null;
					
					}
                })()}
		</div>
        );
	}
	else{
		return null;
	}
};

export default PatientPage;