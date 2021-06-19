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
import SyncLoader from "react-spinners/SyncLoader";
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

export class search extends Component {
    static displayName = search.name;
    constructor(props) {
        super(props);
        const $ = window.$;

        this.handleChangea = this.handleChangea.bind(this);
        this.handleChangeax = this.handleChangeax.bind(this);

        this.state = { loc: null };
        this.state = { blood: null };

        this.state = {
            data: null
        };
        this.state = {
            loading: true

        }
        window.localStorage.setItem("Index", "3");
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

    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });


        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000);
    }

    searchdonor() {

        var blood = this.state.blood;
        var loc = this.state.loc;
        var us = this.state.data;

        var init = "0";
        var check = 0;

        if (blood != null && loc != null) {
            firebase.database().ref("Donor").child(blood).orderByKey().once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var elem = document.getElementById('parentDivy');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            if (init === "0") {
                                document.getElementById('parentDivy').innerHTML = "";
                            }
                        }
                        init = "No 0";
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();

                        var name_val = childSnapshot.val().location;
                        var name = childSnapshot.val().name;
                        var email = childSnapshot.val().email;


                        if (name_val === loc && key != us) {
                            check = check + 1;
                            var x = document.createElement("div");
                            x.id = "lol1x";
                            var x1 = document.createElement("div");
                            x1.id = "lol0111x";
                            var img = document.createElement('img');
                            img.id = "imgtuiomc"
                            firebase.database().ref("dp/" + key).orderByKey().once("value").then(function (snapshot) {
                                if (snapshot.exists()) {
                                    var url = snapshot.val().url;
                                    img.src = url;

                                    x1.appendChild(img);
                                } else {
                                    firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                                        var url = snapshot.val().url;
                                        img.src = url;

                                        x1.appendChild(img);
                                    });
                                }
                            });
                            var x11 = document.createElement("div");
                            x11.id = "lol0111";
                            var w = document.createElement("button");
                            w.setAttribute('class', 'userstdr');
                            w.onclick = function () {
                                window.localStorage.setItem("uid", key);
                                window.location.href = "dprof";
                            };
                            w.appendChild(document.createTextNode(name));
                            x11.appendChild(w);
                            var d = document.createElement("br");
                            x11.appendChild(d);

                            var xop = document.createElement("span");
                            xop.setAttribute('class', 'userstyb');
                            xop.appendChild(document.createTextNode(email));
                            x11.appendChild(xop);
                            var d = document.createElement("br");
                            x11.appendChild(d);

                            var xo = document.createElement("span");
                            xo.setAttribute('class', 'userstxb');
                            xo.appendChild(document.createTextNode(name_val));
                            x11.appendChild(xo);
                            var d = document.createElement("br");
                            x11.appendChild(d);
                            console.log("adding");
                            x.appendChild(x1);

                            x.appendChild(x11);
                            document.getElementById('parentDivy').appendChild(x);
                            var d = document.createElement("br");
                            document.getElementById('parentDivy').appendChild(d);
                            var d = document.createElement("br");
                            document.getElementById('parentDivy').appendChild(d);

                        }

                    });
                    if (check == 0) {
                        var xo = document.createElement("span");
                        xo.setAttribute('class', 'userstx');
                        xo.appendChild(document.createTextNode("No doner found for selected blood group or location"));
                        document.getElementById('parentDivy').appendChild(xo);
                    }
                });

        }

        return (
            <div id="parentDivy ">

            </div>
        )
    }

    render() {
        while (this.state.loading) {
            return (
                <div className="hui" styles="height = 100vh;">
                    <SyncLoader
                        css={override}
                        size={30}
                        color={"#3D94F6"}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
        return (
            <div class="sys">
                <div class="emptysky" id="intro1x">
                    <form>
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
                            <br></br>

                            <label id="design"><p> </p> <input type="radio" value="Sylhet" name="Location" onChange={this.handleChangeax} /> Sylhet </label>
                            <br></br>

                            <label id="design"><p> </p> <input type="radio" value="Rajshahi" name="Location" onChange={this.handleChangeax} /> Rajshahi </label>
                            <br></br>
                            <label id="design"><p> </p> <input type="radio" value="Barisal" name="Location" onChange={this.handleChangeax} /> Barisal </label>

                            <br></br>

                            <label id="design"><p> </p> <input type="radio" value="Chittagong" name="Location" onChange={this.handleChangeax} /> Chittagong </label>
                            <br></br>
                            <label id="design"> <p> </p><input type="radio" value="Rangpur" name="Location" onChange={this.handleChangeax} /> Rangpur </label>
                            <br></br>
                            <label id="design"> <p> </p><input type="radio" value="Mymensingh" name="Location" onChange={this.handleChangeax} /> Mymensingh </label>
                            <br></br>
                            <label id="design"> <p> </p><input type="radio" value="Khulna" name="Location" onChange={this.handleChangeax} /> Khulna </label>
                        </fieldset>
                        <br></br>
                        <hr></hr>
                        <br />

                        <fieldset id="Dhaka">
                            <label id="groupt"> Dhaka </label>
                            <br></br>
                            <label id="design"><p> </p> <input type="radio" value="Dhaka" name="Location" onChange={this.handleChangeax} /> Dhaka </label>

                            <label id="design"><p> </p> <input type="radio" value="Faridpur" name="Location" onChange={this.handleChangeax} /> Faridpur </label>

                            <label id="design"><p> </p> <input type="radio" value="Gazipur" name="Location" onChange={this.handleChangeax} /> Gazipur </label>

                            <label id="design"><p> </p> <input type="radio" value="Gopalganj" name="Location" onChange={this.handleChangeax} /> Gopalganj </label>

                            <br></br>

                            <label id="design"><p> </p> <input type="radio" value="Kishoreganj" name="Location" onChange={this.handleChangeax} /> Kishoreganj </label>

                            <label id="design"> <p> </p><input type="radio" value="Madaripur" name="Location" onChange={this.handleChangeax} /> Madaripur </label>

                            <label id="design"> <p> </p><input type="radio" value="Manikganj" name="Location" onChange={this.handleChangeax} /> Manikganj </label>

                            <label id="design"> <p> </p><input type="radio" value="Manikganj" name="Location" onChange={this.handleChangeax} /> Manikganj </label>
                            <br></br>

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

                            <br />

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

                            <br />

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

                            <br />

                            <label id="design"><p> </p> <input type="radio" value="Comilla" name="Location" onChange={this.handleChangeax} /> Comilla </label>

                            <label id="design"><p> </p> <input type="radio" value="Cox's Bazar" name="Location" onChange={this.handleChangeax} /> Cox's Bazar </label>

                            <label id="design"><p> </p> <input type="radio" value="Feni" name="Location" onChange={this.handleChangeax} /> Feni </label>

                            <label id="design"><p> </p> <input type="radio" value="Khagrachhari" name="Location" onChange={this.handleChangeax} /> Khagrachhari </label>
                            <br />
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

                            <br />

                            <label id="design"><p> </p> <input type="radio" value="Kushtia" name="Location" onChange={this.handleChangeax} /> Kushtia </label>

                            <label id="design"><p> </p> <input type="radio" value="Magura" name="Location" onChange={this.handleChangeax} /> Magura </label>

                            <label id="design"><p> </p> <input type="radio" value="Meherpur" name="Location" onChange={this.handleChangeax} /> Meherpur </label>

                            <label id="design"><p> </p> <input type="radio" value="Narail" name="Location" onChange={this.handleChangeax} /> Narail </label>
                            <br />
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
                            <br></br>
                            <label id="design"><p> </p> <input type="radio" value="Lalmonirhat" name="Location" onChange={this.handleChangeax} /> Lalmonirhat </label>

                            <label id="design"><p> </p> <input type="radio" value="Nilphamari" name="Location" onChange={this.handleChangeax} /> Nilphamari </label>

                            <label id="design"><p> </p> <input type="radio" value="Panchagarh" name="Location" onChange={this.handleChangeax} /> Panchagarh </label>

                            <label id="design"><p> </p> <input type="radio" value="Thakurgaon" name="Location" onChange={this.handleChangeax} /> Thakurgaon </label>

                        </fieldset>

                    </form>
                </div>
                <div class="emptysky" id="intro3">
                    <div id="parentDivy">
                        {this.searchdonor()}
                    </div>
                </div>
            </div>
        );
    }
}
