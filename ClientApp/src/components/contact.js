import React, { Component } from 'react';
import './contact.css';
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import InputMask from 'react-input-mask';
import $ from 'jquery';
import './Login.css';


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

export class contact extends Component {
    static displayName = contact.name;
    constructor(props) {
        super(props);
        const $ = window.$;
        this.state = {
            loading: false
        };
        window.localStorage.setItem("Index", "6");
    }
    runlogup() {
        var elem = document.getElementById('name');
        if (typeof (elem) != 'undefined' && elem != null) {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var message = document.getElementById("message").value;
        }
        this.setState({ loading: true });
        const params = {
            name: name,
            email: email,
            message: message
        };
        firebase.database().ref("report").push(params).then(success => {
            alert("Report submitted successfully");
            this.setState({ loading: false });
            var elem = document.getElementById('name');
            if (typeof (elem) != 'undefined' && elem != null) {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
            }
        });

    }

    render() {
        $("#prospects_form").submit(function (e) {
            e.preventDefault();
        });
        return (
            <div>
                <div className="huix">
                    <RingLoader
                        css={override}
                        size={50}
                        color={"#3D94F6"}
                        loading={this.state.loading}
                    />
                </div>
                <section id="contact">

                    <h1 class="section-header">CONTACT</h1>

                    <div class="contact-wrapper">



                        <form class="form-horizontal" id= "prospects_form">

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" id="name" placeholder="NAME" name="name"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="email" class="form-control" id="email" placeholder="EMAIL" name="email"/>
                                </div>
                            </div>

                            <textarea class="form-control" rows="10" placeholder="MESSAGE" id= "message" name="message"></textarea>

                            <button type = "button" class="btn btn-primary send-button" id="submit" type="submit" value="SEND">
                                <div class="buttonzse" onClick={() => this.runlogup()}>
                                    <i class="fa fa-paper-plane"></i><span class="send-text">Send</span>
                                </div>

                            </button>

                        </form>



                        <div class="direct-contact-container">

                            <ul class="contact-list">
                                <li class="list-item"><i class="fa fa-map-marker fa-2x"><span class="contact-text place">Sylhet | BD</span></i></li>

                                <li class="list-item"><i class="fa fa-phone fa-2x"><span class="contact-text phone"><a href="tel:8801715319802" title="Give me a call">880 1715 319802</a></span></i></li>

                                <li class="list-item"><i class="fa fa-envelope fa-2x"><span class="contact-text gmail"><a href="mailto:ytosko@hotmail.com" title="Send me an email">ytosko@hotmail.com</a></span></i></li>

                            </ul>
                            <br />
                            <br/>
                            <div class="copyright">&copy; ALL OF THE RIGHTS RESERVED to YTOSKO</div>

                        </div>

                    </div>

                </section>



            </div>
        );
    }
}
