import React, { Component } from 'react';
import {
    AppBar, Tabs, Tab, CircularProgress
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { auth } from 'firebase';

import StudentLogin from './login/student';
import CompanyLogin from './login/company';
import AdminLogin from './login/admin';

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
    {
        exact: true,
        path: '/login/admin',
        main: props => <AdminLogin {...props} />
    }
];

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 0
        }
    }

    componentDidMount() {
        this.selection(this.state.selectedTab);
        auth().onAuthStateChanged(user => {
            if (user) return this.props.history.push('/dashboard');
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
            case 2: {
                this.props.history.push('/login/admin');
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        const { selectedTab, isLoading } = this.state;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div className='login-main'>
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
                        <Tab
                            label="Admin"
                            onClick={() => this.selectTab(2)}
                        />
                    </Tabs>
                </AppBar>
                <div className='login-box'>
                    {routes.map((val, ind) => {
                        return (
                            <Route
                                key={ind}
                                exact={val.exact}
                                path={val.path}
                                component={() => val.main(this.props)}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default LoginPage;