import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle
} from '@material-ui/core';

import '../../App.css'

function mapStateToProps(store) {
    return { store }
}

class ProfileDetail extends React.Component {

    renderBlock = () => {
        const { category, details } = this.props;
        const { currentUser } = this.props.store;
        switch (category) {
            case 'student': {
                if (details.editRequest && currentUser.category === 'admin') return (
                    <table className='table table-striped'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>Fields</th>
                                <th scope='col'>Previous</th>
                                <th scope='col'>New</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.fatherName === details.updatedProfile.fatherName ? 'nothing' : 'highlight'}
                                >
                                    Father Name
                                </th>
                                <td
                                    className={details.fatherName === details.updatedProfile.fatherName ? 'nothing' : 'highlight'}
                                >
                                    {details.fatherName}
                                </td>
                                <td
                                    className={details.fatherName === details.updatedProfile.fatherName ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.fatherName}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.firstName === details.updatedProfile.firstName ? 'nothing' : 'highlight'}
                                >
                                    First Name
                                </th>
                                <td
                                    className={details.firstName === details.updatedProfile.firstName ? 'nothing' : 'highlight'}
                                >
                                    {details.firstName}
                                </td>
                                <td
                                    className={details.firstName === details.updatedProfile.firstName ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.firstName}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.lastName === details.updatedProfile.lastName ? 'nothing' : 'highlight'}
                                >
                                    Last Name
                                </th>
                                <td
                                    className={details.lastName === details.updatedProfile.lastName ? 'nothing' : 'highlight'}
                                >
                                    {details.lastName}
                                </td>
                                <td
                                    className={details.lastName === details.updatedProfile.lastName ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.lastName}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    CNIC
                                </th>
                                <td
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    {details.cnic}
                                </td>
                                <td
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.cnic}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.subject === details.updatedProfile.subject ? 'nothing' : 'highlight'}
                                >
                                    Subject
                                </th>
                                <td
                                    className={details.subject === details.updatedProfile.subject ? 'nothing' : 'highlight'}
                                >
                                    {details.subject}
                                </td>
                                <td
                                    className={details.subject === details.updatedProfile.subject ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.subject}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.education === details.updatedProfile.education ? 'nothing' : 'highlight'}
                                >
                                    Education
                                </th>
                                <td
                                    className={details.education === details.updatedProfile.education ? 'nothing' : 'highlight'}
                                >
                                    {details.education}
                                </td>
                                <td
                                    className={details.education === details.updatedProfile.education ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.education}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.gpa === details.updatedProfile.gpa ? 'nothing' : 'highlight'}
                                >
                                    GPA
                                </th>
                                <td
                                    className={details.gpa === details.updatedProfile.gpa ? 'nothing' : 'highlight'}
                                >
                                    {details.gpa}
                                </td>
                                <td
                                    className={details.gpa === details.updatedProfile.gpa ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.gpa}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.dob === details.updatedProfile.dob ? 'nothing' : 'highlight'}
                                >
                                    Date of Birth
                                </th>
                                <td
                                    className={details.dob === details.updatedProfile.dob ? 'nothing' : 'highlight'}
                                >
                                    {details.dob}
                                </td>
                                <td
                                    className={details.dob === details.updatedProfile.dob ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.dob}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
                return (
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th scope='row'>Father Name</th>
                                <td>{details.fatherName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>First Name</th>
                                <td>{details.firstName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Last Name</th>
                                <td>{details.lastName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>CNIC</th>
                                <td>{details.cnic}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Subject</th>
                                <td>{details.subject}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Education</th>
                                <td>{details.education}</td>
                            </tr>
                            <tr>
                                <th scope='row'>GPA</th>
                                <td>{details.gpa}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Date of Birth</th>
                                <td>{details.dob}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
            case 'company': {
                if (details.editRequest && currentUser.category === 'admin') return (
                    <table className='table table-striped'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>Fields</th>
                                <th scope='col'>Previous</th>
                                <th scope='col'>New</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th
                                    className={details.name === details.updatedProfile.name ? 'nothing' : 'highlight'}
                                    scope='row'
                                >
                                    Name
                                </th>
                                <td
                                    className={details.name === details.updatedProfile.name ? 'nothing' : 'highlight'}
                                >
                                    {details.name}
                                </td>
                                <td
                                    className={details.name === details.updatedProfile.name ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.name}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.proprietor === details.updatedProfile.proprietor ? 'nothing' : 'highlight'}
                                >
                                    Proprietor
                                </th>
                                <td
                                    className={details.proprietor === details.updatedProfile.proprietor ? 'nothing' : 'highlight'}
                                >
                                    {details.proprietor}
                                </td>
                                <td
                                    className={details.proprietor === details.updatedProfile.proprietor ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.proprietor}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    CNIC
                                </th>
                                <td
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    {details.cnic}
                                </td>
                                <td
                                    className={details.cnic === details.updatedProfile.cnic ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.cnic}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.ntn === details.updatedProfile.ntn ? 'nothing' : 'highlight'}
                                >
                                    NTN
                                </th>
                                <td
                                    className={details.ntn === details.updatedProfile.ntn ? 'nothing' : 'highlight'}
                                >
                                    {details.ntn}
                                </td>
                                <td
                                    className={details.ntn === details.updatedProfile.ntn ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.ntn}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.businessType === details.updatedProfile.businessType ? 'nothing' : 'highlight'}
                                >
                                    Type
                                </th>
                                <td
                                    className={details.businessType === details.updatedProfile.businessType ? 'nothing' : 'highlight'}
                                >
                                    {details.businessType}
                                </td>
                                <td
                                    className={details.businessType === details.updatedProfile.businessType ? 'nothing' : 'highlight'}
                                >
                                    {details.updatedProfile.businessType}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope='row'
                                    className={details.turnover === details.updatedProfile.turnover ? 'nothing' : 'highlight'}
                                >
                                    Turnover
                                </th>
                                <td
                                    className={details.turnover === details.updatedProfile.turnover ? 'nothing' : 'highlight'}
                                >
                                    {Number(details.turnover).toLocaleString()}
                                </td>
                                <td
                                    className={details.turnover === details.updatedProfile.turnover ? 'nothing' : 'highlight'}
                                >
                                    {Number(details.updatedProfile.turnover).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
                return (
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th scope='row'>Name</th>
                                <td>{details.name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>NTN</th>
                                <td>{details.ntn}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Proprietor Name</th>
                                <td>{details.proprietor}</td>
                            </tr>
                            <tr>
                                <th scope='row'>CNIC</th>
                                <td>{details.cnic}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Business Type</th>
                                <td>{details.businessType}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Turnover</th>
                                <td>{Number(details.turnover).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
            default: {
                break;
            }
        }
    }

    render() {
        const { open, close, category } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={close}
                    aria-labelledby="Profile Details"
                >
                    <DialogTitle id="Profile Details">{`Profile of ${category}`}</DialogTitle>
                    <DialogContent>{this.renderBlock()}</DialogContent>
                    <DialogActions>
                        {(this.props.store.currentUser.category === 'admin' && this.props.details.editRequest) && (
                            <div>
                                <Button
                                    autoFocus
                                    onClick={() => this.props.request(this.props.details.uid, true)}
                                    children='Accept'
                                    variant='text'
                                    color='primary'
                                />
                                <Button
                                    onClick={() => this.props.request(this.props.details.uid, false)}
                                    children='Deny'
                                    variant='text'
                                    color='secondary'
                                />
                            </div>
                        )}
                        <Button onClick={close} color='inherit'>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(ProfileDetail);