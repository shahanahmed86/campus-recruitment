import React, { Component } from 'react';
import {
    AppBar, Tabs, Tab
} from '@material-ui/core';
import { Route } from 'react-router-dom';

import StudentLogin from './student';
import '../App.css';

const routes = [
    {
        exact: true,
        path: '/login/student',
        main: () => <StudentLogin />
    },
    {
        exact: true,
        path: '/login/company',
        main: () => <h1>Company</h1>
    },
    {
        exact: true,
        path: '/login/admin',
        main: () => <h1>Admin</h1>
    }
]

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 0
        }
    }

    componentDidMount() {
        this.selection(this.state.selectedTab);
    }

    selectTab = tab => {
        this.setState({
            selectedTab: tab
        });
        this.selection(tab);
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
        const { selectedTab } = this.state;
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
                                component={val.main}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default LoginPage;