import React, { Component } from 'react';
import {
    CircularProgress,
    Paper,
    TextField, Typography, Button
} from '@material-ui/core';
import {
    auth, database,
} from 'firebase';

import PositionedSnackbar from '../containers/snackbar';

import './config';
import '../App.css';

class CompanyLogin extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            isSignIn: true,
            email: 'brotherenterprises@domain.com',
            password: '123abc456',
            confirmPassword: '123abc456',
            ntn: '4109930-3',
            businessType: 'Distribution',
            proprietorName: 'Noman Akhtar',
            cnic: '99999-9999999-9'
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

    onChangeLoginState = () => {
        this.setState(state => ({
            isSignIn: !state.isSignIn,
            // email: '',
            // password: '',
            // confirmPassword: '',
            // ntn: '',
            // businessType: '',
            // proprietorName: '',
            // cnic: ''
        }));
    }

    onLoginButton = () => {
        this.setState({ isLoading: true });
        let {
            isSignIn,
            email, password, confirmPassword, ntn, businessType, proprietorName, cnic
        } = this.state;
        if (!isSignIn) {
            if (email && password && confirmPassword && ntn && businessType && proprietorName && cnic) {
                if (password === confirmPassword) {
                    auth().createUserWithEmailAndPassword(email, password)
                        .then(success => {
                            const uid = success.user.uid
                            database().ref().child('profiles').child('companies').child(uid).set({
                                email, password,
                                confirmPassword, ntn, businessType, proprietorName, cnic,
                                uid, isStatus: true
                            });
                            email = password = confirmPassword = ntn = businessType = proprietorName = cnic = '';
                            this.setState({
                                email, password, confirmPassword, ntn, businessType, proprietorName, cnic,
                                snackOpen: true,
                                snackMessage: 'Email created successfully',
                                isLoading: false
                            })
                        })
                        .catch(err => {
                            this.setState({
                                snackOpen: true,
                                snackMessage: err.message,
                                isLoading: false
                            });
                        });
                }
                else {
                    this.setState({
                        snackOpen: true,
                        snackMessage: 'Password mismatched',
                        isLoading: false
                    });
                }
            } else {
                this.setState({
                    snackOpen: true,
                    snackMessage: 'All fields are required',
                    isLoading: false
                });
            }
        } else {
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
    }

    render() {
        const {
            isLoading,
            isSignIn,
            snackOpen, snackMessage,
            email, password,
            confirmPassword, ntn, businessType, proprietorName, cnic
        } = this.state;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary'/>
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
                    {!isSignIn && (
                        <div>
                            <TextField
                                label="Confirm Password"
                                type='password'
                                name='confirmPassword' value={confirmPassword}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="National Tax Number"
                                type='text'
                                name='ntn' value={ntn}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="Business Type"
                                type='text'
                                name='businessType' value={businessType}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="Proprietor Name"
                                type='text'
                                name='proprietorName,' value={proprietorName}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="Computerized-National-Identity-Card (CNIC)"
                                type='text'
                                name='cnic' value={cnic}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                        </div>
                    )}
                    <Button
                        children={isSignIn ? 'Sign In' : 'Sign Up'}
                        color='primary'
                        fullWidth={true}
                        size='large'
                        variant='contained'
                        onClick={this.onLoginButton}
                    />
                    <div className='login-question'>
                        <Typography
                            children={!isSignIn ? 'Already have an ID ? ' : "Don't have an ID ? "}
                            inline={true}
                            paragraph={true}
                        />
                        <Button
                            children={!isSignIn ? 'Sign In' : 'Sign Up'}
                            color='secondary'
                            size='small'
                            variant='text'
                            onClick={this.onChangeLoginState}
                        />
                    </div>
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

export default CompanyLogin;