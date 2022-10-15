import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnoseList, setPatientList, useStateValue } from "./state";
import { Diagnose, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  
  React.useEffect(() => {
    
	const fetchDiagnoseList=async ()=>{

		try{
			const {data:diagnoses}=await axios.get<Diagnose[]>(
				`${apiBaseUrl}/diagnoses`
			);
		
			dispatch(setDiagnoseList(diagnoses));
		}catch(e){
			console.error(e);
		}
	};
    void fetchDiagnoseList();	
  
	}, [dispatch]);

	React.useEffect(() => {
    
		const fetchPatientList = async () => {
        try {
			const { data: patients } = await axios.get<Patient[]>(
           `${apiBaseUrl}/patients`
		);
			dispatch(setPatientList(patients));
		} catch (e) {
			console.error(e);
        }
		};
		
		void fetchPatientList();
	}, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            
			<Route path="/patients/:id">
				<PatientPage />
			</Route>
			<Route path="/">
              <PatientListPage />
            </Route>

          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
