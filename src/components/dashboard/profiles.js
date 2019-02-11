import React, { Component } from 'react';
import {
    Paper, Typography, Button
} from '@material-ui/core'
import { connect } from "react-redux";
import { database } from 'firebase';

import ProfileDetail from './profiledetails';

import '../../App.css';

function mapStateToProps(store) {
    return { store }
}

class Profiles extends Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
            category: '',
            details: {}
        }
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
            category: '',
            details: {}
        })
    }

    renderBlock = () => {
        const { profiles, currentUser } = this.props.store;
        switch (currentUser.category) {
            case 'student': {
                return (
                    <div className='renderTable'>
                        <table className="table table-striped">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Proprietor</th>
                                    <th scope='col'>Type</th>
                                    <th scope='col'>Turnover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    className='name-styling'
                                                    children={val.name}
                                                    onClick={() => this.renderDetail(val.category, val)}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.proprietor}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.businessType}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.turnover.toLocaleString()}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            case 'company': {
                return (
                    <div className='renderTable'>
                        <table className="table table-striped">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Subject</th>
                                    <th scope='col'>Education</th>
                                    <th scope='col'>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    className='name-styling'
                                                    children={val.firstName}
                                                    onClick={() => this.renderDetail(val.category, val)}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.subject}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.education}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.gpa}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            default: {
                return (
                    <div className='renderTable'>
                        <table className="table table-striped">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Category</th>
                                    <th scope='col'>Request</th>
                                    <th scope='col'>Block</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    className='name-styling'
                                                    children={val.category === 'student' ? val.firstName : val.name}
                                                    onClick={() => this.renderDetail(val.category, val)}
                                                />
                                            </td>
                                            <td>
                                                <Typography
                                                    color='textPrimary'
                                                    paragraph={true}
                                                    children={val.category.charAt(0).toUpperCase() + val.category.slice(1)}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    children='Open'
                                                    disabled={!val.editRequest ? true : false}
                                                    onClick={() => this.openDialog(val.uid)}
                                                    color='primary'
                                                    size='small'
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    children={val.isStatus ? 'Do It' : 'Undo'}
                                                    onClick={() => this.blockIt(val.uid, ind)}
                                                    color='secondary'
                                                    size='small'
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
    }

    openDialog = uid => {
        const details = this.props.store.profiles.find(val => val.uid === uid);
        this.setState({
            dialogOpen: true,
            category: details.category,
            details
        });
    }

    updateRequest = (uid, editRequest) => {
        if (editRequest) {
            database().ref().child('profiles').child(uid).child('updatedProfile').once('value', snapshot => {
                const updatedProfile = snapshot.val();
                updatedProfile.editRequest = false;
                for (let key in updatedProfile) {
                    database().ref().child('profiles').child(uid).update({
                        [key]: updatedProfile[key]
                    })
                }
                database().ref().child('profiles').child(uid).child('updatedProfile').remove();
            });
        } else {
            database().ref().child('profiles').child(uid).update({ editRequest });
            database().ref().child('profiles').child(uid).child('updatedProfile').remove();
        }
        this.handleClose();
    }

    blockIt = (uid, ind) => {
        database().ref().child('profiles').child(uid).update({
            isStatus: !this.props.store.profiles[ind].isStatus
        });
    }

    renderDetail = (category, details) => {
        switch (category) {
            case 'student': {
                this.setState({
                    dialogOpen: true,
                    category, details
                })
                break;
            }
            case 'company': {
                this.setState({
                    dialogOpen: true,
                    category, details
                })
                break;
            }
            default: {
                return null;
            }
        }
    }

    render() {
        const { dialogOpen, category, details } = this.state;
        return (
            <div>
                <Paper className='dashboard-profiles'>
                    {this.renderBlock()}
                </Paper>
                <ProfileDetail
                    open={dialogOpen}
                    category={category}
                    details={details}
                    close={this.handleClose}
                    request={this.updateRequest}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Profiles);