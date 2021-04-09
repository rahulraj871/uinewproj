import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useState, useEffect} from "react";
import {Field, useFormikContext} from "formik";
import {TextField, Select} from "formik-material-ui";
import Autocomplete from '@material-ui/lab/Autocomplete';

import useHomeStyles from "../../themes/home";
import Config from "../../config";

export default function ElevatorInformationForm(props) {
	const classes = useHomeStyles();
	const [elevatorTypesList, setElevatorTypesList] = useState([]);
	const {setFieldValue, getFieldValue, values} = useFormikContext();

	useEffect(()=>{
		console.log('ElevatorInformationForm: ', values)
		if(values.requests[props.formIndex]){
			setFieldValue(`requests.${props.formIndex}.original_manufacturer`, values.requests[props.formIndex].original_manufacturer, true);

			setFieldValue(`requests.${props.formIndex}.elevator_type`, values.requests[props.formIndex].elevator_type,true);

			setTimeout(()=>{
				console.log('requests.'+props.formIndex+'.original_manufacturer', `requests.${props.formIndex}.original_manufacturer`);
				console.log('requests.'+props.formIndex+'.elevator_type', `requests.${props.formIndex}.elevator_type`)
				document.getElementsByName('props.manufacturesList')[0].value = values.requests[props.formIndex].original_manufacturer;
				document.getElementsByName('elevatorTypesList')[0].value = values.requests[props.formIndex].elevator_type;
			}, 500);
		}
	}, []);

	const handleManufactureSelection = (manufacture) => {

		setFieldValue(`requests.${props.formIndex}.original_manufacturer`, manufacture, true);

		

		fetch(`${Config.smm}/${manufacture}`)
			.then((res) => res.json(), error => {
				alert('Something went wrong');
			})
			.then(result => {
				console.log('setElevatorTypesList',result);
				setElevatorTypesList(result);
			});
	}

	return (
		<div>
			<div className={classes.top} className="visibility-none">
				<Field fullWidth label="id" name={`requests.${props.formIndex}.id`}
							 component={TextField}/>
			</div>
			<div className={classes.top}>
				<Autocomplete
					
					name={`requests.${props.formIndex}.original_manufacturer`}
					options={props.manufacturesList}
					freeSolo
					// getOptionLabel={option => props.manufacturesList}
					onInputChange={ (event , inputValue )=>{
						// handleCityInputChange(inputValue);
						handleManufactureSelection(inputValue)
						return props.manufacturesList;
					}}
					onChange={(e, value) => {
						// handleCityInputChange(value);
						// handleManufactureSelection(e.target.value)
						// if(typeof value == 'object'){ value = props.manufacturesList;}
						// setFieldValue("quotes.city", value)
						setFieldValue(`requests.${props.formIndex}.original_manufacturer`, value, true);
					}}
					renderInput={
						params => (
							<Field fullWidth id="props.manufacturesList" name="props.manufacturesList" component={TextField} {...params} />
							// label="Original Manufacture" 
						)
					}
				/>
				<FormControl fullWidth className={classes.formControl}>
					
					{/* <InputLabel id="demo-simple-select-outlined-label">Original Manufacturer</InputLabel>
					<Field
						labelId="demo-simple-select-outlined-label"
						name={`requests.${props.formIndex}.original_manufacturer`}
						component={Select}
						fullWidth
						label="Original Manufacture"
						onChange={(event) => {
							handleManufactureSelection(event.target.value)
						}}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{
							props.manufacturesList.map((manufacture, idx) => {
								return <MenuItem key={idx} value={manufacture}>{manufacture}</MenuItem>
							})
						}
					</Field> */}
				</FormControl>
			</div>

			<div className={classes.top}>
				<Field fullWidth label="Year of Commissioning" name={`requests.${props.formIndex}.year_of_commision`}
							 component={TextField}/>
			</div>

			<div className={classes.top}>
				<Field fullWidth label="Application" name={`requests.${props.formIndex}.application`}
							 component={TextField}/>
			</div>

			<div className={classes.top}>
				<Autocomplete
					className={`requests.${props.formIndex}.elevator_type`}
					name={`requests.${props.formIndex}.elevator_type`}
					options={elevatorTypesList}
					freeSolo
					// defaultValue={values.requests[props.formIndex].elevator_type}
					// getOptionLabel={option => props.manufacturesList}
					onInputChange={ (event , inputValue )=>{
						// handleCityInputChange(inputValue);
						// handleManufactureSelection(inputValue)
						return elevatorTypesList;
					}}
					onChange={(e, value) => {
						// handleCityInputChange(value);
						// handleManufactureSelection(e.target.value)
						// if(typeof value == 'object'){ value = props.manufacturesList;}
						// setFieldValue("quotes.city", value)
						console.log(`requests.${props.formIndex}.elevator_type`,value, values[`requests.${props.formIndex}.elevator_type`])
						setFieldValue(`requests.${props.formIndex}.elevator_type`, value, true);
					}}
					renderInput={
						params => (
							<Field fullWidth  id="elevatorTypesList" name="elevatorTypesList" component={TextField} {...params} />
							// label="Elevator Type"
						)
					}
				/>
				{/* <FormControl fullWidth className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Elevator Type
					</InputLabel>
					<Field
						labelId="demo-simple-select-outlined-label"
						name={`requests.${props.formIndex}.elevator_type`}
						component={Select}
						label="Elevator Type"
						fullWidth
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>

						{
							elevatorTypesList.map((elevatorType, idx) => {
								return <MenuItem key={idx} value={elevatorType}>{elevatorType}</MenuItem>;
							})
						}
					</Field>
				</FormControl> */}
			</div>

			<div className={classes.top}>
				<FormControl fullWidth className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Machine Room
					</InputLabel>
					<Field
						labelId="demo-simple-select-outlined-label"
						name={`requests.${props.formIndex}.machine_room`}
						component={Select}
						label="Machine Room"
						fullWidth
					>
						<MenuItem value="yes">Yes</MenuItem>
						<MenuItem value="no">No</MenuItem>
					</Field>
				</FormControl>
			</div>

			<div className={classes.top}>
				<Field fullWidth label="Floors" name={`requests.${props.formIndex}.no_of_stops`}
							 component={TextField}/>
			</div>

			{/* <div className={classes.top}>
				<Field fullWidth label="How Many Elevators" name={`requests.${props.formIndex}.howManyElevators`}
							 component={TextField}/>
			</div> */}

			{/* <div className={classes.top}>
				<FormControl fullWidth className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Other Types of Elevators?</InputLabel>
					<Field
						labelId="demo-simple-select-outlined-label"
						name={`requests.${props.formIndex}.other_types_of_elevators`}
						component={Select}
						label="Other Types of Elevators?"
						fullWidth
					>
						<MenuItem value="yes">Yes</MenuItem>
						<MenuItem value="no">No</MenuItem>
					</Field>
				</FormControl>
			</div> */}
		</div>
	)
}
