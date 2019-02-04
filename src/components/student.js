import React, { Component } from 'react';
import {
    Paper,
    TextField, Typography, Button
} from '@material-ui/core';
import {
    auth, database,
    // database
} from 'firebase';

import PositionedSnackbar from '../containers/snackbar';

import './config';
import '../App.css';

class StudentLogin extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            isSignIn: true,
            isStatus: true,
            email: 'shahan@domain.com',
            password: '123abc456',
            confirmPassword: '123abc456',
            fatherName: 'Abdus Subhan Khan',
            firstName: 'Shahan',
            lastName: 'Ahmed Khan',
            cnic: '42301-8964999-9',
            education: 'Intermediate',
            dob: '1986-01-29'
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
            // fatherName: '',
            // firstName: '',
            // lastName: '',
            // cnic: '',
            // education: '',
            // dob: ''
        }));
    }

    onLoginButton = () => {
        let {
            isSignIn,
            email, password, confirmPassword, fatherName, firstName, lastName, cnic, education, dob,
            status
        } = this.state;
        if (!isSignIn) {
            if (email && password && confirmPassword && fatherName && firstName && lastName && cnic && education && dob) {
                if (password === confirmPassword) {
                    auth().createUserWithEmailAndPassword(email, password)
                        .then(success => {
                            const key = database().ref().child('profiles').child('students').push().key;
                            database().ref().child('profiles').child('students').child(key).set({
                                email, password, confirmPassword, fatherName, firstName, lastName, cnic, education, dob,
                                status,
                                uid: success.user.uid
                            });
                            email = password = confirmPassword = fatherName = firstName = lastName = cnic = education = dob = ''
                            this.setState({
                                email, password, confirmPassword, fatherName, firstName, lastName, cnic, education, dob,
                                snackOpen: true,
                                snackMessage: 'Email created successfully'
                            })
                        })
                        .catch(err => {
                            this.setState({
                                snackOpen: true,
                                snackMessage: err.message
                            });
                        });
                }
                else {
                    this.setState({
                        snackOpen: true,
                        snackMessage: 'Password mismatched'
                    });
                }
            } else {
                this.setState({
                    snackOpen: true,
                    snackMessage: 'All fields are required'
                });
            }
        } else {

        }
    }

    render() {
        const {
            isSignIn,
            snackOpen, snackMessage,
            email, password,
            confirmPassword, fatherName, firstName, lastName, cnic, education, dob
        } = this.state;
        return (
            <div>
                <Paper
                    className='styling-paper'
                    elevation={3}
                >
                    <Typography
                        align='center'
                        color='primary'
                        variant='h5'
                        children='Campus Recruitment System'
                    />
                    <Typography
                        align='center'
                        color='secondary'
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
                                label="Father's Name"
                                type='text'
                                name='fatherName' value={fatherName}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="First Name"
                                type='text'
                                name='firstName' value={firstName}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="Last Name"
                                type='text'
                                name='lastName' value={lastName}
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
                            <TextField
                                label="Education"
                                type='text'
                                name='education' value={education}
                                onChange={this.handleChange}
                                fullWidth={true}
                                margin="dense"
                                variant='filled'
                            />
                            <TextField
                                label="Date of Birth"
                                InputLabelProps={{ shrink: true }}
                                type='date'
                                name='dob' value={dob}
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

export default StudentLogin;