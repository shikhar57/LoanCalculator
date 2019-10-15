import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import _ from 'lodash';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LoanCalculator from '../loanCalculator/LoanCalculator'
import GetLoanAPI from "../../actions/apis/loan/GetLoanAPI";
import APITransport from "../../actions/apitransport/apitransport";

const styles = theme => ({
    drawer: {
        width: '200px',
        flexShrink: 0,
        top: '20%',
        whiteSpace: 'nowrap',
        '& div': {
            backgroundColor: '#2497E3',
            color: 'white'
        },
        position: 'fixed',
        zIndex: 999
    },
    paperStyle: {
        border: '0px'
    },
    listItem: {
        'background-color': '#262b31',
        paddingLeft: '9px',
        '&:hover': {
            'background-color': '#1f242c'
        },
        '& div': {
            background: 'transparent'
        },
    },
    listItemCap: {
        'background-color': '#262b31',
        paddingLeft: '9px',
        '&:hover': {
            'background-color': '#1f242c'
        },
        '& div': {
            background: 'transparent'
        },
    },
    listItemSubCap: {
        'background-color': '#262b31 !important',
        paddingLeft: '9px',
        paddingTop: '3px',
        paddingBottom: '3px',
        '&:hover': {
            'background-color': '#1f242c !important'
        },
        '& div': {
            background: 'transparent'
        },
    },
    itemText: {
        'background-color': 'transparent',
        padding: '0px 11px',
        '& span': {
            color: 'white',
            fontSize: 15,
        }
    },
    itemTextCap: {
        'background-color': 'transparent',
        padding: '0px 11px',
        '& span': {
            color: 'white',
            fontSize: 15,
            fontWeight:'bold'
        }
    },
    subItemText: {
        'background-color': 'transparent',
        padding: '0px 0px 0px 42px',
        '& span': {
            color: 'white',
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    drawerOpen: {
        width: '500px',
        transition: '.28s width'
    },
    drawerClose: {
        overflowX: 'hidden',
        width: '50px',
        transition: '.28s width'
    },
    drawerPaper: {
        width: '300px',
    },
    active: {
        background: '#2497E3',
        '&:hover': {
            cursor: 'pointer',
            background: '#a1d0ff'
        },
        '& div': {
            background: 'transparent'
        }
    },
    link: {
        paddingTop: 0
    },
    tempDrawer: {
        position: 'fixed',
        zIndex: 999
    },
    cursorAuto: {
        cursor: 'auto'
    }
});

class NavDrawer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            variant: null,
            openPopup: false,
            address:'',
            loanHistory : JSON.parse(localStorage.getItem('loans'))
        }

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.loanResults.principal !== undefined)
         if((nextProps.loanResults.principal.amount !== this.props.loanResults.principal.amount) || (nextProps.loanResults.numPayments !== this.props.loanResults.principal.amount) && !_.isEmpty(nextProps.loanResults.principal)){
             this.setState({
                 loanHistory: JSON.parse(localStorage.getItem('loans'))
             })
         }
    }

    hoverDrawer = () => {
        if (!this.state.open) {
            this.setState({
                variant: 'temporary',
                open: true
            })
        }
    }

    blurDrawer = () => {
        if (this.state.variant) {
            this.setState({
                open: false,
                variant: null,
            })
        }
    }

    callLoanDetails = (loanAmt, loanDuration)=>{
        this.setState({
            loanAmt : loanAmt,
            loanDuration : loanDuration
        })
        let albumObj = new GetLoanAPI({loanAmt:loanAmt, loanDuration:loanDuration});
        this.props.APITransport(albumObj);
    }

    render() {
        const { classes } = this.props;

        return (<React.Fragment>
            <Drawer variant={"permanent"}
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open,
                })}
                classes={{
                    paper: classNames(classes.paperStyle, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    }),
                    root: this.state.variant == 'temporary' ? classes.tempDrawer : null
                }}
                open={this.state.open}
                onMouseOver={this.hoverDrawer}
                onMouseLeave={this.blurDrawer}
            >
            <List className={classes.link}>
                    <React.Fragment>
                        <span className={classes.cursorAuto} >
                                {
                                    _.map(this.state.loanHistory,(value,key)=>{
                                         return <ListItem key={key} classes={{ root: classes.listItemCap }} className={classes.active} onClick={()=>this.callLoanDetails(value.loanAmt,value.loanDuration)}>
                                             <ListItemText className={classes.subItemText} primary={'Loan Amount - $' + value.loanAmt +' : Loan Duration - '+ value.loanDuration + ' months'} />
                                             </ListItem>
                                    })
                                }
                        </span>
                    </React.Fragment>

            </List>

        </Drawer>
            <LoanCalculator amt={this.state.amt} dur={this.state.due} />
        </React.Fragment>);
    }
}

const mapStateToProps = (state) => {
    return {
        apistatus: state.apistatus,
        loanResults: state.loanResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NavDrawer)))