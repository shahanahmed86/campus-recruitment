import React, { Component } from 'react';
import {
    Button
} from '@material-ui/core';

class HeaderText extends Component {
    gotoHome = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className='header-tag'>
                <Button
                    onClick={this.gotoHome}
                    color='secondary'
                    variant='text'
                    children='Campus Recruitment Application'
                />
            </div>
        );
    }
}

export default HeaderText;