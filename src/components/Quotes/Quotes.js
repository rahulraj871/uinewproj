import "./Quotes.css"
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import CheckIcon from '@material-ui/icons/Check';
import Button from "@material-ui/core/Button";
import Config from "../../config";

export default function Quotes() {

	//const [selectedQuote, setSelectedQuote] = useState('reliable');
	const [selectedQuoteList, setSelectedQuoteList] = useState([]);
	const { setFieldValue, values, setValues } = useFormikContext();
	const [quotes, setQuotes] = useState([]);

	const handleSelectingQuote = (quoteName) => {
		setFieldValue(`quotes.quote_type`, quoteName, true);
		//setSelectedQuote(quoteName);
	
		if(!selectedQuoteList.includes(quoteName)){
			console.log('QuotaList : ', selectedQuoteList);
			let oldItem = selectedQuoteList;
			oldItem.push(quoteName);
			console.log('QuotaListOld : ', oldItem);

			setSelectedQuoteList([...oldItem]);
		}
		else{
			let index = selectedQuoteList.indexOf(quoteName);
			let oldData = selectedQuoteList;
			if (index !== -1) {
				oldData.splice(index, 1);
			}
			setSelectedQuoteList([...oldData]);
		}
	}

	const handleToggleMore = (id) => {
		// console.log('handleToggleMore: ', id, quotes);
		quotes.forEach(e=>{
			if(e.id == id){
				// console.log('handleToggleMore2: ', id,e.id, e);
				e.more = e.more == 'hidden'?'':'hidden';
			}
		})
		// console.log('handleToggleMore1: ',quotes)
		// setQuotes(quotes);
	}

	const checkToggle = (id)=> {
		console.log('checkToggle: ',quotes);
		return quotes.indexOf(id) > -1;
	}

	useEffect(() => {
		// const userInfoStr = localStorage.getItem('user');
		// if (!userInfoStr) return;
		// const userInfo = JSON.parse(userInfoStr);

		fetch(`${Config.quote}/elevator/${values.quotes.zip_code}`)
			.then((res) => res.json(), error => {
				alert('Something went wrong');
			})
			.then(res => {
				res.forEach(element => {
					element['more'] = 'hidden';
				});
				setQuotes(res);// defaultPackages
			});

	}, [])

	return (
		<div className="quote-block">
			{/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
			<Grid container>
				{
					quotes.map((pkg) => {
						return (
							// {/* <Grid item xs={12} sm={1}></Grid> */ }
							<Grid item xs = { 12} sm = { 3} className = "marketingPk__grid_center" >
								<div className="quote_card_box">
									<div className='quote-title'>
									<h2 className="mb-0">{pkg.business_name}</h2>
									</div>
									{ /* <h2 className="mt-0">Elevator</h2>*/ }

									{selectedQuoteList.includes(pkg.id ) ? <div>
										<h2 className="quote_title selected">Get Quote <CheckIcon />
										</h2> 	</div>:
										<div><h2 className="quote_title">Get Quote</h2></div>}

									<div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">NPS</div>
											<div className="home_page_list_name star-ratings"><b>{pkg.google_rating}</b></div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">BBB Rating</div>
											<div className="home_page_list_name star-ratings"><b>{pkg.google_rating}</b></div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">Google Rating</div>
											<div className="home_page_list_name star-ratings">{pkg.employees}</div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">Years In Service </div>
											<div className="home_page_list_name star-ratings">{pkg.bbb_business_rating}</div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">No of Employees</div>
											<div className="home_page_list_name star-ratings">{pkg.employees}</div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">License Number</div>
											<div className="home_page_list_name star-ratings">{pkg.lcense_number}</div>
										</div>
										<div className="quote_card_list">
											<div className="home_card_ofr_ls">Phone</div>
											<div className="home_page_list_name star-ratings">{pkg.owner_telephone}</div>
										</div>
										
										
										{/* <div className="quote_card_list" onClick={() => handleToggleMore(pkg.id)}>
											<div className="home_card_ofr_ls fw-bold"><small>More</small></div>
											<div className="home_page_list_name">-</div>
										</div> */}
										{quotes.indexOf(pkg.id) > -1 ? 
										<div>
											<div className="quote_card_list" className={pkg.more}>
												<div className="home_card_ofr_ls">Business</div>
												<div className="home_page_list_name star-ratings">{pkg.business_name}</div>
											</div>
											<div className="quote_card_list" className={pkg.more}>
												<div className="home_card_ofr_ls">Address</div>
												<div className="home_page_list_name star-ratings">{pkg.business_city_state_zip}</div>
											</div>
										</div> : <span></span>}
									</div>
									<div className="home_card_btn">
										<Button onClick={() => handleSelectingQuote(pkg.id)} variant="contained" className="home_card_btn_click" color="primary">
											{ pkg.name === 'Oil & Grease'? 'NOT RECOMMENDED' :'SELECT'}
										</Button>
									</div>
									<div className="home_card_btn">
									</div>

								</div>
						</Grid>
					)
				})
			}
			{/* <Grid item xs={12} sm={3} className="marketingPk__grid_center">
					<div className="quote_card_box" onClick={() => handleSelectingQuote('connecticut')}>
						<h2 className="mb-0">Connecticut</h2><h2 className="mt-0">Elevators</h2>

						{selectedQuote === 'connecticut' ?
							<h2 className="quote_title selected">Get Quote <CheckIcon/></h2> :
							<h2 className="quote_title">Get Quote</h2>}
						<div>
							<div className="quote_card_list">
								<div className="home_card_ofr_ls">Reputation</div>
								<div className="home_page_list_name star-ratings"><b>* *</b></div>
							</div>
							<div className="quote_card_list">
								<div className="home_card_ofr_ls">Size</div>
								<div className="home_page_list_name star-ratings">* *</div>
							</div>
							<div className="quote_card_list">
								<div className="home_card_ofr_ls">Business Rating</div>
								<div className="home_page_list_name star-ratings">* *</div>
							</div>
							<div className="quote_card_list">
								<div className="home_card_ofr_ls">Net Promoter</div>
								<div className="home_page_list_name star-ratings">* * *</div>
							</div>
							<div className="quote_card_list">
								<div className="home_card_ofr_ls fw-bold"><small>More</small></div>
								<div className="home_page_list_name">-</div>
							</div>
						</div>
						<div className="home_card_btn">
						</div>

					</div>
				</Grid><Grid item xs={12} sm={3} className="marketingPk__grid_center">
				<div className="quote_card_box" onClick={() => handleSelectingQuote('independent')}>
					<h2 className="mb-0">Independent</h2><h2 className="mt-0">Elevator</h2>

					{selectedQuote === 'independent' ? <h2 className="quote_title selected">Get Quote <CheckIcon/></h2> :
						<h2 className="quote_title">Get Quote</h2>}
					<div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Reputation</div>
							<div className="home_page_list_name star-ratings"><b className="">* * *</b></div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Size</div>
							<div className="home_page_list_name star-ratings">* * *</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Business Rating</div>
							<div className="home_page_list_name star-ratings">* *</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Net Promoter</div>
							<div className="home_page_list_name star-ratings">* *</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls fw-bold"><small>More</small></div>
							<div className="home_page_list_name">-</div>
						</div>
					</div>
					<div className="home_card_btn">
					</div>

				</div>
			</Grid><Grid item xs={12} sm={3} className="marketingPk__grid_center">
				<div className="quote_card_box" onClick={() => handleSelectingQuote('manhattan')}>
					<h2 className="mb-0">Manhattan</h2><h2 className="mt-0">Elevator</h2>

					{selectedQuote === 'manhattan' ? <h2 className="quote_title selected">Get Quote <CheckIcon/></h2> :
						<h2 className="quote_title">Get Quote</h2>}
					<div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Reputation</div>
							<div className="home_page_list_name star-ratings"><b>*</b></div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Size</div>
							<div className="home_page_list_name star-ratings">*</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Business Rating</div>
							<div className="home_page_list_name star-ratings">* *</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls">Net Promoter</div>
							<div className="home_page_list_name star-ratings">*</div>
						</div>
						<div className="quote_card_list">
							<div className="home_card_ofr_ls fw-bold"><small>More</small></div>
							<div className="home_page_list_name">-</div>
						</div>
					</div>
					<div className="home_card_btn">
					</div>

				</div>
			</Grid> */}

			</Grid>
		</div >
	)
}
