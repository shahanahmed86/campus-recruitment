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
        fetchData: data => dispatch(actions.fetchData(data)),
        currentUser: data => dispatch(actions.currentUser(data)),
        clearReduxState: () => dispatch(actions.clearReduxState()),
    }
}

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) return this.getData(user.uid);
            this.props.history.push('/login');
        });
    }

    getData = uid => {
        database().ref().child('profiles').on('value', snapshot => {
            const data = snapshot.val();
            const currentUser = Object.values(data).find(val => val.uid === uid);
            switch (currentUser.category) {
                case 'company': {
                    const companies = Object.values(data).filter(val => val.category === 'student');
                    this.props.fetchData(companies);
                    break;
                }
                case 'student': {
                    const students = Object.values(data).filter(val => val.category === 'company');
                    this.props.fetchData(students);
                    break;
                }
                default: {
                    const allProfile = Object.values(data).filter(val => val.category !== 'admin');
                    this.props.fetchData(allProfile)
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
        this.props.history.push('/login');
    }

    render() {
        const { isLoading, snackOpen, snackMessage } = this.state;
        if (isLoading && !this.props.store.currentUser.email) return (
            <div className='center-box'>
                <CircularProgress
                    color='secondary'
                />
            </div>
        );
        return (
            <div>
                <HeaderText />
                <AppBar position='static'>
                    <div className='styling-appbar'>
                        <Typography
                            children={this.props.store.currentUser.email}
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
                <PositionedSnackbar
                    open={snackOpen}
                    message={snackMessage}
                    close={this.handleClose}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);