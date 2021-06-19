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

export class reg extends Component {
    static displayName = reg.name;

    constructor(props) {
        super(props);
        const $ = window.$;


        this.handleChangea = this.handleChangea.bind(this);
        this.handleChangeax = this.handleChangeax.bind(this);
        this.handleChangeaxy = this.handleChangeaxy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { loc: null };
        this.state = { blood: null };
        this.state = { type: null };

        this.state = {
            startDate: new Date()
        };

        this.state = {
            loading: false
        };
    }
    componentDidMount() {
        var imgy = document.getElementById("prof");
        firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
            var url = snapshot.val().url;
            imgy.src = url;
        });
    }

    handleChangea = (event) => {
        console.log(event.target.value);
        this.setState({
            blood: event.target.value
        });
    }

    handleChangeax = (event) => {
        console.log(event.target.value);
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
        console.log(event.target.value);
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
    runlog() {

        var loginButton = document.getElementById("login-form-submit");
        var loginErrorMsg = document.getElementById("login-error-msg");

        var file;

        var username = document.getElementById("username-field").value;
        var password = document.getElementById("password-field").value;
        var email = document.getElementById("mail-field").value;
        var number = document.getElementById("number-field").value;
        var agex = document.getElementById("age-field").value;
        console.log("dato : " + agex);
        var today = new Date();
        var birthDate = new Date(agex);
        var age = today.getFullYear() - birthDate.getFullYear();
        console.log("dato 1 : " + age);
        var fileholder = document.getElementById("hvfile");
        if (fileholder != null && typeof (fileholder) != 'undefined') {
            file = fileholder.files[0];
        }
        if (username == null || password == null || age == null || email == null || number == null || number.length < 11 || this.state.loc == null || this.state.blood == null) {
            alert("Wrong information");
        } else {

            var bloodo = this.state.blood;
            var loco = this.state.loc;
            var typex = this.state.type;

            this.setState({ loading: true });

            const params = {
                name: username,
                email: email,
                location: loco,
                blood: bloodo,
                phone: number,
                par: "0",
                status: "av",
                type: typex,
                varified: "yes",
                age: age
            };
            console.log(params);

            firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
                var uid = firebase.auth().currentUser.uid;
                var user = firebase.auth().currentUser;
                firebase.database().ref("Donor" + "/" + bloodo + "/" + uid).set(params).then(success => {
                    window.localStorage.setItem("discoblood", bloodo);
                    if (file != null) {
                        console.log("Entered : " + file.name);
                        var storageRef = firebase.storage().ref("DP");
                        var uploadTask = storageRef.child(file.name).put(file);

                        uploadTask.on('state_changed', function (snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED:
                                    console.log('Upload is paused');
                                    break;
                                case firebase.storage.TaskState.RUNNING:
                                    console.log('Upload is running');
                                    break;
                            }
                        }, function (error) {
                        }, function () {
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                console.log('File available at', downloadURL);
                                firebase.database().ref("dp/" + uid).update({
                                    url: downloadURL
                                }).then(success => {
                                    firebase.database().ref("DOB" + "/" + uid).update({
                                        DOB: agex
                                    }).then(success => {
                                        user.sendEmailVerification();
                                        alert("Registered successfully\nPlease verify you email");
                                        firebase.auth().signOut();
                                        window.location.href = "/myacc";
                                    });
                                });
                            });
                        });

                    } else {
                        firebase.database().ref("DOB" + "/" + uid).update({
                            DOB: agex
                        }).then(success => {
                            user.sendEmailVerification();
                            alert("Registered successfully\nPlease verify you email");
                            firebase.auth().signOut();
                            window.location.href = "/myacc";
                        });
                    }
                    
                });


            }, function (error) {
                window.location.href = "/reg";
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });

        }
    }
    runlogup() {
        window.location.href = "/myacc";
    }

    render() {
        firebase.auth().signOut();
        $(document).ready(function () {
            $('input[type="file"]').change(function (e) {
                if (e.target.files[0] != null) {
                    var fileName = e.target.files[0];
                    var elem = document.getElementById('pic_name');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        var reader = new FileReader();

                        reader.onload = function (ex) {
                            $('#prof')
                                .attr('src', ex.target.result)
                                .width(150)
                                .height(150);
                        };

                        reader.readAsDataURL(e.originalEvent.srcElement.files[0]);
                    }
                } else {
                    var elem = document.getElementById('pic_name');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                            var url = snapshot.val().url;
                            document.getElementById("prof").src = url;
                        });
                    }
                }

            });
        });
        while (this.state.loading) {
            return (
                <div className="hui" styles="height = 100vh;">
                    <RingLoader
                        css={override}
                        size={50}
                        color={"#3D94F6"}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
        return (

            <div class="huidr">
                <div class="jio">
                    <main id="main-holder">
                        <h1 id="login-header">Sign up</h1>
                        <div class="fullio">
                            <div class="chooseit">
                                <div class="have_it" id="pic_name"><img id="prof"></img></div>
                                <br></br>
                                <div class="classt">
                                    <label class="have_it"> Choose profile picture </label>
                                </div>
                                <br></br>
                                <input type="file" accept="image/*" class="ixjdk" id="hvfile" />
                            </div>
                        </div>
                        <div id="login-formz">
                            <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Name/Username" />
                            <input type="text" name="email" id="mail-field" class="login-form-field" placeholder="E-mail" />
                            <input type="number" name="password" id="password-field" class="login-form-field" placeholder="Pin" />
                            <InputMask name="number" id="number-field" class="login-form-field" mask="+88\0 9999 - 999999" maskChar={null} placeholder="Contact number" />
                            <DatePicker id="age-field" class="login-form-field" placeholderText = "Date of Birth" selected={this.state.startDate} onChange={this.handleChange} />
                            <form id="yahoo">
                                <fieldset id="Privicy">
                                    <label id="groupt"> Privicy </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="Public" name="Privicy" onChange={this.handleChangeaxy} /> Public </label>

                                    <label id="design"><p> </p> <input type="radio" value="Private" name="Privicy" onChange={this.handleChangeaxy} /> Private </label>
                                </fieldset>
                                <fieldset id="Blood Group">
                                    <label id="groupt"> Blood Group </label>
                                    <br></br>
                                    <label id="design"><p> </p> <input type="radio" value="O+" name="Blood Group" onChange={this.handleChangea} /> O+ </label>

                                    <label id="design"><p> </p> <input type="radio" value="O-" name="Blood Group" onChange={this.handleChangea} /> O- </label>

                                    <label id="design"><p> </p> <input type="radio" value="A+" name="Blood Group" onChange={this.handleChangea} /> A+ </label>

                                    <label id="design"><p> </p> <input type="radio" value="A-" name="Blood Group" onChange={this.handleChangea} /> A- </label>

                                    <label id="design"><p> </p> <input type="radio" value="B+" name="Blood Group" onChange={this.handleChangea} /> B+ </label>

                                    <label id="design"> <p> </p><input type="radio" value="B-" name="Blood Group" onChange={this.handleChangea} /> B- </label>

                                    <label id="design"> <p> </p><input type="radio" value="AB+" name="Blood Group" onChange={this.handleChangea} /> AB+ </label>

                                    <label id="design"> <p> </p><input type="radio" value="AB-" name="Blood Group" onChange={this.handleChangea} /> AB- </label>

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
                            <div id="login-form">
                                <button type="reset" id="login-form-submit" onClick={() => this.runlog()}>Sign up</button>
                                <button type="reset" id="logup-form-submit" onClick={() => this.runlogup()}> Already have an account </button>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}
