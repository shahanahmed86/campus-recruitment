import React, { Component } from 'react';
import {
    AppBar, Button
} from '@material-ui/core';
import { Route } from 'react-router-dom';

import HeaderText from './headertext';
import IndexPage from "./home/home";
import About from "./home/about";
import Contact from "./home/contact";

const routes = [
    {
        path: '/index/home',
        exact: true,
        main: props => <IndexPage {...props} />
    },
    {
        path: '/index/about',
        exact: true,
        main: props => <About {...props} />
    },
    {
        path: '/index/contact',
        exact: true,
        main: props => <Contact {...props} />
    }
]

class HomePage extends Component {

    gotoLogin = () => {
        this.props.history.push('/login');
    }

    navigateHome = params => {
        this.props.history.push(`/index/${params}`);
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
                            onClick={() => this.navigateHome('home')}
                        />
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='Contact'
                            onClick={() => this.navigateHome('contact')}
                        />
                        <Button
                            color='inherit'
                            align='center'
                            variant='text'
                            children='About Us'
                            onClick={() => this.navigateHome('about')}
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
                <div>
                    {routes.map((val, ind) => {
                        return (
                            <Route
                                key={ind}
                                path={val.path}
                                exact={val.exact}
                                component={() => val.main(this.props)}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default HomePage;