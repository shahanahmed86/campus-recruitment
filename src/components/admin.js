import React, { Component } from 'react';
import {
    CircularProgress,
    Paper,
    TextField, Typography, Button
} from '@material-ui/core';
import {
    auth
} from 'firebase';

import PositionedSnackbar from '../containers/snackbar';

import './config';
import '../App.css';

class AdminLogin extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            email: 'admin@domain.com',
            password: '123abc456',
        }
    }

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    }

    onLoginButton = () => {
        this.setState({ isLoading: true });
        let { email, password } = this.state;
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    isLoading: false,
                });
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                this.setState({
                    snackOpen: true,
                    snackMessage: err.message,
                    isLoading: false
                });
            });
    }

    render() {
        const {
            isLoading,
            snackOpen, snackMessage,
            email, password,
        } = this.state;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div>
                <Paper
                    className='styling-paper'
                    elevation={3}
                >
                    <Typography
                        align='center'
                        color='textPrimary'
                        variant='h6'
                        children='Login Page'
                        gutterBottom={true}
                    />
                    <TextField
                        autoFocus
                        label="Email"
                        type='email'
                        name='email' value={email}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant="filled"
                    />
                    <TextField
                        label="Password"
                        type='password'
                        name='password' value={password}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant='filled'
                    />
                    <Button
                        children='Sign In'
                        color='primary'
                        fullWidth={true}
                        size='large'
                        variant='contained'
                        onClick={this.onLoginButton}
                    />
                </Paper>
                <PositionedSnackbar
                    open={snackOpen}
                    message={snackMessage}
                    close={this.handleClose}
                />
            </div>
        );
    }
}

export default AdminLogin;