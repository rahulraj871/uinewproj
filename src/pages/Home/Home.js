import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BuildIcon from '@material-ui/icons/Build';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import {Formik, Form, useFormikContext} from 'formik';
import * as Yup from 'yup';

import './Home.css';
import { ElevatorInformation } from '../../components/ElevatorInformation'
import { YourInformation } from '../../components/YourInformation'
import { MaintenancePkg } from "../../components/MaintenancePkg";
import { Quotes } from "../../components/Quotes";
import useHomeStyles from "../../themes/home";
import Config from '../../config';
import { AlertDialog } from '../../components/Utils'


const useQontoStepIconStyles = makeStyles({
	root: {
		color: '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
	},
	active: {
		color: '#784af4',
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
	completed: {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18,
	},
});

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
			})}
		>
			{completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
		</div>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 */
	active: PropTypes.bool,
	/**
	 * Mark the step as completed. Is passed to child components.
	 */
	completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	active: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,#2196F3 0%,#CDDC39 50%,rgb(138,35,135) 100%)',
		},
	},
	completed: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,#2196F3 0%,#CDDC39 50%,rgb(138,35,135) 100%)',
		},
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#eaeaf0',
		borderRadius: 1,
	},
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage:
			'linear-gradient( 136deg, #2196F3 0%, #2196F3 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage:
			'linear-gradient( 136deg, #2196F3 0%, #2196F3 50%, rgb(138,35,135) 100%)',
	},
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <AccountCircle />,
		2: <ApartmentIcon />,
		3: <BuildIcon />,
		4: <MonetizationOnIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 */
	active: PropTypes.bool,
	/**
	 * Mark the step as completed. Is passed to child components.
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};


function getSteps() {
	return ['Your Information', 'Elevator Information', 'Maintenance Pkg', 'Quotes'];
}

function HomeSteppers() {

	const classes = useHomeStyles();
	const elevatorsInfo = {
		original_manufacturer: '',
		year_of_commision: 1,
		application: '',
		elevator_type: '',
		machine_room: 'no',
		no_of_stops: 1,
		how_many_elevators: 1,
		other_types_of_elevators: 'no'
	};

	const initialValues = {
		quotes: {
			name: '',
			email: '',
			address: '',
			city: '',
			zip_code: '',
			current_maintainer:'',
			type_of_business: '',
			quote_requests: 1,
			file: '',
			maintainence_pkg: 'full',
			quote_type: 'reliable'
		},
		requests: [{ ...elevatorsInfo }],
	}

	const formValidations = Yup.object().shape({
		quotes: Yup.object().shape({
			name: Yup.string().required('Required'),
			address: Yup.string().required('Required'),
			city: Yup.string().required('Required'),
			zip_code: Yup.string().required('Required'),
			quote_requests: Yup.string().required('Required'),
			current_maintainer: Yup.string().required('Required'),
			type_of_business: Yup.string().required('Required'),
			email: Yup.string().email('Invalid email').required('Required'),
		})
	})


	const [activeStep, setActiveStep] = React.useState(0);
	const [noOfElevator, setNoOfElevator] = React.useState(1);
	const [manufacturesList, setManufacturesList] = React.useState([]);
	const [manufacturesListLoaded, setManufacturesListLoaded] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [alertMessage, setAlertMessage] = React.useState('');

	useEffect(() => {
		if (manufacturesListLoaded) return

		fetch(`${Config.smm}`)
			.then((res) => res && res.json() || [], error => {
				setManufacturesListLoaded(true);
			})
			.then(result => {
				setManufacturesList(result);
				setManufacturesListLoaded(true);
			});

	}, []);

	const steps = getSteps();

	const handleNext = async (props) => {
		const errors = props.errors;
		if (!props.dirty || (activeStep === 0 && Object.keys(errors).length > 0)) {
			handleClickOpen("Please fill in all the required fields.");
			await props.submitForm();
			return
		}
		window.scrollTo(0, 0);
		setActiveStep((prevActiveStep) => prevActiveStep === 3 ? prevActiveStep : prevActiveStep + 1);
	};

	const handleBack = () => {
		window.scrollTo(0, 0);
		setActiveStep((prevActiveStep) => prevActiveStep === 0 ? prevActiveStep : prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleYourInfoFormSubmit = (ev) => {
		initialValues.maintenancePackage = Array.from({ length: ev.target.value }, _ => elevatorsInfo);
		setNoOfElevator(ev.target.value);
	}

	const submitForm = (values, { setSubmitting }) => {
		setTimeout(() => {

			if(values && values.quotes && typeof values.quotes.address === 'object') values.quotes.address = values.quotes.address.address;
			if(values && values.quotes && typeof values.quotes.city === 'object') values.quotes.city = values.quotes.city.city;
			if(values && values.quotes && typeof values.quotes.zip_code === 'object') values.quotes.zip_code = values.quotes.zip_code.zip_code;

			const OPTIONS = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values)
			}

			console.log('submitForm', values);
			fetch(`${Config.quote}/save`, OPTIONS)
				.then((res) => res.json(), error => {
					setSubmitting(false);
				})
				.then(result => {
					console.log(result);
					if (result.statusCode === 200) {
						handleClickOpen("Form submitted successfully")
						return
					}
					handleClickOpen(result.message);
				});
		}, 400);
	}

	const handleClickOpen = (message) => {
		setAlertMessage(message);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	let slideItem;
	switch (activeStep) {
		case 0:
			slideItem = <YourInformation submit={handleYourInfoFormSubmit} />;
			break
		case 1:
			slideItem = <ElevatorInformation manufacturesList={manufacturesList} noOfForms={noOfElevator} />;
			break;
		case 2:
			slideItem = <MaintenancePkg />;
			break;
		case 3:
			slideItem = <Quotes />;
			break;

	}

	return (
		<div className={classes.root}>
			<Formik
				initialValues={initialValues}
				validationSchema={formValidations}
				isInitialValid={false}
				onSubmit={(values, { setSubmitting }) => submitForm(values, { setSubmitting })}
			>
				{
					(props) => (
						<Form>
							<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
									</Step>
								))}
							</Stepper>

							<div>

								{slideItem}

								<div className={classes.right}>
									<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
										Back
									</Button>

									{
										activeStep === steps.length - 1 ? (<Button
											variant="contained"
											color="primary"
											type="submit"
											className={classes.button}>
											Finish
										</Button>) : ('')
									}

									{
										activeStep < steps.length - 1 ? (<Button
											variant="contained"
											color="primary"
											onClick={() => {
												handleNext(props)
											}}
											type="button"
											// disabled={!props.isValid}
											title={props.status}
											className={classes.button}>
											Next
										</Button>) : ''
									}

								</div>
							</div>
						</Form>
					)}
			</Formik>
			<AlertDialog title="Alert" message={alertMessage} open={open} close={handleClose} />
		</div>
	);
}

export default HomeSteppers;
