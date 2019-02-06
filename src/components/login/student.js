import React, { Component } from 'react';
import {
    CircularProgress,
    Paper,
    TextField, Typography, Button
} from '@material-ui/core';
import {
    auth, database,
} from 'firebase';

import PositionedSnackbar from '../../containers/snackbar';

import '../config';
import '../../App.css';

class StudentLogin extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            isSignIn: true,
            email: 'shahan@domain.com',
            password: '123abc456',
            confirmPassword: '123abc456',
            fatherName: 'Abdus Subhan Khan',
            firstName: 'Shahan',
            lastName: 'Ahmed Khan',
            cnic: '42301-8964999-9',
            subject: 'Commerce',
            education: 'Intermediate',
            gpa: '3.0',
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
            // subject: '',
            // education: '',
            // gpa: '',
            // dob: ''
        }));
    }

    onLoginButton = () => {
        this.setState({ isLoading: true });
        let {
            isSignIn,
            email, password, confirmPassword, fatherName, firstName, lastName, cnic, subject, education, gpa, dob
        } = this.state;
        if (!isSignIn) {
            if (email && password && confirmPassword && fatherName && firstName && lastName && cnic && subject && education && gpa && dob) {
                if (password === confirmPassword) {
                    auth().createUserWithEmailAndPassword(email, password)
                        .then(success => {
                            const uid = success.user.uid
                            database().ref().child('profiles').child(uid).set({
                                email, fatherName, firstName, lastName, cnic, subject, education, gpa, dob,
                                uid,
                                isStatus: true,
                                category: 'student'
                            });
                            email = password = confirmPassword = fatherName = firstName = lastName = cnic = subject = education = gpa = dob = '';
                            this.setState({
                                email, password, confirmPassword, fatherName, firstName, lastName, cnic, subject, education, gpa, dob,
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
            confirmPassword, fatherName, firstName, lastName, cnic, subject, education, gpa, dob
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
                                label="Subject"
                                type='text'
                                name='subject' value={subject}
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
                                label="Grade Point Average (GPA)"
                                type='text'
                                name='gpa' value={gpa}
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