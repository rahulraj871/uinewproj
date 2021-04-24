import "./YourInformation.css"
import Grid from "@material-ui/core/Grid";
import {TextField as MatTextField} from "@material-ui/core";
import {Field, FieldArray, useFormikContext} from "formik";
import {TextField} from "formik-material-ui";
import Autocomplete from '@material-ui/lab/Autocomplete';

import React, {useEffect, useState} from "react";

import useHomeStyles from "../../themes/home";
import InfoCard from "../InfoCard/InfoCard";
import Config from "../../config";

export default function YourInformation(props) {

	const classes = useHomeStyles();
	const {setFieldValue, values} = useFormikContext();
    const [addressOptions, setAddressOptions] = useState([]/*[{"id":1,"gmail_id":null,"user_name":"xxxxx","user_email":"hsjshdh@gmail.com","password":null,"address":"CBR","city":"CBR","zip_code":"7","quote_requests":null}]*/);
	const [cityOptions, setCityOptions] = useState([]/*[{"id":1,"gmail_id":null,"user_name":"hdjdjddj","user_email":"hdjdjdj@gmail.com","password":null,"address":"CBR","city":"CBR","zip_code":"7","quote_requests":null}]*/);
	const [zipCodeOptions, setZipCodeOptions] = useState([]/*[{"id":1,"gmail_id":null,"user_name":"hxjxj","user_email":"hxhxjdjd@gmail.com","password":null,"address":"CBR","city":"CBR","zip_code":"7","quote_requests":null}]*/);

	const [isLoaded, setIsLoaded] = React.useState(false);
	
	const elevatorsInfo = {
		original_manufacturer: '',
		year_of_commision: 1,
		application: 'passenger',
		elevator_type: 'hydraluic',
		machine_room: 'no',
		no_of_stops: 1,
		how_many_elevators: 2,
		other_types_of_elevators: 'no'
	};

	useEffect(()=>{
		const userInfoStr = localStorage.getItem('user');
		// if(!userInfoStr) {setIsLoaded(true); return};
		const userInfo = JSON.parse(userInfoStr);

		fetch(`${Config.user}/email/adityaswami89@gmail.com`)//${userInfo.email}
			.then((res) => res.json(), error => {
				alert('Something went wrong');
			})
			.then(res => {
				setIsLoaded(true);
				if/*(res.length === 1)*/(res){
					setFieldValue('quotes.name', res.user_name || '');
					setFieldValue('quotes.email', 'Costellod@uthscsa.edu');
					setFieldValue("quotes.address", res.address || '');
					setFieldValue('quotes.city', res.city || '');
					setFieldValue('quotes.zip_code', res.zip_code || '');
					setTimeout(()=>{
						document.getElementsByName('quotes.address')[1].value  = res.address ?? '' ;
						document.getElementsByName('quotes.city')[1].value = res.city;
						document.getElementsByName('quotes.zip_code')[1].value = res.zip_code;
					}, 500);
					setFieldValue('quotes.current_maintainer', res.current_maintainer || '');
					setFieldValue('quotes.type_of_business', res.type_of_business || '');
					setFieldValue('quotes.quote_requests', "2");
					setFieldValue('quotes.yourname', "Costellod uthscsa ");
					setFieldValue('quotes.NO_elevators', "2");
				}
			});

	}, []);

	const handleAddressInputChange = (searchStr)=>{
		setAddressOptions([])
		fetch(`${Config.user}/addresslike/${searchStr}`)
			.then((res) => res && res.json() || [], error => {
				alert('Something went wrong');
			})
			.then(res => {
				setAddressOptions(res);
				setCityOptions(res);
				console.log('handleAddressInputChange: ',addressOptions)
			});
	}

	const handleCityInputChange = (searchStr)=>{
		setCityOptions([]);
		let selectedAddress = values && values.quotes && values.quotes.address;
        if(typeof selectedAddress === 'object') selectedAddress = selectedAddress.address;
        if(typeof searchStr === 'object') searchStr = searchStr.city;
		fetch(`${Config.user}/city/${selectedAddress}/${searchStr}`, {
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => res && res.json() || [] , error => {
				alert('Something went wrong');
			})
			.then(res => {
				// setCityOptions(res);
				setZipCodeOptions(res);
			});
	}

	const handleZipCodeInputChange = (searchStr)=>{
		setZipCodeOptions([]);

		let selectedAddress = values && values.quotes && values.quotes.address;
		if(typeof selectedAddress === 'object') selectedAddress = selectedAddress.address;
		let city = values && values.quotes && values.quotes.city;
        if(typeof city === 'object') city = city.city;
        if(typeof searchStr === 'object') searchStr = searchStr.zip_code;

		fetch(`${Config.user}/zip/${selectedAddress}/${city}/${searchStr}`)
			.then((res) => res && res.json() || [], error => {
				alert('Something went wrong');
			})
			.then(res => {
				// setZipCodeOptions(res);
				if(res.length > 0){
					console.log('handleZipCodeInputChange', res[0])
					setFieldValue('quotes.name', res[0].user_name || '');
					setFieldValue('quotes.current_maintainer', res[0].current_maintainer || '');//Maintainer
					setFieldValue('quotes.type_of_business', res[0].type_of_business || '');//Construction
					setFieldValue('quotes.quote_requests', res[0].quote_requests || 1);

					// setFieldValue('quotes.email', res[0].user_email || '');
				}
			});
	}



	const handleElevatorCountChange = (event, form, arrayHelpers)=>{

		form.setFieldValue('quotes.quote_requests', event.target.value, true);

		const inputElevators = event.target.value;
		const currentElevators = form.values.requests.length;

		if(!inputElevators ||  inputElevators === currentElevators) return;

		if( inputElevators > currentElevators){
			Array.from(({length:  inputElevators - currentElevators}), _=>{
				arrayHelpers.push(elevatorsInfo);
			});
		}else if(inputElevators < currentElevators){
			const reduced = currentElevators - inputElevators;

			if(reduced > 0) {
				Array.from(({length: reduced}), _=>{
					arrayHelpers.pop();
				});
			}
		}
	}

	return (isLoaded?
		<div>
			<Grid container>
				<Grid item xs={12} sm={3}/>

				<Grid item xs={12} sm={6}>
					<section className="your-info form-block">
						
						<div className={classes.top}>
							<Autocomplete
								name="quotes.address"
								options={addressOptions}
								freeSolo
								getOptionLabel={option => option.address}
								onInputChange={ (event , inputValue )=>{
									handleAddressInputChange(inputValue);
									return addressOptions;
								}}
								onChange={(e, value) => {
									if(!value){
										return;
									}
                                    if(typeof value == 'object'){ value = value.address;}
									setFieldValue("quotes.address", value)
								}}
								renderInput={
									params => (
										<Field fullWidth label="Building Address" id="quotes.address" name="quotes.address" component={TextField} {...params} />
									)
								}
							/>
						</div>

						<div className={classes.top}>
							<Autocomplete
								name="quotes.city"
								options={cityOptions}
								freeSolo
								getOptionLabel={option => option.city}
								onInputChange={ (event , inputValue )=>{
									handleCityInputChange(inputValue);
									return cityOptions;
								}}
								onChange={(e, value) => {
									if(!value){
										return;
									}
                                    handleCityInputChange(value);
                                    if(typeof value == 'object'){ value = value.city;}
									localStorage.setItem("city",value);
									setFieldValue("quotes.city", value)
								}}
								renderInput={
									params => (
										<Field fullWidth label="Building City" id="quotes.city" name="quotes.city" values={localStorage.getItem('city') !== null &&  localStorage.getItem('city') !== '' ? localStorage.getItem('city') : '' } component={TextField} {...params} />
									)
								}
							/>
						</div>

						<div className={classes.top}>
							<Autocomplete
								name="quotes.zip_code"
								options={zipCodeOptions}
								freeSolo
								getOptionLabel={option => option.zip_code}
								onInputChange={ (event , inputValue )=>{
									handleZipCodeInputChange(inputValue);
									return zipCodeOptions;
								}}
								onChange={(e, value) => {
									if(!value){
										return;
									}
                                    handleZipCodeInputChange(value);
                                    if(typeof value == 'object'){ value = value.zip_code;}
									setFieldValue("quotes.zip_code", value)
								}}
								renderInput={
									params => (
										<Field fullWidth label="Building ZIP Code" id="quotes.zip_code" name="quotes.zip_code" component={TextField} {...params} />
									)
								}
							/>
						</div>

						<div className={classes.top}>
							<Field fullWidth label="Building Name " id="quotes.name" name="quotes.name" component={TextField} />
						</div>

						<div className={classes.top}>
							<Field fullWidth label="Current Maintainer" id="quotes.current_maintainer" name="quotes.current_maintainer" component={TextField} />
						</div>

						<div className={classes.top}>
							<Field fullWidth label="Type of Business" id="quotes.type_of_business" name="quotes.type_of_business" component={TextField} />
						</div>

						<div className={classes.top}>
							<Field type="email" fullWidth label="Email Address" id="quotes.email" name="quotes.email" component={TextField} 
							onBlur={(e, value) => {
								console.log('email onchange', e, value, e.target.name, e.target.value);
								// if(!value){
								// 	return;
								// }
								// handleZipCodeInputChange(value);
								// if(typeof value == 'object'){ value = value.email;}
								zipCodeOptions.forEach((e)=>{
									if(e.user_email === e.target.value){
										setFieldValue('quotes.quote_requests', e.quote_requests);
										setFieldValue('quotes.name', e.user_name);
									}
								});
							}} />
						</div>

					
						<div className={classes.top}>
							<FieldArray
								name="elevatorsInfo"
								render={arrayHelpers => (
									<Field fullWidth label="Elevators" id="quotes.NO_elevators" name="quotes.NO_elevators" as={TextField} 
												 render={({field, form}) => {
													 field.onChange = (event) => {
														 handleElevatorCountChange(event, form, arrayHelpers)
														 props.submit(event)
													 }

													 return (
														 <MatTextField fullWidth label="No. Of Elevators" id="quotes.NO_elevators"
																					 name="quotes.NO_elevators" {...field}/>)
												 }}/>
								)}/>
						</div>
						<div className={classes.top}>
							<Field fullWidth label="Your Name(First,Last) " id="quotes.yourname" name="quotes.yourname" component={TextField} />
						</div>


						{/* <div className={classes.top}>
							<Field fullWidth label="Upload File" id="quotes.file" name="quotes.file" component={TextField} type="file" />
						</div> */}



					</section>
				</Grid>

				<Grid item xs={12} sm={3} className="grid_center">
					<InfoCard title="Did you know"
										message="	SelectMyMaintenance allows you to stay on top of your Elevator Maintenance related
								renewal contracts. Sign up below."/>

				</Grid>
			</Grid>

		</div>
		:<h3 className="text-center">Loading</h3>
	)
}