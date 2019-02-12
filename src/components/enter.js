import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class EnterThePage extends Component {
    gotoIndex = () => {
        this.props.history.replace('/login');
    }
    render() {
        return (
            <div className='Enter-Home'>
                <Button
                    color='secondary'
                    variant='text'
                    children='Enter to Login page'
                    onClick={this.gotoIndex}
                />
            </div>
        );
    }
}

export default EnterThePage;