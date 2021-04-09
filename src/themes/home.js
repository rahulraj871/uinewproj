import {makeStyles} from "@material-ui/core/styles";

const useHomeStyles = makeStyles((theme) => ({
	root: {
		margin: '0 auto',
		position: 'relative'
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	top: {
		paddingTop: '15px',
		margin: '0 auto',
		width: '94%'
	},
	TextField: {
		width: '94%'
	},
	right: {
		position: 'absolute',
		right: '24px',
		bottom: '8px'
	},

	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}
}));

export default useHomeStyles;
