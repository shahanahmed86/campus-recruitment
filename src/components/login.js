import React, { Component } from 'react';
import {
    AppBar, Tabs, Tab,
    CircularProgress,
    Paper, TextField, Typography, Button
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { auth } from 'firebase';
import { connect } from 'react-redux';
import actions from '../store/actions'

import StudentLogin from './login/student';
import CompanyLogin from './login/company';
import HeaderText from './headertext';

import './config';
import '../App.css';

const routes = [
    {
        exact: true,
        path: '/login/student',
        main: props => <StudentLogin {...props} />
    },
    {
        exact: true,
        path: '/login/company',
        main: props => <CompanyLogin {...props} />
    },
];

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        renderCondition: condition => dispatch(actions.renderCondition(condition)),
        changeSignUp: condition => dispatch(actions.changeSignUp(condition)),
    }
}

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 0,
            email: 'admin@domain.com',
            password: '123abc456',
        }
    }

    componentDidMount() {
        this.props.renderCondition(true);
        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/dashboard')
            } else {
                if (this.props.store.isSignUp) {
                    this.selection(this.state.selectedTab);
                    this.props.history.push('/login/student');
                } else {
                    this.props.history.push('/login');
                }
                this.props.renderCondition(false);
            }
        });
    }

    selectTab = selectedTab => {
        this.selection(selectedTab);
        this.setState({ selectedTab });
    }

    selection = val => {
        switch (val) {
            case 0: {
                this.props.history.push('/login/student');
                break;
            }
            case 1: {
                this.props.history.push('/login/company');
                break;
            }
            default: {
                break;
            }
        }
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    }

    onLoginButton = () => {
        this.props.renderCondition(true);
        let { email, password } = this.state;
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.renderCondition(false);
            })
            .catch(err => {
                this.setState({
                    snackOpen: true,
                    snackMessage: err.message,
                    isLoading: false
                });
            });
    }

    onChangeLoginState = () => {
        this.selection(this.state.selectedTab);
        console.log(this.props.store.isSignUp)
        this.props.changeSignUp(!this.props.store.isSignUp);
    }

    render() {
        const { selectedTab, email, password } = this.state;
        const { isSignUp, isLoading } = this.props.store;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div className='login-main'>
                <HeaderText {...this.props} />
                {isSignUp ? (
                    <AppBar position='relative'>
                        <Tabs
                            value={selectedTab}
                            variant='fullWidth'
                            centered
                        >
                            <Tab
                                label="Student"
                                onClick={() => this.selectTab(0)}
                            />
                            <Tab
                                label="Company"
                                onClick={() => this.selectTab(1)}
                            />
                        </Tabs>
                    </AppBar>
                ) : (
                        <div className='center-box'>
                            <div>
                                <AppBar position='relative'>
                                    <Typography
                                        align='center'
                                        color='inherit'
                                        variant='h6'
                                        children='Login Page'
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
                                    <Button
                                        children='Sign In'
                                        color='primary'
                                        fullWidth={true}
                                        size='large'
                                        variant='contained'
                                        onClick={this.onLoginButton}
                                    />
                                    <div className='login-question'>
                                        <Typography
                                            children="Don't have an ID ? "
                                            inline={true}
                                            paragraph={true}
                                        />
                                        <Button
                                            children='Sign Up'
                                            color='secondary'
                                            size='small'
                                            variant='text'
                                            onClick={this.onChangeLoginState}
                                        />
                                    </div>
                                </Paper>
                            </div>
                        </div>
                    )}
                <div className='login-box'>
                    {routes.map((val, ind) => {
                        return (
                            <Route
                                key={ind}
                                exact={val.exact}
                                path={val.path}
                                component={val.main}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);