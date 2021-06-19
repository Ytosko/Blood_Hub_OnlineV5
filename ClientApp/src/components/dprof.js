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

export class dprof extends Component {
    static displayName = dprof.name;

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
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });
            this.setState({ loading: false });

        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 5000);
    }
    CheckNav() {
        var elem = document.getElementById('mySidenavtt');
        if (typeof (elem) != 'undefined' && elem != null) {
            if (document.getElementById("mySidenavtt").style.width == "250px") {

                document.getElementById("mySidenavtt").style.width = "0";

            } else {
                document.getElementById("mySidenavtt").style.width = "250px";
            }
        }
    }
    openNav() {
        document.getElementById("mySidenavtt").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenavtt").style.width = "0";
    }
    gotoChat() {
        this.setState({ loading: true });
        if (this.state.data != "login") {
            var uid = window.localStorage.getItem("uid");
            console.log(uid);
            window.localStorage.setItem("chatwith", uid);
            window.location.href = "/Chat";
        }
        else {
            window.location.href = "/myacc";
        }
    }
    render() {
        var name, email, blood, location, age, phone, type;
        var uid = window.localStorage.getItem("uid");
        console.log(uid);
        firebase.database().ref("dp/" + uid).orderByKey().once("value").then(function (snapshot) {
            var imgy = document.getElementById("prof");
            if (typeof (imgy) != 'undefined' && imgy != null) {
                if (snapshot.exists()) {
                    var url = snapshot.val().url;
                    imgy.src = url;
                } else {
                    firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                        var url = snapshot.val().url;
                        imgy.src = url;
                    });
                }
            }
        });
        firebase.database().
            ref("/Donor/A+/" + uid)
            .once('value', function (snapshot) {
                if (snapshot.exists()) {
                    name = snapshot.val().name;
                    email = snapshot.val().email;
                    blood = snapshot.val().blood;
                    location = snapshot.val().location;
                    phone = snapshot.val().phone;
                    age = snapshot.val().age;
                    type = snapshot.val().type;
                    firebase.database().
                        ref("DOB/" + uid)
                        .once('value', function (snapshot) {
                            if (snapshot.exists()) {
                                console.log("exists : " + snapshot.val().DOB);
                                var age2 = snapshot.val().DOB;
                                var today = new Date();
                                var birthDate = new Date(age2);
                                age = today.getFullYear() - birthDate.getFullYear();
                                console.log("exists 2: " + age);
                                var elem = document.getElementById('agee2');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById("agee2").innerHTML = age;
                                }
                            }
                        });
                    window.localStorage.setItem("chatname", name);
                    console.log(name + email + location);
                    var elem = document.getElementById('name');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById("name").innerHTML = name;
                    }
                    var elem = document.getElementById('bloodg');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById("bloodg").innerHTML = blood;
                    }
                    var elem = document.getElementById('loce');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById("loce").innerHTML = location;
                        document.getElementById("emaile").innerHTML = email;
                        if (type === "Public") {
                            document.getElementById("phonee").innerHTML = phone;
                        } else {
                            document.getElementById("phonee").innerHTML = "Private number";
                        }
                        document.getElementById("agee2").innerHTML = age;
                        document.getElementById("sta").innerHTML = "Donor / Genaral member";
                    }

                } else {
                    firebase.database().
                        ref("/Donor/A-/" + uid)
                        .once('value', function (snapshot) {
                            if (snapshot.exists()) {
                                name = snapshot.val().name;
                                email = snapshot.val().email;
                                blood = snapshot.val().blood;
                                location = snapshot.val().location;
                                phone = snapshot.val().phone;
                                age = snapshot.val().age;
                                type = snapshot.val().type;
                                firebase.database().
                                    ref("DOB/" + uid)
                                    .once('value', function (snapshot) {
                                        if (snapshot.exists()) {
                                            console.log("exists : " + snapshot.val().DOB);
                                            var age2 = snapshot.val().DOB;
                                            var today = new Date();
                                            var birthDate = new Date(age2);
                                            age = today.getFullYear() - birthDate.getFullYear();
                                            console.log("exists 2: " + age);
                                            var elem = document.getElementById('agee2');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById("agee2").innerHTML = age;
                                            }
                                        }
                                    });
                                window.localStorage.setItem("chatname", name);
                                console.log(name + email + location);
                                var elem = document.getElementById('name');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById("name").innerHTML = name;
                                }
                                var elem = document.getElementById('bloodg');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById("bloodg").innerHTML = blood;
                                }
                                var elem = document.getElementById('loce');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById("loce").innerHTML = location;
                                    document.getElementById("emaile").innerHTML = email;
                                    if (type === "Public") {
                                        document.getElementById("phonee").innerHTML = phone;
                                    } else {
                                        document.getElementById("phonee").innerHTML = "Private number";
                                    }
                                    document.getElementById("agee2").innerHTML = age;
                                    document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                }



                            } else {
                                firebase.database().
                                    ref("/Donor/B+/" + uid)
                                    .once('value', function (snapshot) {
                                        if (snapshot.exists()) {
                                            name = snapshot.val().name;
                                            email = snapshot.val().email;
                                            blood = snapshot.val().blood;
                                            location = snapshot.val().location;
                                            phone = snapshot.val().phone;
                                            age = snapshot.val().age;
                                            type = snapshot.val().type;
                                            firebase.database().
                                                ref("DOB/" + uid)
                                                .once('value', function (snapshot) {
                                                    if (snapshot.exists()) {
                                                        console.log("exists : " + snapshot.val().DOB);
                                                        var age2 = snapshot.val().DOB;
                                                        var today = new Date();
                                                        var birthDate = new Date(age2);
                                                        age = today.getFullYear() - birthDate.getFullYear();
                                                        console.log("exists 2: " + age);
                                                        var elem = document.getElementById('agee2');
                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                            document.getElementById("agee2").innerHTML = age;
                                                        }
                                                    }
                                                });
                                            window.localStorage.setItem("chatname", name);
                                            console.log(name + email + location);
                                            var elem = document.getElementById('name');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById("name").innerHTML = name;
                                            }
                                            var elem = document.getElementById('bloodg');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById("bloodg").innerHTML = blood;
                                            }
                                            var elem = document.getElementById('loce');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById("loce").innerHTML = location;
                                                document.getElementById("emaile").innerHTML = email;
                                                if (type === "Public") {
                                                    document.getElementById("phonee").innerHTML = phone;
                                                } else {
                                                    document.getElementById("phonee").innerHTML = "Private number";
                                                }
                                                document.getElementById("agee2").innerHTML = age;
                                                document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                            }


                                        } else {
                                            firebase.database().
                                                ref("/Donor/B-/" + uid)
                                                .once('value', function (snapshot) {
                                                    if (snapshot.exists()) {
                                                        name = snapshot.val().name;
                                                        email = snapshot.val().email;
                                                        blood = snapshot.val().blood;
                                                        location = snapshot.val().location;
                                                        phone = snapshot.val().phone;
                                                        age = snapshot.val().age;
                                                        type = snapshot.val().type;
                                                        firebase.database().
                                                            ref("DOB/" + uid)
                                                            .once('value', function (snapshot) {
                                                                if (snapshot.exists()) {
                                                                    console.log("exists : " + snapshot.val().DOB);
                                                                    var age2 = snapshot.val().DOB;
                                                                    var today = new Date();
                                                                    var birthDate = new Date(age2);
                                                                    age = today.getFullYear() - birthDate.getFullYear();
                                                                    console.log("exists 2: " + age);
                                                                    var elem = document.getElementById('agee2');
                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                        document.getElementById("agee2").innerHTML = age;
                                                                    }
                                                                }
                                                            });
                                                        window.localStorage.setItem("chatname", name);
                                                        console.log(name + email + location);
                                                        var elem = document.getElementById('name');
                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                            document.getElementById("name").innerHTML = name;
                                                        }
                                                        var elem = document.getElementById('bloodg');
                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                            document.getElementById("bloodg").innerHTML = blood;
                                                        }
                                                        var elem = document.getElementById('loce');
                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                            document.getElementById("loce").innerHTML = location;
                                                            document.getElementById("emaile").innerHTML = email;
                                                            if (type === "Public") {
                                                                document.getElementById("phonee").innerHTML = phone;
                                                            } else {
                                                                document.getElementById("phonee").innerHTML = "Private number";
                                                            }
                                                            document.getElementById("agee2").innerHTML = age;
                                                            document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                                        }


                                                    } else {
                                                        firebase.database().
                                                            ref("/Donor/O+/" + uid)
                                                            .once('value', function (snapshot) {
                                                                if (snapshot.exists()) {
                                                                    name = snapshot.val().name;
                                                                    email = snapshot.val().email;
                                                                    blood = snapshot.val().blood;
                                                                    location = snapshot.val().location;
                                                                    phone = snapshot.val().phone;
                                                                    age = snapshot.val().age;
                                                                    type = snapshot.val().type;
                                                                    firebase.database().
                                                                        ref("DOB/" + uid)
                                                                        .once('value', function (snapshot) {
                                                                            if (snapshot.exists()) {
                                                                                console.log("exists : " + snapshot.val().DOB);
                                                                                var age2 = snapshot.val().DOB;
                                                                                var today = new Date();
                                                                                var birthDate = new Date(age2);
                                                                                age = today.getFullYear() - birthDate.getFullYear();
                                                                                console.log("exists 2: " + age);
                                                                                var elem = document.getElementById('agee2');
                                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                                    document.getElementById("agee2").innerHTML = age;
                                                                                }
                                                                            }
                                                                        });
                                                                    window.localStorage.setItem("chatname", name);
                                                                    console.log(name + email + location);
                                                                    var elem = document.getElementById('name');
                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                        document.getElementById("name").innerHTML = name;
                                                                    }
                                                                    var elem = document.getElementById('bloodg');
                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                        document.getElementById("bloodg").innerHTML = blood;
                                                                    }
                                                                    var elem = document.getElementById('loce');
                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                        document.getElementById("loce").innerHTML = location;
                                                                        document.getElementById("emaile").innerHTML = email;
                                                                        if (type === "Public") {
                                                                            document.getElementById("phonee").innerHTML = phone;
                                                                        } else {
                                                                            document.getElementById("phonee").innerHTML = "Private number";
                                                                        }
                                                                        document.getElementById("agee2").innerHTML = age;
                                                                        document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                                                    }


                                                                } else {
                                                                    firebase.database().
                                                                        ref("/Donor/O-/" + uid)
                                                                        .once('value', function (snapshot) {
                                                                            if (snapshot.exists()) {
                                                                                name = snapshot.val().name;
                                                                                email = snapshot.val().email;
                                                                                blood = snapshot.val().blood;
                                                                                location = snapshot.val().location;
                                                                                phone = snapshot.val().phone;
                                                                                age = snapshot.val().age;
                                                                                type = snapshot.val().type;
                                                                                firebase.database().
                                                                                    ref("DOB/" + uid)
                                                                                    .once('value', function (snapshot) {
                                                                                        if (snapshot.exists()) {
                                                                                            console.log("exists : " + snapshot.val().DOB);
                                                                                            var age2 = snapshot.val().DOB;
                                                                                            var today = new Date();
                                                                                            var birthDate = new Date(age2);
                                                                                            age = today.getFullYear() - birthDate.getFullYear();
                                                                                            console.log("exists 2: " + age);
                                                                                            var elem = document.getElementById('agee2');
                                                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                document.getElementById("agee2").innerHTML = age;
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                window.localStorage.setItem("chatname", name);
                                                                                console.log(name + email + location);
                                                                                var elem = document.getElementById('name');
                                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                                    document.getElementById("name").innerHTML = name;
                                                                                }
                                                                                var elem = document.getElementById('bloodg');
                                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                                    document.getElementById("bloodg").innerHTML = blood;
                                                                                }
                                                                                var elem = document.getElementById('loce');
                                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                                    document.getElementById("loce").innerHTML = location;
                                                                                    document.getElementById("emaile").innerHTML = email;
                                                                                    if (type === "Public") {
                                                                                        document.getElementById("phonee").innerHTML = phone;
                                                                                    } else {
                                                                                        document.getElementById("phonee").innerHTML = "Private number";
                                                                                    }
                                                                                    document.getElementById("agee2").innerHTML = age;
                                                                                    document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                                                                }


                                                                            } else {
                                                                                firebase.database().
                                                                                    ref("/Donor/AB+/" + uid)
                                                                                    .once('value', function (snapshot) {
                                                                                        if (snapshot.exists()) {
                                                                                            name = snapshot.val().name;
                                                                                            email = snapshot.val().email;
                                                                                            blood = snapshot.val().blood;
                                                                                            location = snapshot.val().location;
                                                                                            phone = snapshot.val().phone;
                                                                                            age = snapshot.val().age;
                                                                                            type = snapshot.val().type;
                                                                                            firebase.database().
                                                                                                ref("DOB/" + uid)
                                                                                                .once('value', function (snapshot) {
                                                                                                    if (snapshot.exists()) {
                                                                                                        console.log("exists : " + snapshot.val().DOB);
                                                                                                        var age2 = snapshot.val().DOB;
                                                                                                        var today = new Date();
                                                                                                        var birthDate = new Date(age2);
                                                                                                        age = today.getFullYear() - birthDate.getFullYear();
                                                                                                        console.log("exists 2: " + age);
                                                                                                        var elem = document.getElementById('agee2');
                                                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                            document.getElementById("agee2").innerHTML = age;
                                                                                                        }
                                                                                                    }
                                                                                                });
                                                                                            window.localStorage.setItem("chatname", name);
                                                                                            console.log(name + email + location);
                                                                                            var elem = document.getElementById('name');
                                                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                document.getElementById("name").innerHTML = name;
                                                                                            }
                                                                                            var elem = document.getElementById('bloodg');
                                                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                document.getElementById("bloodg").innerHTML = blood;
                                                                                            }
                                                                                            var elem = document.getElementById('loce');
                                                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                document.getElementById("loce").innerHTML = location;
                                                                                                document.getElementById("emaile").innerHTML = email;
                                                                                                if (type === "Public") {
                                                                                                    document.getElementById("phonee").innerHTML = phone;
                                                                                                } else {
                                                                                                    document.getElementById("phonee").innerHTML = "Private number";
                                                                                                }
                                                                                                document.getElementById("agee2").innerHTML = age;
                                                                                                document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                                                                            }


                                                                                        } else {
                                                                                            firebase.database().
                                                                                                ref("/Donor/AB-/" + uid)
                                                                                                .once('value', function (snapshot) {
                                                                                                    if (snapshot.exists()) {
                                                                                                        name = snapshot.val().name;
                                                                                                        email = snapshot.val().email;
                                                                                                        blood = snapshot.val().blood;
                                                                                                        location = snapshot.val().location;
                                                                                                        phone = snapshot.val().phone;
                                                                                                        age = snapshot.val().age;
                                                                                                        type = snapshot.val().type;
                                                                                                        firebase.database().
                                                                                                            ref("DOB/" + uid)
                                                                                                            .once('value', function (snapshot) {
                                                                                                                if (snapshot.exists()) {
                                                                                                                    console.log("exists : " + snapshot.val().DOB);
                                                                                                                    var age2 = snapshot.val().DOB;
                                                                                                                    var today = new Date();
                                                                                                                    var birthDate = new Date(age2);
                                                                                                                    age = today.getFullYear() - birthDate.getFullYear();
                                                                                                                    console.log("exists 2: " + age);
                                                                                                                    var elem = document.getElementById('agee2');
                                                                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                                        document.getElementById("agee2").innerHTML = age;
                                                                                                                    }
                                                                                                                }
                                                                                                            });
                                                                                                        window.localStorage.setItem("chatname", name);
                                                                                                        console.log(name + email + location);
                                                                                                        var elem = document.getElementById('name');
                                                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                            document.getElementById("name").innerHTML = name;
                                                                                                        }
                                                                                                        var elem = document.getElementById('bloodg');
                                                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                            document.getElementById("bloodg").innerHTML = blood;
                                                                                                        }
                                                                                                        var elem = document.getElementById('loce');
                                                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                                                            document.getElementById("loce").innerHTML = location;
                                                                                                            document.getElementById("emaile").innerHTML = email;
                                                                                                            if (type === "Public") {
                                                                                                                document.getElementById("phonee").innerHTML = phone;
                                                                                                            } else {
                                                                                                                document.getElementById("phonee").innerHTML = "Private number";
                                                                                                            }
                                                                                                            document.getElementById("agee2").innerHTML = age;
                                                                                                            document.getElementById("sta").innerHTML = "Donor / Genaral member";
                                                                                                        }


                                                                                                    } else {
                                                                                                        console.log('not exist');
                                                                                                    }
                                                                                                });
                                                                                        }
                                                                                    });
                                                                            }
                                                                        });
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                }
            });
        $(window).resize(function () {

            var elem = document.getElementById('mySidenavtt');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    console.log($(window).width());
                    document.getElementById("mySidenavtt").style.width = "250px";
                } else if ($(window).width() < 1650 && document.getElementById("mySidenavtt").style.width == "250px") {
                    document.getElementById("mySidenavtt").style.width = "0";
                }
            };

        });

        return (
            <div class="hui">
                <ScaleLoader
                    css={override}
                    size={20}
                    color={"#3D94F6"}
                    loading={this.state.isLoading}
                />

                <div class="hui">
                    <div class="jio">
                        <div class="jio" id="main-holder2">
                            <div class="fullio">
                                <div class="chooseit">
                                    <br></br>

                                    <div class="have_it" id="pic_name"><img id="prof"></img></div>

                                    <br></br>
                                </div>
                            </div>
                            <h2><div id="name"></div></h2>
                            <br></br>
                            <div class="leftdiv">
                                <div><p><strong>Role </strong> <div id="sta"></div> </p></div>
                                <br></br>
                                <hr></hr>
                                <p><strong>Blood Group  </strong> <div id="bloodg"> </div> </p>
                                <p><strong>Location </strong><div id="loce"></div></p>
                                <p><strong>Email </strong><div id="emaile"></div></p>
                                <p><strong>Phone </strong><div id="phonee"> </div></p>
                                <p><strong>Age </strong><div id="agee2"></div></p>
                            </div>
                        </div>
                    </div>


                    <div class="col-xs-12 text-center inline">
                        <div class="col-xs-12 emphasis block">
                            <br></br>
                            <button class="btn btn-exit btn-block xo" onClick={() => this.gotoChat()}><span class="fa fa-weixin"></span> Chat </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}