import React, { Component } from 'react';
import {
    CircularProgress
} from '@material-ui/core';
import { auth } from 'firebase';

import PositionedSnackbar from '../containers/snackbar';

import '../App.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            accountType: '',
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.checkLoginStatus();
    }
    
    checkLoginStatus = () => {
        auth().onAuthStateChanged(user => {
            const { email, uid } = user;
            if (uid) return this.setState({
                uid,
                isLoading: false,
                accountType: email.substr(0, email.length) === 'admin@domain.com' ? 'admin' : 'normal'
            });
            this.props.history.push('/login');
        });
    }

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

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
                The Dashboard
                <PositionedSnackbar
                    open={snackOpen}
                    message={snackMessage}
                    close={this.handleClose}
                />
            </div>
        );
    }
}

export default Dashboard;