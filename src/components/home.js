import React, { Component } from 'react';
import {
    AppBar, Typography
} from '@material-ui/core';
import HeaderText from './headertext';

class HomePage extends Component {
    render() {
        return (
            <div>
                <HeaderText />
                <AppBar
                    position='relative'
                >
                    <Typography
                        color='inherit'
                        align='center'
                        variant='h6'
                        children='Home Page Header'
                    />
                </AppBar>
            </div>
        );
    }
}

export default HomePage;