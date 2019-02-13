import React, { Component } from 'react';
import {
    Typography,
    TextField, Button, Paper
} from '@material-ui/core';
import { connect } from "react-redux";
import { database } from 'firebase';

import '../../App.css';

function mapStateToProps(store) {
    return { store }
}

class OwnProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fatherName: props.store.currentUser.fatherName,
            firstName: props.store.currentUser.firstName,
            lastName: props.store.currentUser.lastName,
            cnic: props.store.currentUser.cnic,
            subject: props.store.currentUser.subject,
            education: props.store.currentUser.education,
            gpa: props.store.currentUser.gpa,
            dob: props.store.currentUser.dob,
            name: props.store.currentUser.name,
            proprietor: props.store.currentUser.proprietor,
            ntn: props.store.currentUser.ntn,
            businessType: props.store.currentUser.businessType,
            turnover: props.store.currentUser.turnover
        }
    }

    isEditState() {
        const {
            fatherName, firstName, lastName, cnic, subject, education, gpa, dob,
            name, proprietor, ntn, businessType, turnover
        } = this.state;
        const { currentUser } = this.props.store;
        if (currentUser.editRequest) {
            return true;
        } else {
            if (currentUser.category === 'student') {
                if (fatherName === currentUser.fatherName && firstName === currentUser.firstName && lastName === currentUser.lastName && cnic === currentUser.cnic && subject === currentUser.subject && education === currentUser.education && gpa === currentUser.gpa && dob === currentUser.dob) return true;
                return false;
            } else {
                if (name === currentUser.name && proprietor === currentUser.proprietor && ntn === currentUser.ntn && businessType === currentUser.businessType && cnic === currentUser.cnic && turnover === currentUser.turnover) return true;
                return false;
            }
        }
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    }

    onRequestSubmit = () => {
        const { currentUser } = this.props.store;
        const {
            fatherName, firstName, lastName, cnic, subject, education, gpa, dob,
            name, proprietor, ntn, businessType, turnover
        } = this.state
        let updatedProfile = {}
        if (currentUser.category === 'student') {
            updatedProfile = { fatherName, firstName, lastName, cnic, subject, education, gpa, dob }
        } else {
            updatedProfile = { name, proprietor, cnic, ntn, businessType, turnover }
        }
        database().ref().child('profiles').child(currentUser.uid).update({
            updatedProfile,
            editRequest: true
        });
    }

    renderBlock = () => {
        const { currentUser } = this.props.store;
        switch (currentUser.category) {
            case 'student': {
                const {
                    fatherName, firstName, lastName, cnic,
                    subject, education, gpa, dob
                } = this.state;
                const { editRequest } = this.props.store.currentUser;
                return (
                    <div>
                        <TextField
                            label="Father's Name"
                            type='text'
                            name='fatherName'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.fatherName : fatherName}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="First Name"
                            type='text'
                            name='firstName'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.firstName : firstName}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Last Name"
                            type='text'
                            name='lastName'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.lastName : lastName}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="CNIC"
                            type='text'
                            name='cnic'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.cnic : cnic}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Subject"
                            type='text'
                            name='subject'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.subject : subject}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Education"
                            type='text'
                            name='education'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.education : education}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Grade Point Average (GPA)"
                            type='text'
                            name='gpa'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.gpa : gpa}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Date of Birth"
                            InputLabelProps={{ shrink: true }}
                            type='date'
                            name='dob'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.dob : dob}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            style={{ marginBottom: 13 }}
                            margin="dense"
                            variant='filled'
                        />
                        <Button
                            onClick={this.onRequestSubmit}
                            disabled={this.isEditState()}
                            color='primary'
                            variant='contained'
                            children='Update Request'
                        />
                    </div>
                );
            }
            case 'company': {
                const {
                    name, proprietor, cnic, ntn, businessType, turnover
                } = this.state;
                const { editRequest } = this.props.store.currentUser;
                return (
                    <div>
                        <TextField
                            label="Name"
                            type='text'
                            name='name'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.name : name}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Proprietor"
                            type='text'
                            name='proprietor'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.proprietor : proprietor}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="CNIC"
                            type='text'
                            name='cnic'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.cnic : cnic}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="National Tax Number (NTN)"
                            type='text'
                            name='ntn'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.ntn : ntn}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Business Type"
                            type='text'
                            name='businessType'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.businessType : businessType}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <TextField
                            label="Turnover"
                            type='text'
                            name='turnover'
                            value={editRequest ? this.props.store.currentUser.updatedProfile.turnover : turnover}
                            disabled={editRequest}
                            onChange={this.handleChange}
                            fullWidth={true}
                            margin="dense"
                            variant='filled'
                        />
                        <Button
                            onClick={this.onRequestSubmit}
                            disabled={this.isEditState()}
                            color='primary'
                            variant='contained'
                            children='Update Request'
                        />
                    </div>
                );
            }
            default: {
                break;
            }
        }
    }

    render() {
        const { currentUser } = this.props.store;
        if (currentUser.category === 'admin') return (
            <Paper className='dashboard-paper-width'>
                <Typography
                    style={{paddingTop: 15}}
                    align='center'
                    paragraph={true}
                    color='secondary'
                    children="An Admin doesn't need to edit his profile"
                />
            </Paper>
        );
        return (
            <div>
                <Paper className='dashboard-paper-width'>
                    {this.renderBlock()}
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(OwnProfile);