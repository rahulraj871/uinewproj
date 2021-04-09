import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, {useEffect, useState} from "react";
import {useFormikContext} from "formik";

import useHomeStyles from "../../themes/home";
import './MaintenancePkg.css'
import Config from "../../config";

const defaultPackages = [
	/*{
		name: 'Full Maintenance',
		monthlyMaintenanance: 'Free',
		twentyFourSupport: 'Yes',
		electronicReplacement: 'Yes',
		mechanicalReplacement: 'Yes',
		more: '-'
	},
	{
		name: 'Partial Maintenance',
		monthlyMaintenanance: 'Free',
		twentyFourSupport: 'Yes',
		electronicReplacement: 'No',
		mechanicalReplacement: 'No',
		more: '-'
	},
	{
		name: 'Oil & Grease',
		monthlyMaintenanance: 'Free',
		twentyFourSupport: 'No',
		electronicReplacement: 'No',
		mechanicalReplacement: 'No',
		more: '-'
	}*/
];
export default function MaintenancePkg(){
	const classes = useHomeStyles();
	const [selectedPackage, setSelectedPackage] = useState('Full Maintenance');
	const [defaultPackages, setPackages] = useState([]);
	const {setFieldValue, values, setValues} = useFormikContext();

	const handleSelectingPlan = (planName)=>{
		setFieldValue(`quotes.maintainence_pkg`, planName, true);
		setSelectedPackage(planName);
	}

	useEffect(()=>{
		const userInfoStr = localStorage.getItem('user');
		// if (!userInfoStr) return;
		const userInfo = JSON.parse(userInfoStr);
		// setPackages(defaultPackages);

		fetch('https://ez-static-data.s3.amazonaws.com/ezmaintain.json')
			.then((res) => res.json(), error => {
				alert('Something went wrong');
			})
			.then(res => {
				setPackages(res);// defaultPackages
			});

	}, [])

	return (
		<div>
			{/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
			<Grid container>

				{
					defaultPackages.map((pkg)=>{
						return(
							<Grid item xs={12} sm={3} className="marketingPk__grid_center">
							<div className={"home_card_box "+ (selectedPackage === pkg.name? 'selected': '') }>
								<h2 className="mb-0">{pkg.name}</h2>
								<div>
									<div className="home_card_list">
										<div className="home_card_ofr_ls">Monthly Maintenanance</div>
										<div className="home_page_list_name">{pkg.monthlyMaintenanance}</div>
									</div>
									<div className="home_card_list">
										<div className="home_card_ofr_ls">24 x7 Support</div>
										<div className="home_page_list_name">{pkg.twentyFourSupport}</div>
									</div>
									<div className="home_card_list">
										<div className="home_card_ofr_ls">Electronics Replacement</div>
										<div className="home_page_list_name">{pkg.electronicReplacement}</div>
									</div>
									<div className="home_card_list">
										<div className="home_card_ofr_ls">Mechanical Replacement</div>
										<div className="home_page_list_name">{pkg.mechanicalReplacement}</div>
									</div>
									{/* <div className="home_card_list">
										<div className="home_card_ofr_ls fw-bold"><small>More</small></div>
										<div className="home_page_list_name">{pkg.more}</div>
									</div> */}
								</div>
								<div className="home_card_btn">
									<Button onClick={()=>handleSelectingPlan(pkg.name)} variant="contained" className="home_card_btn_click" color="primary">
										{ pkg.name === 'Oil & Grease' && pkg.name === 'Partial Maintenance'? 'NOT RECOMMENDED' :'CURRENT PLAN'}
									</Button>
								</div>

							</div>
						</Grid>
						)
					})
				}

				<Grid item xs={12} sm={3} className="marketingPk__grid_center">
					<Card className="grid_help_third fullcard">
						<h3 className="cardTitle">Why Did We Make
							Recommendation ?
						</h3>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								Based on the elevator equipment, we
								recommend you the partial maintenance package because it provides the most value. Business Owners like
								you choose this plan 80% of the time.
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton className={classes.expand}>
								<MoreVertIcon/>
							</IconButton>
						</CardActions>

					</Card>
				</Grid>

			</Grid>
		</div>
	)
}
