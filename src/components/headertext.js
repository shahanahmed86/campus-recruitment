import React from 'react';
import {
    Typography
} from '@material-ui/core';

function HeaderText() {
    return (
        <div className='header-tag'>
            <Typography
                align='center'
                color='secondary'
                variant='h5'
                children='Campus Recruitment Application'
            />
        </div>
    );
}

export default HeaderText;