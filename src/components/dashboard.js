import React, { Component } from 'react';
import {
    CircularProgress, Button,
    AppBar, Typography,
    Tabs, Tab
} from '@material-ui/core';
import { auth, database } from 'firebase';
import { connect } from "react-redux";
import { Route } from 'react-router-dom';

import actions from '../store/actions';
import PositionedSnackbar from '../containers/snackbar';
import HeaderText from './headertext';
import OwnProfile from './dashboard/ownprofile';
import Profiles from './dashboard/profiles';

import '../App.css';

const routes = [
    {
        path: '/dashboard/profile',
        exact: true,
        main: props => <OwnProfile {...props} />
    },
    {
        path: '/dashboard/allprofiles',
        exact: true,
        main: props => <Profiles {...props} />
    }
];

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        renderCondition: condition => dispatch(actions.renderCondition(condition)),
        fetchData: data => dispatch(actions.fetchData(data)),
        currentUser: data => dispatch(actions.currentUser(data)),
        clearReduxState: () => dispatch(actions.clearReduxState())
    }
}

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMessage: '',
            selectedTab: 0,
        }
    }
    
    componentDidMount() {
        this.props.renderCondition(true);
        auth().onAuthStateChanged(user => {
            if (user) {
                this.getData(user.uid)
                this.selection(this.state.selectedTab);
                this.props.renderCondition(false);
            } else {
                this.props.history.push('/login/student');
            }
        });
    }

    getData = uid => {
        database().ref().child('profiles').on('value', snapshot => {
            const data = snapshot.val();
            const currentUser = Object.values(data).find(val => val.uid === uid);
            switch (currentUser.category) {
                case 'company': {
                    const students = Object.values(data).filter(val => val.category === 'student' && val.isStatus);
                    this.props.fetchData(students);
                    break;
                }
                case 'student': {
                    const companies = Object.values(data).filter(val => val.category === 'company' && val.isStatus);
                    this.props.fetchData(companies);
                    break;
                }
                default: {
                    const profiles = Object.values(data).filter(val => val.category !== 'admin');
                    this.props.fetchData(profiles)
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
        this.props.clearReduxState();
        this.props.history.push('/login/student');
    }

    selectTab = selectedTab => {
        this.selection(selectedTab);
        this.setState({ selectedTab });
    }

    selection = val => {
        switch (val) {
            case 0: {
                this.props.history.push('/dashboard/profile');
                break;
            }
            case 1: {
                this.props.history.push('/dashboard/allprofiles');
                break;
            }
            default: {
                this.props.history.push('/dashboard/profile');
                break;
            }
        }
    }

    getLabel = () => {
        switch (this.props.store.currentUser.category) {
            case 'company': {
                return 'Students'
            }
            case 'student': {
                return 'Companies'
            }
            default: {
                return 'All Profiles'
            }
        }
    }

    render() {
        const { snackOpen, snackMessage, selectedTab } = this.state;
        const { isLoading, currentUser } = this.props.store;
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress color='secondary' />
            </div>
        );
        return (
            <div>
                <HeaderText {...this.props} />
                {currentUser.email && (
                    <div>
                        <AppBar position='static'>
                            <div className='styling-appbar'>
                                <Typography
                                    children={currentUser.email}
                                    variant='h6'
                                    color='inherit'
                                />
                                <Button
                                    children='Sign Out'
                                    color='secondary'
                                    size='small'
                                    variant='contained'
                                    onClick={this.onSignOut}
                                />
                            </div>
                        </AppBar>
                        <div className='tab-styling'>
                            <AppBar position='relative'>
                                <Tabs
                                    value={selectedTab}
                                    variant='fullWidth'
                                    centered
                                >
                                    <Tab
                                        label={currentUser.category}
                                        onClick={() => this.selectTab(0)}
                                    />
                                    <Tab
                                        label={this.getLabel()}
                                        onClick={() => this.selectTab(1)}
                                    />
                                </Tabs>
                            </AppBar>
                        </div>
                        <div>
                            {routes.map((val, ind) => {
                                return (
                                    <Route
                                        key={ind}
                                        path={val.path}
                                        exact={val.exact}
                                        component={val.main}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
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