import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import './Footer.css'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '80%',
        margin: '0 auto'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function Footer() {
    const classes = useStyles();
    return (
        <footer className="footer">
            <div className={classes.root}>
                <Grid container>
                    <Grid className="center" item xs={12} sm={2}>
                        <div>
                            <Link component="button" variant="body2" className="font-weight-bolder" onClick={() => { console.info("I'm a button."); }}>About Us</Link>
                        </div>
                        <div className="pt-10">
                            <Link component="button" variant="body2" className="font-weight-bolder" onClick={() => { console.info("I'm a button."); }}>Contact</Link>
                        </div>
                        <div className="pt-10">
                            <Link component="button" variant="body2" className="font-weight-bolder" onClick={() => { console.info("I'm a button."); }}>Terms & Conditions</Link>
                        </div>
                    </Grid>

                    <Grid className="center" item xs={12} sm={2}>
                        <div><FacebookIcon /><span className="icon">
                            <Link component="button" variant="body2" onClick={() => { console.info("I'm a button."); }}>Facebook</Link>
                        </span>
                        </div>
                        <div><TwitterIcon /><span className="icon">
                            <Link component="button" variant="body2" onClick={() => { console.info("I'm a button."); }}>Twitter
                        </Link>
                        </span>
                        </div>
                        <div><InstagramIcon /><span className="icon">
                            <Link component="button" variant="body2" onClick={() => { console.info("I'm a button."); }}>Instagram
                    </Link></span></div>
                    </Grid>

                    <Grid className="subscription__block center" item xs={12} sm={3}>
                        <h4 className="text-center subscription__title mt-0">Subscribe to our news letter</h4>
                        <div className="center" >
                            <TextField  placeholder="ENTER YOUR E-MAIL"  InputLabelProps={{ shrink: true }} />

                            <Button className="margin-left" variant="contained" color="primary">
                                Ok
                            </Button>
                        </div>
                    </Grid>

                    <Grid className="address" item xs={12} sm={2}>
                        <address>
                            <div>123 Main St Hartford CT 0608</div>
                            <div className="pt-10">860-860-8601</div>
                            <div className="pt-10">info@selectmymaintenance.com</div>
                        </address>
                    </Grid>
                </Grid>

                <h4>
                    &copy; SelectMyMaintainance2020
                </h4>
            </div>
        </footer>
    );
}

export default Footer;
