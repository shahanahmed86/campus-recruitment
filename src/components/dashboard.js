import React, { Component } from 'react';
import {
    CircularProgress, Button
} from '@material-ui/core';
import { auth, database } from 'firebase';

import { connect } from "react-redux";
import actions from '../store/actions'

import PositionedSnackbar from '../containers/snackbar';

import '../App.css';

function mapStateToProps(store) {
    return { store }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: data => dispatch(actions.fetchData(data)),
    }
}

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
        auth().onAuthStateChanged(user => {
            if (user) {
                database().ref().child('profiles').on('value', snapshot => {
                    const data = snapshot.val();
                    this.props.fetchData(data);
                    for (let key in data) {
                        this.setState({
                            accountType: data[key].uid === user.uid ? data[key].category : '',
                            isLoading: false
                        });
                    }
                });
            } else {
                this.props.history.push('/login');
            }
        });
    }

    handleClose = () => {
        this.setState({ snackOpen: false });
    }

    onSignOut = () => {
        auth().signOut()
        this.props.history.push('/login');
    }

    render() {
        const { isLoading, snackOpen, snackMessage } = this.state;
        console.log(this.state.accountType);
        if (isLoading) return (
            <div className='center-box'>
                <CircularProgress
                    color='secondary'
                />
            </div>
        );
        return (
            <div>
                <Button
                    children='Sign Out'
                    color='secondary'
                    size='small'
                    variant='contained'
                    onClick={this.onSignOut}
                />
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