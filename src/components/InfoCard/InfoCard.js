import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";

import useHomeStyles from "../../themes/home";

export default function InfoCard(props) {
	const classes = useHomeStyles();

	return (
		<Card className="grid_help_third fullcard">
			<h3 className="cardTitle">{props.title}</h3>

			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.message}
				</Typography>
			</CardContent>

			<CardActions disableSpacing>
				<IconButton className={classes.expand}>
					<MoreVertIcon/>
				</IconButton>
			</CardActions>
		</Card>
	)
}
