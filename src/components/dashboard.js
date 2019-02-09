import React, { Component } from 'react';
import {
    CircularProgress, Button,
    AppBar, Typography
} from '@material-ui/core';
import { auth, database } from 'firebase';

import { connect } from "react-redux";
import actions from '../store/actions'

import PositionedSnackbar from '../containers/snackbar';
import HeaderText from './headertext';

import '../App.css';

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        renderCondition: condition => dispatch(actions.renderCondition(condition)),
        fetchData: data => dispatch(actions.fetchData(data)),
        currentUser: data => dispatch(actions.currentUser(data)),
        clearReduxState: () => dispatch(actions.clearReduxState())
    }
}

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
        }
    }

    componentDidMount() {
        this.props.renderCondition(true);
        auth().onAuthStateChanged(user => {
            if (user) {
                this.getData(user.uid)
                this.props.renderCondition(false);
            } else {
                this.props.history.push('/login/student');
            }
        });
    }

    getData = uid => {
        database().ref().child('profiles').on('value', snapshot => {
            const data = snapshot.val();
            const currentUser = Object.values(data).find(val => val.uid === uid);
            switch (currentUser.category) {
                case 'company': {
                    const students = Object.values(data).filter(val => val.category === 'student');
                    this.props.fetchData(students);
                    break;
                }
                case 'student': {
                    const companies = Object.values(data).filter(val => val.category === 'company');
                    this.props.fetchData(companies);
                    break;
                }
                default: {
                    const profiles = Object.values(data).filter(val => val.category !== 'admin');
                    this.props.fetchData(profiles)
                }
            }
            this.props.currentUser(currentUser);
        });
    }

    handleClose = () => {
        this.setState({ snackOpen: false });
    }

    onSignOut = () => {
        auth().signOut()
        this.props.clearReduxState();
        this.props.history.push('/login/student');
    }

    render() {
        const { snackOpen, snackMessage } = this.state;
        const { isLoading, currentUser } = this.props.store;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div>
                <HeaderText {...this.props} />
                <div>
                    {currentUser.email && (
                        <AppBar position='static'>
                            <div className='styling-appbar'>
                                <Typography
                                    children={currentUser.email}
                                    variant='h6'
                                    color='inherit'
                                />
                                <Button
                                    children='Sign Out'
                                    color='secondary'
                                    size='small'
                                    variant='contained'
                                    onClick={this.onSignOut}
                                />
                            </div>
                        </AppBar>
                    )}
                    <PositionedSnackbar
                        open={snackOpen}
                        message={snackMessage}
                        close={this.handleClose}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);