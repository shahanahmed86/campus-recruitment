import React, { Component } from 'react';
import {
    CircularProgress, Button
} from '@material-ui/core';
import { auth, database } from 'firebase';

import { connect } from "react-redux";
import actions from '../store/actions'

import PositionedSnackbar from '../containers/snackbar';

import '../App.css';

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: data => dispatch(actions.fetchData(data)),
        currentUser: data => dispatch(actions.currentUser(data)),
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
        this.props.history.push('/login');
    }

    render() {
        const { isLoading, snackOpen, snackMessage } = this.state;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress
                    color='secondary'
                />
            </div>
        );
        return (
            <div>
                <Button
                    children='Sign Out'
                    color='secondary'
                    size='small'
                    variant='contained'
                    onClick={this.onSignOut}
                />
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