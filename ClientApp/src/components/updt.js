import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './style.css';
import $ from 'jquery';
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

export class updt extends Component {
    static displayName = updt.name;

    constructor(props) {
        super(props);
        const $ = window.$;
        this.handleChangeax = this.handleChangeax.bind(this);
        this.handleChangeaxy = this.handleChangeaxy.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = { loc: null };
        this.state = { type: null };
        this.state = {
            data: null
        };
        this.state = {
            startDate: new Date()
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
            this.check();
            this.getData();
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 5000);
    }

    check() {
        var uid = this.state.data;
        if (uid === "login") {
            window.location.href = "myacc";
        }
    }

    handleChangeax = (event) => {
        console.log("type 1 : " + event.target.value);
        var xd = document.getElementById(event.target.value);
        if (typeof (xd) != 'undefined' && xd != null) {
            document.getElementById("Dhaka").style.display = 'none';
            document.getElementById("Rajshahi").style.display = 'none';
            document.getElementById("Chittagong").style.display = 'none';
            document.getElementById("Khulna").style.display = 'none';
            document.getElementById("Barisal").style.display = 'none';
            document.getElementById("Sylhet").style.display = 'none';
            document.getElementById("Mymensingh").style.display = 'none';
            document.getElementById("Rangpur").style.display = 'none';
            xd.style.display = 'block';
        }
        this.setState({
            loc: event.target.value
        });
    }
    handleChangeaxy = (event) => {
        console.log("type : " + event.target.value);
        this.setState({
            type: event.target.value
        });
    }
    handleChange = date => {
        console.log("dateis : " + date);
        this.setState({
            startDate: date
        });
    };
    getData() {
        var uid = this.state.data;
        if (uid != "login") {
            firebase.database().ref("Donor/A+/" + uid).orderByKey().once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    var aname = snapshot.val().name;
                    var aphn = snapshot.val().phone;
                    var aage = snapshot.val().age;
                    firebase.database().
                        ref("DOB/" + uid)
                        .once('value', function (snapshot) {
                            if (snapshot.exists()) {
                                console.log("exists : " + snapshot.val().DOB);
                                var age2 = snapshot.val().DOB;
                                var today = new Date();
                                var birthDate = new Date(age2);
                                aage = today.getFullYear() - birthDate.getFullYear();
                                console.log("exists 2: " + aage);
                                var elem = document.getElementById('mo3');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById("mo3").value = aage;

                                }
                            }
                        });
                    var typo = snapshot.val().type;
                    var loco = snapshot.val().location;
                    console.log(loco + " is here");
                    var elem = document.getElementById('mo1');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById('mo1').value = aname;
                        document.getElementById('mo2').value = aphn;
                        document.getElementById('mo3').value = aage;
                        $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                        $("input[name=Location][value=" + loco + "]").attr('checked', true);
                        if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                            var xd = document.getElementById("Dhaka");
                        } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                            var xd = document.getElementById("Sylhet");
                        } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                            var xd = document.getElementById("Rajshahi");
                        } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                            var xd = document.getElementById("Barisal");
                        } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                            var xd = document.getElementById("Chittagong");
                        } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                            var xd = document.getElementById("Khulna");
                        } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                            var xd = document.getElementById("Mymensingh");
                        } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                            var xd = document.getElementById("Rangpur");
                        }
                        if (typeof (xd) != 'undefined' && xd != null) {
                            document.getElementById("Dhaka").style.display = 'none';
                            document.getElementById("Rajshahi").style.display = 'none';
                            document.getElementById("Chittagong").style.display = 'none';
                            document.getElementById("Khulna").style.display = 'none';
                            document.getElementById("Barisal").style.display = 'none';
                            document.getElementById("Sylhet").style.display = 'none';
                            document.getElementById("Mymensingh").style.display = 'none';
                            document.getElementById("Rangpur").style.display = 'none';
                            xd.style.display = 'block';
                        }
                    }

                } else {
                    firebase.database().ref("Donor/A-/" + uid).orderByKey().once("value").then(function (snapshot) {
                        if (snapshot.exists()) {
                            var aname = snapshot.val().name;
                            var aphn = snapshot.val().phone;
                            var aage = snapshot.val().age;
                            firebase.database().
                                ref("DOB/" + uid)
                                .once('value', function (snapshot) {
                                    if (snapshot.exists()) {
                                        console.log("exists : " + snapshot.val().DOB);
                                        var age2 = snapshot.val().DOB;
                                        var today = new Date();
                                        var birthDate = new Date(age2);
                                        aage = today.getFullYear() - birthDate.getFullYear();
                                        console.log("exists 2: " + aage);
                                        var elem = document.getElementById('mo3');
                                        if (typeof (elem) != 'undefined' && elem != null) {
                                            document.getElementById("mo3").value = aage;
                                        }
                                    }
                                });
                            var typo = snapshot.val().type;
                            var loco = snapshot.val().location;
                            console.log(loco + " is here");
                            var elem = document.getElementById('mo1');
                            if (typeof (elem) != 'undefined' && elem != null) {
                                document.getElementById('mo1').value = aname;
                                document.getElementById('mo2').value = aphn;
                                document.getElementById('mo3').value = aage;
                                $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                    var xd = document.getElementById("Dhaka");
                                } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                    var xd = document.getElementById("Sylhet");
                                } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                    var xd = document.getElementById("Rajshahi");
                                } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                    var xd = document.getElementById("Barisal");
                                } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                    var xd = document.getElementById("Chittagong");
                                } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                    var xd = document.getElementById("Khulna");
                                } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                    var xd = document.getElementById("Mymensingh");
                                } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                    var xd = document.getElementById("Rangpur");
                                }
                                if (typeof (xd) != 'undefined' && xd != null) {
                                    document.getElementById("Dhaka").style.display = 'none';
                                    document.getElementById("Rajshahi").style.display = 'none';
                                    document.getElementById("Chittagong").style.display = 'none';
                                    document.getElementById("Khulna").style.display = 'none';
                                    document.getElementById("Barisal").style.display = 'none';
                                    document.getElementById("Sylhet").style.display = 'none';
                                    document.getElementById("Mymensingh").style.display = 'none';
                                    document.getElementById("Rangpur").style.display = 'none';
                                    xd.style.display = 'block';
                                }
                            }
                        } else {
                            firebase.database().ref("Donor/B+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                if (snapshot.exists()) {
                                    var aname = snapshot.val().name;
                                    var aphn = snapshot.val().phone;
                                    var aage = snapshot.val().age;
                                    firebase.database().
                                        ref("DOB/" + uid)
                                        .once('value', function (snapshot) {
                                            if (snapshot.exists()) {
                                                console.log("exists : " + snapshot.val().DOB);
                                                var age2 = snapshot.val().DOB;
                                                var today = new Date();
                                                var birthDate = new Date(age2);
                                                aage = today.getFullYear() - birthDate.getFullYear();
                                                console.log("exists 2: " + aage);
                                                var elem = document.getElementById('mo3');
                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                    document.getElementById("mo3").value = aage;
                                                }
                                            }
                                        });
                                    var typo = snapshot.val().type;
                                    var loco = snapshot.val().location;
                                    console.log(loco + " is here");
                                    var elem = document.getElementById('mo1');
                                    if (typeof (elem) != 'undefined' && elem != null) {
                                        document.getElementById('mo1').value = aname;
                                        document.getElementById('mo2').value = aphn;
                                        document.getElementById('mo3').value = aage;
                                        $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                        $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                        if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                            var xd = document.getElementById("Dhaka");
                                        } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                            var xd = document.getElementById("Sylhet");
                                        } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                            var xd = document.getElementById("Rajshahi");
                                        } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                            var xd = document.getElementById("Barisal");
                                        } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                            var xd = document.getElementById("Chittagong");
                                        } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                            var xd = document.getElementById("Khulna");
                                        } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                            var xd = document.getElementById("Mymensingh");
                                        } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                            var xd = document.getElementById("Rangpur");
                                        }
                                        if (typeof (xd) != 'undefined' && xd != null) {
                                            document.getElementById("Dhaka").style.display = 'none';
                                            document.getElementById("Rajshahi").style.display = 'none';
                                            document.getElementById("Chittagong").style.display = 'none';
                                            document.getElementById("Khulna").style.display = 'none';
                                            document.getElementById("Barisal").style.display = 'none';
                                            document.getElementById("Sylhet").style.display = 'none';
                                            document.getElementById("Mymensingh").style.display = 'none';
                                            document.getElementById("Rangpur").style.display = 'none';
                                            xd.style.display = 'block';
                                        }
                                    }
                                } else {
                                    firebase.database().ref("Donor/B-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                        if (snapshot.exists()) {
                                            var aname = snapshot.val().name;
                                            var aphn = snapshot.val().phone;
                                            var aage = snapshot.val().age;
                                            firebase.database().
                                                ref("DOB/" + uid)
                                                .once('value', function (snapshot) {
                                                    if (snapshot.exists()) {
                                                        console.log("exists : " + snapshot.val().DOB);
                                                        var age2 = snapshot.val().DOB;
                                                        var today = new Date();
                                                        var birthDate = new Date(age2);
                                                        aage = today.getFullYear() - birthDate.getFullYear();
                                                        console.log("exists 2: " + aage);
                                                        var elem = document.getElementById('mo3');
                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                            document.getElementById("mo3").value = aage;
                                                        }
                                                    }
                                                });
                                            var typo = snapshot.val().type;
                                            var loco = snapshot.val().location;
                                            console.log(loco + " is here");
                                            var elem = document.getElementById('mo1');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById('mo1').value = aname;
                                                document.getElementById('mo2').value = aphn;
                                                document.getElementById('mo3').value = aage;
                                                $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                                $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                                if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                                    var xd = document.getElementById("Dhaka");
                                                } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                                    var xd = document.getElementById("Sylhet");
                                                } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                                    var xd = document.getElementById("Rajshahi");
                                                } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                                    var xd = document.getElementById("Barisal");
                                                } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                                    var xd = document.getElementById("Chittagong");
                                                } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                                    var xd = document.getElementById("Khulna");
                                                } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                                    var xd = document.getElementById("Mymensingh");
                                                } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                                    var xd = document.getElementById("Rangpur");
                                                }
                                                if (typeof (xd) != 'undefined' && xd != null) {
                                                    document.getElementById("Dhaka").style.display = 'none';
                                                    document.getElementById("Rajshahi").style.display = 'none';
                                                    document.getElementById("Chittagong").style.display = 'none';
                                                    document.getElementById("Khulna").style.display = 'none';
                                                    document.getElementById("Barisal").style.display = 'none';
                                                    document.getElementById("Sylhet").style.display = 'none';
                                                    document.getElementById("Mymensingh").style.display = 'none';
                                                    document.getElementById("Rangpur").style.display = 'none';
                                                    xd.style.display = 'block';
                                                }
                                            }
                                        } else {
                                            firebase.database().ref("Donor/AB+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                if (snapshot.exists()) {
                                                    var aname = snapshot.val().name;
                                                    var aphn = snapshot.val().phone;
                                                    var aage = snapshot.val().age;
                                                    firebase.database().
                                                        ref("DOB/" + uid)
                                                        .once('value', function (snapshot) {
                                                            if (snapshot.exists()) {
                                                                console.log("exists : " + snapshot.val().DOB);
                                                                var age2 = snapshot.val().DOB;
                                                                var today = new Date();
                                                                var birthDate = new Date(age2);
                                                                aage = today.getFullYear() - birthDate.getFullYear();
                                                                console.log("exists 2: " + aage);
                                                                var elem = document.getElementById('mo3');
                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                    document.getElementById("mo3").value = aage;
                                                                }
                                                            }
                                                        });
                                                    var typo = snapshot.val().type;
                                                    var loco = snapshot.val().location;
                                                    console.log(loco + " is here");
                                                    var elem = document.getElementById('mo1');
                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                        document.getElementById('mo1').value = aname;
                                                        document.getElementById('mo2').value = aphn;
                                                        document.getElementById('mo3').value = aage;
                                                        $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                                        $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                                        if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                                            var xd = document.getElementById("Dhaka");
                                                        } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                                            var xd = document.getElementById("Sylhet");
                                                        } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                                            var xd = document.getElementById("Rajshahi");
                                                        } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                                            var xd = document.getElementById("Barisal");
                                                        } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                                            var xd = document.getElementById("Chittagong");
                                                        } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                                            var xd = document.getElementById("Khulna");
                                                        } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                                            var xd = document.getElementById("Mymensingh");
                                                        } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                                            var xd = document.getElementById("Rangpur");
                                                        }
                                                        if (typeof (xd) != 'undefined' && xd != null) {
                                                            document.getElementById("Dhaka").style.display = 'none';
                                                            document.getElementById("Rajshahi").style.display = 'none';
                                                            document.getElementById("Chittagong").style.display = 'none';
                                                            document.getElementById("Khulna").style.display = 'none';
                                                            document.getElementById("Barisal").style.display = 'none';
                                                            document.getElementById("Sylhet").style.display = 'none';
                                                            document.getElementById("Mymensingh").style.display = 'none';
                                                            document.getElementById("Rangpur").style.display = 'none';
                                                            xd.style.display = 'block';
                                                        }
                                                    }
                                                } else {
                                                    firebase.database().ref("Donor/AB-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                        if (snapshot.exists()) {
                                                            var aname = snapshot.val().name;
                                                            var aphn = snapshot.val().phone;
                                                            var aage = snapshot.val().age;
                                                            firebase.database().
                                                                ref("DOB/" + uid)
                                                                .once('value', function (snapshot) {
                                                                    if (snapshot.exists()) {
                                                                        console.log("exists : " + snapshot.val().DOB);
                                                                        var age2 = snapshot.val().DOB;
                                                                        var today = new Date();
                                                                        var birthDate = new Date(age2);
                                                                        aage = today.getFullYear() - birthDate.getFullYear();
                                                                        console.log("exists 2: " + aage);
                                                                        var elem = document.getElementById('mo3');
                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                            document.getElementById("mo3").value = aage;
                                                                        }
                                                                    }
                                                                });
                                                            var typo = snapshot.val().type;
                                                            var loco = snapshot.val().location;
                                                            console.log(loco + " is here");
                                                            var elem = document.getElementById('mo1');
                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                document.getElementById('mo1').value = aname;
                                                                document.getElementById('mo2').value = aphn;
                                                                document.getElementById('mo3').value = aage;
                                                                $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                                                $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                                                if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                                                    var xd = document.getElementById("Dhaka");
                                                                } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                                                    var xd = document.getElementById("Sylhet");
                                                                } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                                                    var xd = document.getElementById("Rajshahi");
                                                                } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                                                    var xd = document.getElementById("Barisal");
                                                                } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                                                    var xd = document.getElementById("Chittagong");
                                                                } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                                                    var xd = document.getElementById("Khulna");
                                                                } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                                                    var xd = document.getElementById("Mymensingh");
                                                                } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                                                    var xd = document.getElementById("Rangpur");
                                                                }
                                                                if (typeof (xd) != 'undefined' && xd != null) {
                                                                    document.getElementById("Dhaka").style.display = 'none';
                                                                    document.getElementById("Rajshahi").style.display = 'none';
                                                                    document.getElementById("Chittagong").style.display = 'none';
                                                                    document.getElementById("Khulna").style.display = 'none';
                                                                    document.getElementById("Barisal").style.display = 'none';
                                                                    document.getElementById("Sylhet").style.display = 'none';
                                                                    document.getElementById("Mymensingh").style.display = 'none';
                                                                    document.getElementById("Rangpur").style.display = 'none';
                                                                    xd.style.display = 'block';
                                                                }
                                                            }
                                                        } else {
                                                            firebase.database().ref("Donor/O+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                                if (snapshot.exists()) {
                                                                    var aname = snapshot.val().name;
                                                                    var aphn = snapshot.val().phone;
                                                                    var aage = snapshot.val().age;
                                                                    firebase.database().
                                                                        ref("DOB/" + uid)
                                                                        .once('value', function (snapshot) {
                                                                            if (snapshot.exists()) {
                                                                                console.log("exists : " + snapshot.val().DOB);
                                                                                var age2 = snapshot.val().DOB;
                                                                                var today = new Date();
                                                                                var birthDate = new Date(age2);
                                                                                aage = today.getFullYear() - birthDate.getFullYear();
                                                                                console.log("exists 2: " + aage);
                                                                                var elem = document.getElementById('mo3');
                                                                                if (typeof (elem) != 'undefined' && elem != null) {
                                                                                    document.getElementById("mo3").value = aage;
                                                                                }
                                                                            }
                                                                        });
                                                                    var typo = snapshot.val().type;
                                                                    var loco = snapshot.val().location;
                                                                    console.log(loco + " is here");
                                                                    var elem = document.getElementById('mo1');
                                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                                        document.getElementById('mo1').value = aname;
                                                                        document.getElementById('mo2').value = aphn;
                                                                        document.getElementById('mo3').value = aage;
                                                                        $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                                                        $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                                                        if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                                                            var xd = document.getElementById("Dhaka");
                                                                        } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                                                            var xd = document.getElementById("Sylhet");
                                                                        } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                                                            var xd = document.getElementById("Rajshahi");
                                                                        } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                                                            var xd = document.getElementById("Barisal");
                                                                        } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                                                            var xd = document.getElementById("Chittagong");
                                                                        } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                                                            var xd = document.getElementById("Khulna");
                                                                        } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                                                            var xd = document.getElementById("Mymensingh");
                                                                        } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                                                            var xd = document.getElementById("Rangpur");
                                                                        }
                                                                        if (typeof (xd) != 'undefined' && xd != null) {
                                                                            document.getElementById("Dhaka").style.display = 'none';
                                                                            document.getElementById("Rajshahi").style.display = 'none';
                                                                            document.getElementById("Chittagong").style.display = 'none';
                                                                            document.getElementById("Khulna").style.display = 'none';
                                                                            document.getElementById("Barisal").style.display = 'none';
                                                                            document.getElementById("Sylhet").style.display = 'none';
                                                                            document.getElementById("Mymensingh").style.display = 'none';
                                                                            document.getElementById("Rangpur").style.display = 'none';
                                                                            xd.style.display = 'block';
                                                                        }
                                                                    }
                                                                } else {
                                                                    firebase.database().ref("Donor/O-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                                        if (snapshot.exists()) {
                                                                            var aname = snapshot.val().name;
                                                                            var aphn = snapshot.val().phone;
                                                                            var aage = snapshot.val().age;
                                                                            firebase.database().
                                                                                ref("DOB/" + uid)
                                                                                .once('value', function (snapshot) {
                                                                                    if (snapshot.exists()) {
                                                                                        console.log("exists : " + snapshot.val().DOB);
                                                                                        var age2 = snapshot.val().DOB;
                                                                                        var today = new Date();
                                                                                        var birthDate = new Date(age2);
                                                                                        aage = today.getFullYear() - birthDate.getFullYear();
                                                                                        console.log("exists 2: " + aage);
                                                                                        var elem = document.getElementById('mo3');
                                                                                        if (typeof (elem) != 'undefined' && elem != null) {
                                                                                            document.getElementById("mo3").value = aage;
                                                                                        }
                                                                                    }
                                                                                });
                                                                            var typo = snapshot.val().type;
                                                                            var loco = snapshot.val().location;
                                                                            console.log(loco + " is here");
                                                                            var elem = document.getElementById('mo1');
                                                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                                                document.getElementById('mo1').value = aname;
                                                                                document.getElementById('mo2').value = aphn;
                                                                                document.getElementById('mo3').value = aage;
                                                                                $("input[name=Privicy][value=" + typo + "]").attr('checked', true);
                                                                                $("input[name=Location][value=" + loco + "]").attr('checked', true);
                                                                                if (loco == 'Dhaka' || loco == 'Faridpur' || loco == 'Gazipur' || loco == 'Gopalganj' || loco == 'Kishoreganj' || loco == 'Madaripur' || loco == 'Manikganj' || loco == 'Manikganj' || loco == 'Narayanganj' || loco == 'Narsingdi' || loco == 'Rajbari' || loco == 'Shariatpur' || loco == 'Tangail') {
                                                                                    var xd = document.getElementById("Dhaka");
                                                                                } else if (loco == 'Sylhet' || loco == 'Habiganj' || loco == 'Moulvibazar' || loco == 'Sunamganj') {
                                                                                    var xd = document.getElementById("Sylhet");
                                                                                } else if (loco == 'Bogra' || loco == 'Joypurhat' || loco == 'Naogaon' || loco == 'Natore' || loco == 'Chapainawabganj' || loco == 'Pabna' || loco == 'Rajshahi' || loco == 'Sirajganj') {
                                                                                    var xd = document.getElementById("Rajshahi");
                                                                                } else if (loco == 'Barguna' || loco == 'Barisal' || loco == 'Bhola' || loco == 'Jhalokati' || loco == 'Patuakhali' || loco == 'Pirojpur') {
                                                                                    var xd = document.getElementById("Barisal");
                                                                                } else if (loco == 'Chittagong' || loco == 'Bandarban' || loco == 'Brahmanbaria' || loco == 'Chandpur' || loco == 'Comilla' || loco == "Cox's Bazar" || loco == 'Feni' || loco == 'Khagrachhari' || loco == 'Lakshmipur' || loco == 'Noakhali' || loco == 'Rangamati') {
                                                                                    var xd = document.getElementById("Chittagong");
                                                                                } else if (loco == 'Khulna' || loco == 'Chuadanga' || loco == 'Jessore' || loco == 'Jhenaidah' || loco == 'Kushtia' || loco == 'Magura' || loco == 'Meherpur' || loco == 'Narail' || loco == 'Satkhira') {
                                                                                    var xd = document.getElementById("Khulna");
                                                                                } else if (loco == 'Mymensingh' || loco == 'Jamalpur' || loco == 'Netrokona' || loco == 'Sherpur') {
                                                                                    var xd = document.getElementById("Mymensingh");
                                                                                } else if (loco == 'Rangpur' || loco == 'Dinajpur' || loco == 'Gaibandha' || loco == 'Kurigram' || loco == 'Lalmonirhat' || loco == 'Nilphamari' || loco == 'Panchagarh' || loco == 'Thakurgaon') {
                                                                                    var xd = document.getElementById("Rangpur");
                                                                                }
                                                                                if (typeof (xd) != 'undefined' && xd != null) {
                                                                                    document.getElementById("Dhaka").style.display = 'none';
                                                                                    document.getElementById("Rajshahi").style.display = 'none';
                                                                                    document.getElementById("Chittagong").style.display = 'none';
                                                                                    document.getElementById("Khulna").style.display = 'none';
                                                                                    document.getElementById("Barisal").style.display = 'none';
                                                                                    document.getElementById("Sylhet").style.display = 'none';
                                                                                    document.getElementById("Mymensingh").style.display = 'none';
                                                                                    document.getElementById("Rangpur").style.display = 'none';
                                                                                    xd.style.display = 'block';
                                                                                }
                                                                            }
                                                                        } else {
                                                                            console.log("No user found");
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

        } else {
            window.location.href = "myacc";
        }
    }
    runlog() {
        var elem = document.getElementById('mo1');
        if (typeof (elem) != 'undefined' && elem != null) {
            var name = document.getElementById("mo1").value;
            var number = document.getElementById("mo2").value;
            var age = document.getElementById("mo3").value;
            var locg = document.querySelector('input[name="Location"]:checked').value;
            var priv = document.querySelector('input[name="Privicy"]:checked').value;
            console.log("hmm xxo : " + locg + " " + priv);
            this.setState({ isLoading: true });
            if (name != null && name != "undefined" && number != null && number != "undefined" && age != null && age != "undefined") {

                var agex = document.getElementById("age-field").value;
                var uid = this.state.data;
                if (typeof (agex) != 'undefined' && agex != null) {
                    console.log("dato : " + agex);
                    var today = new Date();
                    var birthDate = new Date(agex);
                    var agedif = today.getFullYear() - birthDate.getFullYear();
                    if (agedif != age) {
                        age = agedif
                    }
                    firebase.database().ref("DOB/" + uid).update({
                        DOB: agex
                    });
                    console.log("dato 1 : " + age);
                }
                
                if (uid != "login") {
                    firebase.database().ref("Donor/A+/" + uid).orderByKey().once("value").then(function (snapshot) {
                        if (snapshot.exists()) {
                            firebase.database().ref("Donor/A+/" + uid).update({
                                name: name,
                                phone: number,
                                age: age,
                                location: locg,
                                type: priv
                            }).then(success => {
                                alert("Updateed successfully");
                                window.location.href = "/myacc";
                            });
                        } else {
                            firebase.database().ref("Donor/A-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                if (snapshot.exists()) {
                                    firebase.database().ref("Donor/A-/" + uid).update({
                                        name: name,
                                        phone: number,
                                        age: age,
                                        location: locg,
                                        type: priv
                                    }).then(success => {
                                        alert("Updateed successfully");
                                        window.location.href = "/myacc";
                                    });
                                } else {
                                    firebase.database().ref("Donor/B+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                        if (snapshot.exists()) {
                                            firebase.database().ref("Donor/B+/" + uid).update({
                                                name: name,
                                                phone: number,
                                                age: age,
                                                location: locg,
                                                type: priv
                                            }).then(success => {
                                                alert("Updateed successfully");
                                                window.location.href = "/myacc";
                                            });
                                        } else {
                                            firebase.database().ref("Donor/B-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                if (snapshot.exists()) {
                                                    firebase.database().ref("Donor/B-/" + uid).update({
                                                        name: name,
                                                        phone: number,
                                                        age: age,
                                                        location: locg,
                                                        type: priv
                                                    }).then(success => {
                                                        alert("Updateed successfully");
                                                        window.location.href = "/myacc";
                                                    });
                                                } else {
                                                    firebase.database().ref("Donor/AB+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                        if (snapshot.exists()) {
                                                            firebase.database().ref("Donor/AB+/" + uid).update({
                                                                name: name,
                                                                phone: number,
                                                                age: age,
                                                                location: locg,
                                                                type: priv
                                                            }).then(success => {
                                                                alert("Updateed successfully");
                                                                window.location.href = "/myacc";
                                                            });
                                                        } else {
                                                            firebase.database().ref("Donor/AB-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                                if (snapshot.exists()) {
                                                                    firebase.database().ref("Donor/AB-/" + uid).update({
                                                                        name: name,
                                                                        phone: number,
                                                                        age: age,
                                                                        location: locg,
                                                                        type: priv
                                                                    }).then(success => {
                                                                        alert("Updateed successfully");
                                                                        window.location.href = "/myacc";
                                                                    });
                                                                } else {
                                                                    firebase.database().ref("Donor/O+/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                                        if (snapshot.exists()) {
                                                                            firebase.database().ref("Donor/O+/" + uid).update({
                                                                                name: name,
                                                                                phone: number,
                                                                                age: age,
                                                                                location: locg,
                                                                                type: priv
                                                                            }).then(success => {
                                                                                alert("Updateed successfully");
                                                                                window.location.href = "/myacc";
                                                                            });
                                                                        } else {
                                                                            firebase.database().ref("Donor/O-/" + uid).orderByKey().once("value").then(function (snapshot) {
                                                                                if (snapshot.exists()) {
                                                                                    firebase.database().ref("Donor/O-/" + uid).update({
                                                                                        name: name,
                                                                                        phone: number,
                                                                                        age: age,
                                                                                        location: locg,
                                                                                        type: priv
                                                                                    }).then(success => {
                                                                                        alert("Updateed successfully");
                                                                                        window.location.href = "/myacc";
                                                                                    });
                                                                                } else {
                                                                                    console.log("No user found");
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

                } else {
                    window.location.href = "myacc";
                }
            } else {
                alert("Please do fill the infos correctly");
            }
        }
    }
    handleChange = date => {
        console.log("dateis : " + date);
        this.setState({
            startDate: date
        });
    };
    showji() {
        var x = document.getElementById("datex");
        if (typeof (x) != 'undefined' && x != null) {
            x.style.display = "block";
            document.getElementById("dbut").style.display = "none";
        }
    }
    render() {
        return (

            <div class="huilux">
                <div class="jio2">
                    <main id="main-holder">

                        <div className="huix">
                            <RingLoader
                                css={override}
                                size={50}
                                color={"#3D94F6"}
                                loading={this.state.isLoading}
                            />
                        </div>

                        <h1 id="login-header">Update profile</h1>
                        <br></br>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js"></script>

                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/css/bootstrap-datetimepicker.min.css" />

                        <form id="login-form">
                            <input type="text" name="username" id="mo1" class="login-form-field" placeholder="Name/Username" />
                            <input type="text" id="mo2" class="login-form-field" placeholder="Contact number" />
                            <input type="number" name="mo3" id="mo3" class="login-form-field" placeholder="Age" />
                            <button type="button" id="dbut" onClick={() => this.showji()}>Update date of Birth</button>
                            <div id="datex">
                                <DatePicker name="Age" id="age-field" class="login-form-field" placeholderText="Date of Birth" selected={this.state.startDate} onChange={this.handleChange} />
                            </div>
                            <form id="yahoo">
                                <fieldset id="Privicy">
                                    <label id="groupt"> Privicy </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Public" name="Privicy" onChange={this.handleChangeaxy} /> Public </label>

                                    <label id="design"><p> </p> <input type="radio" value="Private" name="Privicy" onChange={this.handleChangeaxy} /> Private </label>
                                </fieldset>

                                <fieldset id="Location">
                                    <label id="groupt"> Location </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Dhaka" name="Location" onChange={this.handleChangeax} /> Dhaka </label>

                                    <label id="design"><p> </p> <input type="radio" value="Sylhet" name="Location" onChange={this.handleChangeax} /> Sylhet </label>

                                    <label id="design"><p> </p> <input type="radio" value="Rajshahi" name="Location" onChange={this.handleChangeax} /> Rajshahi </label>

                                    <label id="design"><p> </p> <input type="radio" value="Barisal" name="Location" onChange={this.handleChangeax} /> Barisal </label>

                                    <label id="design"><p> </p> <input type="radio" value="Chittagong" name="Location" onChange={this.handleChangeax} /> Chittagong </label>

                                    <label id="design"> <p> </p><input type="radio" value="Rangpur" name="Location" onChange={this.handleChangeax} /> Rangpur </label>

                                    <label id="design"> <p> </p><input type="radio" value="Mymensingh" name="Location" onChange={this.handleChangeax} /> Mymensingh </label>

                                    <label id="design"> <p> </p><input type="radio" value="Khulna" name="Location" onChange={this.handleChangeax} /> Khulna </label>
                                </fieldset>

                                <br />

                                <fieldset id="Dhaka">
                                    <label id="groupt"> Dhaka </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Dhaka" name="Location" onChange={this.handleChangeax} /> Dhaka </label>

                                    <label id="design"><p> </p> <input type="radio" value="Faridpur" name="Location" onChange={this.handleChangeax} /> Faridpur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Gazipur" name="Location" onChange={this.handleChangeax} /> Gazipur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Gopalganj" name="Location" onChange={this.handleChangeax} /> Gopalganj </label>


                                    <label id="design"><p> </p> <input type="radio" value="Kishoreganj" name="Location" onChange={this.handleChangeax} /> Kishoreganj </label>

                                    <label id="design"> <p> </p><input type="radio" value="Madaripur" name="Location" onChange={this.handleChangeax} /> Madaripur </label>

                                    <label id="design"> <p> </p><input type="radio" value="Manikganj" name="Location" onChange={this.handleChangeax} /> Manikganj </label>

                                    <label id="design"> <p> </p><input type="radio" value="Manikganj" name="Location" onChange={this.handleChangeax} /> Manikganj </label>


                                    <label id="design"><p> </p> <input type="radio" value="Narayanganj" name="Location" onChange={this.handleChangeax} /> Narayanganj </label>

                                    <label id="design"> <p> </p><input type="radio" value="Narsingdi" name="Location" onChange={this.handleChangeax} /> Narsingdi </label>

                                    <label id="design"> <p> </p><input type="radio" value="Rajbari" name="Location" onChange={this.handleChangeax} /> Rajbari </label>

                                    <label id="design"> <p> </p><input type="radio" value="Shariatpur" name="Location" onChange={this.handleChangeax} /> Shariatpur </label>

                                    <label id="design"> <p> </p><input type="radio" value="Tangail" name="Location" onChange={this.handleChangeax} /> Tangail </label>
                                </fieldset>

                                <fieldset id="Sylhet">
                                    <label id="groupt"> Sylhet </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Sylhet" name="Location" onChange={this.handleChangeax} /> Sylhet </label>

                                    <label id="design"><p> </p> <input type="radio" value="Habiganj" name="Location" onChange={this.handleChangeax} /> Habiganj </label>

                                    <label id="design"><p> </p> <input type="radio" value="Moulvibazar" name="Location" onChange={this.handleChangeax} /> Moulvibazar </label>

                                    <label id="design"><p> </p> <input type="radio" value="Sunamganj" name="Location" onChange={this.handleChangeax} /> Sunamganj </label>
                                </fieldset>

                                <fieldset id="Rajshahi">
                                    <label id="groupt"> Rajshahi </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Bogra" name="Location" onChange={this.handleChangeax} /> Bogra </label>

                                    <label id="design"><p> </p> <input type="radio" value="Joypurhat" name="Location" onChange={this.handleChangeax} /> Joypurhat </label>

                                    <label id="design"><p> </p> <input type="radio" value="Naogaon" name="Location" onChange={this.handleChangeax} /> Naogaon </label>

                                    <label id="design"><p> </p> <input type="radio" value="Natore" name="Location" onChange={this.handleChangeax} /> Natore </label>


                                    <label id="design"><p> </p> <input type="radio" value="Chapainawabganj" name="Location" onChange={this.handleChangeax} /> Chapainawabganj </label>

                                    <label id="design"><p> </p> <input type="radio" value="Pabna" name="Location" onChange={this.handleChangeax} /> Pabna </label>

                                    <label id="design"><p> </p> <input type="radio" value="Rajshahi" name="Location" onChange={this.handleChangeax} /> Rajshahi </label>

                                    <label id="design"><p> </p> <input type="radio" value="Sirajganj" name="Location" onChange={this.handleChangeax} /> Sirajganj </label>
                                </fieldset>

                                <fieldset id="Barisal">
                                    <label id="groupt"> Barisal </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Barguna" name="Location" onChange={this.handleChangeax} /> Barguna </label>

                                    <label id="design"><p> </p> <input type="radio" value="Barisal" name="Location" onChange={this.handleChangeax} /> Barisal </label>

                                    <label id="design"><p> </p> <input type="radio" value="Bhola" name="Location" onChange={this.handleChangeax} /> Bhola </label>

                                    <label id="design"><p> </p> <input type="radio" value="Jhalokati" name="Location" onChange={this.handleChangeax} /> Jhalokati </label>


                                    <label id="design"><p> </p> <input type="radio" value="Patuakhali" name="Location" onChange={this.handleChangeax} /> Patuakhali </label>

                                    <label id="design"><p> </p> <input type="radio" value="Pirojpur" name="Location" onChange={this.handleChangeax} /> Pirojpur </label>

                                </fieldset>

                                <fieldset id="Chittagong">
                                    <label id="groupt"> Chittagong </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Chittagong" name="Location" onChange={this.handleChangeax} /> Chittagong </label>

                                    <label id="design"><p> </p> <input type="radio" value="Bandarban" name="Location" onChange={this.handleChangeax} /> Bandarban </label>

                                    <label id="design"><p> </p> <input type="radio" value="Brahmanbaria" name="Location" onChange={this.handleChangeax} /> Brahmanbaria </label>

                                    <label id="design"><p> </p> <input type="radio" value="Chandpur" name="Location" onChange={this.handleChangeax} /> Chandpur </label>


                                    <label id="design"><p> </p> <input type="radio" value="Comilla" name="Location" onChange={this.handleChangeax} /> Comilla </label>

                                    <label id="design"><p> </p> <input type="radio" value="Cox's Bazar" name="Location" onChange={this.handleChangeax} /> Cox's Bazar </label>

                                    <label id="design"><p> </p> <input type="radio" value="Feni" name="Location" onChange={this.handleChangeax} /> Feni </label>

                                    <label id="design"><p> </p> <input type="radio" value="Khagrachhari" name="Location" onChange={this.handleChangeax} /> Khagrachhari </label>

                                    <label id="design"><p> </p> <input type="radio" value="Lakshmipur" name="Location" onChange={this.handleChangeax} /> Lakshmipur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Noakhali" name="Location" onChange={this.handleChangeax} /> Noakhali </label>

                                    <label id="design"><p> </p> <input type="radio" value="Rangamati" name="Location" onChange={this.handleChangeax} /> Rangamati </label>

                                </fieldset>

                                <fieldset id="Khulna">
                                    <label id="groupt"> Khulna </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Khulna" name="Location" onChange={this.handleChangeax} /> Khulna </label>

                                    <label id="design"><p> </p> <input type="radio" value="Chuadanga" name="Location" onChange={this.handleChangeax} /> Chuadanga </label>

                                    <label id="design"><p> </p> <input type="radio" value="Jessore" name="Location" onChange={this.handleChangeax} /> Jessore </label>

                                    <label id="design"><p> </p> <input type="radio" value="Jhenaidah" name="Location" onChange={this.handleChangeax} /> Jhenaidah </label>


                                    <label id="design"><p> </p> <input type="radio" value="Kushtia" name="Location" onChange={this.handleChangeax} /> Kushtia </label>

                                    <label id="design"><p> </p> <input type="radio" value="Magura" name="Location" onChange={this.handleChangeax} /> Magura </label>

                                    <label id="design"><p> </p> <input type="radio" value="Meherpur" name="Location" onChange={this.handleChangeax} /> Meherpur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Narail" name="Location" onChange={this.handleChangeax} /> Narail </label>

                                    <label id="design"><p> </p> <input type="radio" value="Satkhira" name="Location" onChange={this.handleChangeax} /> Satkhira </label>

                                </fieldset>
                                <fieldset id="Mymensingh">
                                    <label id="groupt"> Mymensingh </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Mymensingh" name="Location" onChange={this.handleChangeax} /> Mymensingh </label>

                                    <label id="design"><p> </p> <input type="radio" value="Jamalpur" name="Location" onChange={this.handleChangeax} /> Jamalpur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Netrokona" name="Location" onChange={this.handleChangeax} /> Netrokona</label>

                                    <label id="design"><p> </p> <input type="radio" value="Sherpur" name="Location" onChange={this.handleChangeax} /> Sherpur </label>

                                </fieldset>
                                <fieldset id="Rangpur">
                                    <label id="groupt"> Rangpur </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Rangpur" name="Location" onChange={this.handleChangeax} /> Rangpur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Dinajpur" name="Location" onChange={this.handleChangeax} /> Dinajpur </label>

                                    <label id="design"><p> </p> <input type="radio" value="Gaibandha" name="Location" onChange={this.handleChangeax} /> Gaibandha</label>

                                    <label id="design"><p> </p> <input type="radio" value="Kurigram" name="Location" onChange={this.handleChangeax} /> Kurigram </label>

                                    <label id="design"><p> </p> <input type="radio" value="Lalmonirhat" name="Location" onChange={this.handleChangeax} /> Lalmonirhat </label>

                                    <label id="design"><p> </p> <input type="radio" value="Nilphamari" name="Location" onChange={this.handleChangeax} /> Nilphamari </label>

                                    <label id="design"><p> </p> <input type="radio" value="Panchagarh" name="Location" onChange={this.handleChangeax} /> Panchagarh </label>

                                    <label id="design"><p> </p> <input type="radio" value="Thakurgaon" name="Location" onChange={this.handleChangeax} /> Thakurgaon </label>

                                </fieldset>
                            </form>
                            <br></br>
                            <button type="reset" id="login-form-submit" onClick={() => this.runlog()}>Update Profile</button>

                        </form>

                    </main>
                </div>
            </div>
        );
    }
}