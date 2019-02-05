import React, { Component } from 'react';
import {
    Typography
} from '@material-ui/core';

class HomePage extends Component {
    render() {
        return (
            <div className='home-page'>
                <Typography
                    gutterBottom={true}
                    align='center'
                    color='secondary'
                    variant='h5'
                    children='Campus Recruitment Application'
                />
            </div>
        );
    }
}

export default HomePage;