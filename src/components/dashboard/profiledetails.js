import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle
} from '@material-ui/core';

import '../../App.css'

function mapStateToProps(store) {
    return {store}
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
                                <th scope='row'>Father Name</th>
                                <td>{details.fatherName}</td>
                                <td>{details.updatedProfile.fatherName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>First Name</th>
                                <td>{details.firstName}</td>
                                <td>{details.updatedProfile.firstName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Last Name</th>
                                <td>{details.lastName}</td>
                                <td>{details.updatedProfile.lastName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>CNIC</th>
                                <td>{details.cnic}</td>
                                <td>{details.updatedProfile.cnic}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Subject</th>
                                <td>{details.subject}</td>
                                <td>{details.updatedProfile.subject}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Education</th>
                                <td>{details.education}</td>
                                <td>{details.updatedProfile.education}</td>
                            </tr>
                            <tr>
                                <th scope='row'>GPA</th>
                                <td>{details.gpa}</td>
                                <td>{details.updatedProfile.gpa}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Date of Birth</th>
                                <td>{details.dob}</td>
                                <td>{details.updatedProfile.dob}</td>
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
                                <th scope='row'>Name</th>
                                <td>{details.name}</td>
                                <td>{details.updatedProfile.name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Proprietor</th>
                                <td>{details.proprietor}</td>
                                <td>{details.updatedProfile.proprietor}</td>
                            </tr>
                            <tr>
                                <th scope='row'>CNIC</th>
                                <td>{details.cnic}</td>
                                <td>{details.updatedProfile.cnic}</td>
                            </tr>
                            <tr>
                                <th scope='row'>NTN</th>
                                <td>{details.ntn}</td>
                                <td>{details.updatedProfile.ntn}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Type</th>
                                <td>{details.businessType}</td>
                                <td>{details.updatedProfile.businessType}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Turnover</th>
                                <td>{details.turnover}</td>
                                <td>{details.updatedProfile.turnover}</td>
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
                                <td>{details.turnover}</td>
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