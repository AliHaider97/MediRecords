export enum Gender{
	Male='male',
	Female='female',
	Other='others'
}

export interface Diagnose{
	code:string,
	name:string,
	latin?:string
}

interface BaseEntry{
	id:string;
	description:string;
	date:string;
	specialist:string;
	diagnosisCodes?:Array<Diagnose['code']>;
}

export enum HealthCheckRating{
	"Healthy"=0,
	"LowRisk"=1,
	"HighRisk"=2,
	"CriticalRisk"=3
}

export interface HealthCheckEntry extends BaseEntry{
	type:'HealthCheck';
	healthCheckRating:HealthCheckRating
}

export interface Discharge{
	date:string,
	criteria:string
}

interface HospitalEntry extends BaseEntry{
	type:'Hospital';
	description:string;
	discharge:Discharge;
}

export interface SickLeave{
	startDate:string;
	endDate:string;
}

interface OccupationalHealthcareEntry extends BaseEntry{
	type:'OccupationalHealthcare';
	employerName:string;
	description:string;
	sickLeave?:SickLeave;
}

export type Entry =|HospitalEntry|OccupationalHealthcareEntry|HealthCheckEntry;
export type EntryFormValues=Omit<HealthCheckEntry,'id'>;
export type EntryFormHospitalValues=Omit<HospitalEntry,'id'>;
export type EntryFormOccupationalHealthcareValues=Omit<OccupationalHealthcareEntry,'id'>;

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[]
}

export type SelectedPatientData=Omit<Patient,'ssn'>;
export type NewPatient=Omit<Patient,'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

type UnionOmit<T,K extends string|number|symbol>=T extends unknown?Omit<T,K>:never;
export type EntryWithoutId=UnionOmit<Entry,'id'>;