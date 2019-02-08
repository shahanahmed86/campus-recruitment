import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';

class EnterThePage extends Component {
    gotoIndex = () => {
        this.props.history.push('/index/home');
    }
    render() {
        return (
            <div className='Enter-Home'>
                <Button
                    color='secondary'
                    variant='text'
                    children='Enter'
                    onClick={this.gotoIndex}
                />
                <Typography
                    color='inherit'
                    variant='h6'
                    children="To get access into the website click above"
                />
            </div>
        );
    }
}

export default EnterThePage;