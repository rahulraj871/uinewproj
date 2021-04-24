import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";

import ElevatorInformationForm from './ElevatorInformationForm'
import InfoCard from '../InfoCard/InfoCard'
import "./ElevatorInformation.css";
import {FieldArray} from 'formik';
import {Field, useFormikContext} from "formik";

import Config from "../../config";


export default function ElevatorInformation(props) {

	const [elevatorInfoFormIndex, setElevatorInfoFormIndex] = React.useState([]);

	const nextElRef = React.useRef();
	const prevElRef = React.useRef();
	const {setFieldValue, values, setValues} = useFormikContext();
	const [isLoaded, setIsLoaded] = React.useState(false);
	
	// this.state = {isLoaded: false};
	useEffect(()=>{


		// const userInfoStr = localStorage.getItem('user');
		// if(!userInfoStr) return;
		// const userInfo = JSON.parse(userInfoStr);
		// console.log('ElevatorInformationForm: ',props, userInfo);
		console.log('ElevatorInformationForm11: ', values);
		
		fetch(`${Config.smm}/zip/${values.quotes.zip_code}/${values.quotes.email}`)
			.then((res) => res.json(), error => {
				alert('Something went wrong');
			})
			.then(res => {
				console.log(`${Config.smm}/zip/${values.quotes.zip_code}/${values.quotes.email}`,res);

				if(res.length > 0){
					let val = {quotes:values.quotes,requests:[]}
					res.forEach(e=>{
						val.requests.push({
							"id": e.id,
							"original_manufacturer": e.Manufacturer,
							"year_of_commision": e.yearinstalled,
							"application": e.Mdl_Type,
							"elevator_type": e.drivetype,
							"machine_room": "no",
							"no_of_stops": e.floors,
							"how_many_elevators": e.elevators,
							"other_types_of_elevators": "no",
							"howManyElevators": e.elevators
						})
					})
					setValues(val)
					
					console.log('ElevatorInformation: ', res, val)
					// setData(res)
					// setFieldValue('quotes.name', res.name || '');
					// setFieldValue('quotes.email', res.email);
					// setFieldValue('quotes.address',  res.address || '');
					// setFieldValue('quotes.city', res.city || '');
					// setFieldValue('quotes.zip_code', res.zip_code || '');
				}
				// isLoaded = true;
				setIsLoaded(true);
				document.getElementById('pager').innerHTML = 1;
				document.getElementById('outof').innerHTML = 2;//values.quotes.quote_requests;
			});

	}, []);


	const plusSlides = (index) => {
		setElevatorInfoFormIndex(currentIndex => {
			console.log( 'currentIndex:', currentIndex, 'index:');
			if(!isNaN(parseInt(currentIndex))){
				const targetIndex = parseInt(currentIndex) + index;

				const cEl = document.getElementsByClassName('ElevatorInfoFormSlides');
				let i = cEl[elevatorInfoFormIndex];
				if(i){i.style.display = 'none';}
				let j = cEl[targetIndex]
				if(j){j.style.display = 'block';}
				console.log('targetIndex:', targetIndex, 'currentIndex:', currentIndex, 'index:', index)

				document.getElementById('pager').innerHTML = targetIndex;

				return targetIndex;
			}
		});
	}

	return (isLoaded?
		<div>
			<h3 className="text-center"><span id="pager"></span>/<span id="outof"></span></h3>
			<Grid container>
				<Grid item xs={12} sm={3}/>

				<Grid item xs={12} sm={6}>

						<FieldArray
							name="elevatorsInfo"
							render={_ => (
								<div className="elevator-info-form-slides__section">
									{
										Array.from({length: +props.noOfForms}, (value, i) => {
											const slideId = `ElevatorInfoFormSlides-${i}`;

											return (
												<div id={slideId} key={i} className="form-block ElevatorInfoFormSlides fade">
													<ElevatorInformationForm manufacturesList={props.manufacturesList} formIndex={i}/>
												</div>
											)
										})
									}

									<button ref={prevElRef}
													className="elevator-info-form-slides__prev"
													onClick={(ev) => plusSlides(-1)}
													// onClick="plusSlides(-1)"
													disabled={elevatorInfoFormIndex === 0}>&#10094;</button>
									<button ref={nextElRef}
													className="elevator-info-form-slides__next"
													onClick={(ev) => plusSlides(1)}
													// onclick="console.log('next was clicked.'); return false;"
													disabled={elevatorInfoFormIndex === (props.noOfForms - 1)}>&#10095;</button>
								</div>
							)}
						/>
				</Grid>

				<Grid item xs={12} sm={3} className="grid_center">
					<InfoCard title="Elevator Type"
										message="If you have a machine room in your basement , you have a Hydro. If you don't have a machine room, choose Traction."/>
				</Grid>

			</Grid>
		</div>
		:<h3 className="text-center">Loading</h3>
	)
}
