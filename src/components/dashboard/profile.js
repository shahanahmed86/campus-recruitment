import React, { Component } from 'react';
import {
    Typography,
    TextField, Button, Paper
} from '@material-ui/core';
import { connect } from "react-redux";

// import actions from '../store/actions';

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
            dob: props.store.currentUser.dob
        }
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    }

    renderBlock = () => {
        const { category } = this.props.store.currentUser;
        switch (category) {
            case 'student': {
                const {
                    fatherName, firstName, lastName, cnic,
                    subject, education, gpa, dob
                } = this.state;
                return (
                    <div>
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
                        <Button
                            onClick={this.onRequestSubmit}
                            color='primary'
                            variant='contained'
                            children='Update Request'
                        />
                    </div>
                );
            }
            // case 'company': {
            //     return ();
            // }
            default: {
                break;
            }
        }
    }

    render() {
        const { currentUser } = this.props.store;
        if (currentUser.category === 'admin') return (
            <div className='center-box'>
                <Typography
                    align='center'
                    variant='h5'
                    color='secondary'
                    children="An Admin doesn't need to edit his profile"
                />
            </div>
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