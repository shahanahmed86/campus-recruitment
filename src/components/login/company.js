import React, { Component } from 'react';
import {
    CircularProgress,
    Paper, AppBar,
    TextField, Typography, Button
} from '@material-ui/core';
import {
    auth, database,
} from 'firebase';
import { connect } from 'react-redux';
import actions from '../../store/actions';

import PositionedSnackbar from '../../containers/snackbar';

import '../config';
import '../../App.css';

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        changeSignUp: condition => dispatch(actions.changeSignUp(condition)),
    }
}

class CompanyLogin extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            proprietor: '',
            cnic: '',
            ntn: '',
            businessType: '',
            turnover: 0
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
        let {
            email, password, confirmPassword, name, proprietor, cnic, ntn, businessType, turnover
        } = this.state;
        if (email && password && confirmPassword && name && proprietor && cnic && ntn && businessType && turnover) {
            if (password === confirmPassword) {
                auth().createUserWithEmailAndPassword(email, password)
                    .then(success => {
                        const uid = success.user.uid
                        database().ref().child('profiles').child(uid).set({
                            email, name, proprietor, cnic, ntn, businessType, turnover,
                            uid,
                            isStatus: true,
                            editRequest: false,
                            category: 'company'
                        });
                        email = password = confirmPassword = name = proprietor = cnic = ntn = businessType = turnover = '';
                        this.setState({
                            email, password, confirmPassword, name, proprietor, cnic, ntn, businessType, turnover,
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
    }

    onChangeLoginState = () => {
        this.props.changeSignUp(!this.props.store.isSignUp);
        this.props.history.replace('/login');
    }

    render() {
        const {
            isLoading,
            snackOpen, snackMessage,
            email, password, confirmPassword, name, proprietor, cnic, ntn, businessType, turnover
        } = this.state;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div>
                <AppBar position='relative'>
                    <Typography
                        align='center'
                        color='inherit'
                        variant='h6'
                        children='Sign Up Form'
                    />
                </AppBar>
                <Paper
                    className='styling-paper'
                    elevation={3}
                >
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
                        label="Name"
                        type='text'
                        name='name' value={name}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant='filled'
                    />
                    <TextField
                        label="Proprietor"
                        type='text'
                        name='proprietor' value={proprietor}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant='filled'
                    />
                    <TextField
                        label="CNIC"
                        type='text'
                        name='cnic' value={cnic}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant='filled'
                    />
                    <TextField
                        label="National Tax Number (NTN)"
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
                        label="Turnover"
                        type='number'
                        name='turnover' value={turnover}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin="dense"
                        variant='filled'
                    />
                    <Button
                        children='Sign Up'
                        color='primary'
                        fullWidth={true}
                        size='medium'
                        variant='contained'
                        onClick={this.onLoginButton}
                    />
                    <div className='login-question'>
                        <Typography
                            children="Already have an ID ? "
                            inline={true}
                            paragraph={true}
                        />
                        <Button
                            children='Sign In'
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyLogin);