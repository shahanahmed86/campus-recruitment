import React, { Component } from 'react';
import {
    AppBar, Button
} from '@material-ui/core';

import HeaderText from './headertext';

class HomePage extends Component {

    gotoLogin = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <HeaderText {...this.props} />
                <AppBar
                    position='relative'
                >
                    <div className='home-appbar'>
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='Home'
                        />
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='Contact'
                        />
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='About Us'
                        />
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='Log In'
                            onClick={this.gotoLogin}
                        >
                        </Button>
                    </div>
                </AppBar>
            </div>
        );
    }
}

export default HomePage;