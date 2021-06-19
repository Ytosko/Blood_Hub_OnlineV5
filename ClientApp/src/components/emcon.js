import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import $ from 'jquery';
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import moment from 'react-moment'
import SyncLoader from "react-spinners/SyncLoader";
import ReactLoading from 'react-loading'
import { css } from "@emotion/core";
import InputMask from 'react-input-mask';
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
var x = 1;
export class emcon extends Component {
    static displayName = emcon.name;

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
        this.state = {
            hisname: null,
            myname: null
        };


    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });
            this.getnumbers();
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000);
    }
    runlog() {
        var uid = this.state.data;
        console.log(uid);
        if (this.state.data != "login") {
            var params = "";
            var a = 1;
            var ajay;
            while (a != x) {
                var num1 = document.getElementById("mo" + a).value;
                console.log("con" + a + ": " + num1);
                var numr1 = num1.split("").reverse().join("");
                var numx1 = numr1.replace(/[^\w\s]/gi, '');
                var numx11 = numx1.replace(/\s/gi, "");
                var numy1 = numx11.substr(0, 10);
                console.log(numr1);
                var finalnum1 = numy1.split("").reverse().join("");
                var final1 = "+880 " + finalnum1.substr(0, 4) + " - " + finalnum1.substr(4, 10);
                if (a == x - 1) {
                    this.setState({ loading: true });
                    firebase.database().ref('/Contact/' + uid).update({
                        ['con' + a]: final1
                    }).then(success => {
                        console.log("Finished sending");
                        window.location.reload();
                    });
                } else {
                    this.setState({ loading: true });
                    firebase.database().ref('/Contact/' + uid).update({
                        ['con' + a]: final1
                    }).then(success => {
                        console.log("Finished sending");
                        window.location.reload();
                    });
                }
                a++;

            }
            console.log(ajay);
            

        }

    }
    getnumbers() {
        var uid = this.state.data;
        console.log(uid);
        if (this.state.data != "login") {
            firebase.database().ref('/Contact/' + uid).once('value').then(function (snapshot) {
                var check = snapshot.exists();
                if (check) {
                    snapshot.forEach(function (childSnapshot) {
                        var num1 = childSnapshot.val();
                        var numr1 = num1.split("").reverse().join("");
                        var numx1 = numr1.replace(/[^\w\s]/gi, '');
                        var numx11 = numx1.replace(/\s/gi, "");
                        var numy1 = numx11.substr(0, 10);
                        console.log(numr1);
                        var finalnum1 = numy1.split("").reverse().join("");

                        var xnum1 = finalnum1.substr(0, 4);
                        var ynum1 = finalnum1.substr(4, 10);
                        console.log(finalnum1);
                        var so_num = "+880 " + xnum1 + " - " + ynum1;
                        console.log("rated num : " + x + " : " + so_num);

                        var d = document.createElement("input");
                        d.name = "number";
                        d.id = "mo" + x;
                        d.placeholder = "Contact " + x;
                        d.setAttribute('class', 'login-form-fieldo');
                        d.value = so_num;
                        d.disabled = true;
                        var elem = document.getElementById('login-form');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            elem.appendChild(d);
                            document.getElementById("login-form-submit-edit").style.display = "block";
                        }
                        x++;
                    });
                } else {
                    var elem = document.getElementById('login-header');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        alert("Please set emergency contact first");
                        document.getElementById("login-form-submit-edix2").style.display = "block";
                    }
                }

            });
        }
    }
    addinp() {
        if (x < 11) {
            var d = document.createElement("input");
            d.name = "number";
            d.id = "mo" + x;
            d.placeholder = "Contact " + x;
            d.setAttribute('class', 'login-form-fieldo');
            d.disabled = false;
            var elem = document.getElementById('login-form');
            if (typeof (elem) != 'undefined' && elem != null) {
                elem.appendChild(d);
                x++;
            }
        } else {
            alert("You can not add more than 10 numbers as your emergency contact");
        }
    }
    enable() {
        var elem = document.getElementById('login-header');
        if (typeof (elem) != 'undefined' && elem != null) {
            document.getElementById("login-form-submit-edit").style.display = "none";
            document.getElementById("login-form-submit-edix").style.display = "block";
            $("input[id^='mo']").prop("disabled", false);
            $("#addm").css('display', 'grid');
        }
    }
    connection() {
        document.getElementById("login-form-submit-edix2").style.display = "none";
        document.getElementById("login-form-submit-edix").style.display = "block";
        $("#addm").css('display', 'grid');
    }
    render() {
        if (this.state.data === "login") {
            window.location.href = "myacc";
        }
        return (
            <div class="hui">

                <div class="jio">
                    <div class="huix">
                        <SyncLoader
                            css={override}
                            size={30}
                            color={"#3D94F6"}
                            loading={this.state.loading}
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <main id="main-holder">
                        <h1 id="login-header">Emergency Contacts</h1>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div id="login-form">

                        </div>
                        <div onClick={() => this.addinp()} id="addm" ><span class="fa fa-plus"> Add more </span></div>
                        <button type="reset" id="login-form-submit-edit" onClick={() => this.enable()}>Edit</button>
                        <button type="reset" id="login-form-submit-edix" onClick={() => this.runlog()}>Update info</button>
                        <button type="reset" id="login-form-submit-edix2" onClick={() => this.connection()}>Add Emergency contacts</button>
                    </main>
                </div>
            </div>
        );
    }
}