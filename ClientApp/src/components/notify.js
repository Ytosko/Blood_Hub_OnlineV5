import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './style.css';
import $ from 'jquery';
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import moment from 'react-moment'
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import ReactLoading from 'react-loading'

const override = css`display: block; margin: 0 auto; border-color: #3D94F6;`;


var firebaseConfig = {
    apiKey: "AIzaSyBpc8cJ066i8CglvTg9vPifYu3UnD1r7tU",
    authDomain: "bldhub.firebaseapp.com",
    databaseURL: "https://bldhub.firebaseio.com",
    projectId: "bldhub",
    storageBucket: "bldhub.appspot.com",
    messagingSenderId: "1043034307477",
    appId: "1:1043034307477:web:24203d7d2e05d73cea949c",
    measurementId: "G-XWWDZCXBHV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export class notify extends Component {
    static displayName = notify.name;

    constructor(props) {
        super(props);
        const $ = window.$;
        this.state = {
            data: null
        };
        this.state = {
            loading: true
        };
        this.state = {
            isLoading: true
        };
        window.localStorage.setItem("Index", "4");
    } 
    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })

                : this.setState({ data: 'login' });
            this.setState({ loading: false });
            this.getStatus();
        });
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.doit()
                : this.nothing()
        });
    }
    doit() {
        var uid = this.state.data;
        firebase.database().ref("NOTIFY/" + uid).orderByKey().on("value", function (snapshot) {
            if (snapshot.exists()) {
                if (snapshot.hasChild("noti")) {
                    firebase.database().ref("NOTIFY/" + uid).update({
                        noti: "no"
                    }).then(success => {
                        console.log("Finished sending");
                    });
                } else {
                    firebase.database().ref("NOTIFY/" + uid).update({
                        noti: "no"
                    }).then(success => {
                        console.log("Finished sending");
                    });
                }
            }
        });
    }
    nothing() {

    }
    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 3000);
    }
    getStatus() {
        var uid = this.state.data;

        if (uid != "login") {

            firebase.database().ref("notification/" + uid).orderByKey().on("value", function (snapshot) {

                var elem = document.getElementById('parentDiv');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById('parentDiv').innerHTML = "";

                }
                var dot = snapshot.exists();
                if (dot) {
                    snapshot.forEach(function (childSnapshot) {



                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();

                        var id_val = childSnapshot.val().notification;
                        var time = childSnapshot.val().time;

                        var x1 = document.createElement("div");
                        var x = document.createElement("div");
                        var w = document.createElement("span");
                        w.setAttribute('class', 'userst');
                        w.appendChild(document.createTextNode(id_val));
                        x.appendChild(w);
                        var d = document.createElement("br");
                        x.appendChild(d);

                        var xop = document.createElement("span");
                        xop.setAttribute('class', 'usersty');
                        xop.appendChild(document.createTextNode(time));
                        x.appendChild(xop);
                        var d = document.createElement("br");
                        x.appendChild(d);
                        x1.appendChild(x);
                        var d = document.createElement("hr");
                        x1.appendChild(d);

                        document.getElementById('parentDiv').appendChild(x1);
                    });
                } else {
                    var w = document.createElement("span");
                    w.setAttribute('class', 'userst');
                    w.appendChild(document.createTextNode("No notification found"));
                    document.getElementById('parentDiv').appendChild(w);
                }
            });

        } else {
            window.location.href = "myacc";
        }
        return (
            <div id="parentDiv">

            </div>
        )

    }
    render() {
        return (
            <div class="sys">

                <div className="huix">
                    <ScaleLoader
                        css={override}
                        size={30}
                        color={"#3D94F6"}
                        loading={this.state.isLoading}
                    />
                </div>

                <div class="sysaqx" id="intro3">
                    <br></br>
                    <div id="status">
                        {this.getStatus()}
                    </div>
                </div>
            </div >
        );
    }
}