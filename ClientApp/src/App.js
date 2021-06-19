import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { about } from './components/about';
import { contact } from './components/contact';
import { Info } from './components/Info';
import { myacc } from './components/myacc';
import { reg } from './components/reg';
import { search } from './components/search';
import { dprof } from './components/dprof';
import { Chat } from './components/Chat';
import { emcon } from './components/emcon';
import { dpost } from './components/dpost';
import { notify } from './components/notify';
import { updt } from './components/updt';
import { activity } from './components/activity';
import * as firebase from 'firebase';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/about' component={about} />
                <Route path='/contact' component={contact} />
                <Route path='/Info' component={Info} />
                <Route path='/myacc' component={myacc} />
                <Route path='/reg' component={reg} />
                <Route path='/search' component={search} />
                <Route path='/dprof' component={dprof} />
                <Route path='/Chat' component={Chat} />
                <Route path='/emcon' component={emcon} />
                <Route path='/dpost' component={dpost} />
                <Route path='/notify' component={notify} />
                <Route path='/updt' component={updt} />
                <Route path='/activity' component={activity} />
            </Layout>
        );
    }
}
