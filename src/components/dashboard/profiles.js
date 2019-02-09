import React, { Component } from 'react';
import {
    Paper, Typography
} from '@material-ui/core'
import { connect } from "react-redux";


import '../../App.css';

function mapStateToProps(store) {
    return { store }
}

class Profiles extends Component {

    renderBlock = () => {
        const { profiles, currentUser } = this.props.store;
        switch (currentUser.category) {
            case 'student': {
                break;
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
            }
        }
    }

    render() {
        return (
            <div>
                <Paper className='dashboard-profiles'>
                    {this.renderBlock()}
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Profiles);