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

var myname = null;
var hisname = null;

export class Chat extends Component {
    static displayName = Chat.name;

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
        window.localStorage.setItem("Index", "5");
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });
            this.gethisname();
            this.getmyname();
            this.getmessages();
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
                if (snapshot.hasChild("chat")) {
                    firebase.database().ref("NOTIFY/" + uid).update({
                        chat: "no"
                    }).then(success => {
                        console.log("Finished sending");
                    });
                }
            } else {
                firebase.database().ref("NOTIFY/" + uid).update({
                    chat: "no"
                }).then(success => {
                    console.log("Finished sending");
                });
            }
        });
        var useridabc = window.localStorage.getItem("chatwith");
        var imgh = document.getElementById("hasnameimg1");
        if (typeof (imgh) != 'undefined' && imgh != null) {
            firebase.database().ref("dp/" + useridabc).orderByKey().once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    var url = snapshot.val().url;
                    imgh.src = url;
                } else {
                    firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                        var url = snapshot.val().url;
                        imgh.src = url;
                    });
                }
            });
        }
    }
    nothing() {

    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000);
    }
    gethisname() {
        hisname = window.localStorage.getItem("chatname");
        document.getElementById("hisnamez").innerHTML = hisname;
        console.log(hisname);
    }
    getmyname() {
        myname = window.localStorage.getItem("iamadiscodanceryeyeye");
        console.log(myname);
    }
    backx() {
        var elem = document.getElementById('list-msg');
        if (typeof (elem) != 'undefined' && elem != null) {
            elem.style.display = 'block';
            document.getElementById("hi-msg").style.display = 'none';
        }
    }

    getList() {
        $(window).resize(function () {

            var elem = document.getElementById('pardo');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    $("#list-msg").css("display", "block");
                    $("#hi-msg").css("display", "block");
                } else {
                    $("#list-msg").css("display", "block");
                    $("#hi-msg").css("display", "none");
                }
            };

        });
        var init = "0";
        var uid = this.state.data;
        if (uid != "login") {
            firebase.database().ref("Chat/" + uid).orderByKey().on("value", function (snapshot) {
                var elem = document.getElementById('parentDivx21');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById('parentDivx21').innerHTML = "";
                }
                snapshot.forEach(function (childSnapshot) {
                    console.log("doing this");
                    init = "No 0";
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();

                    var name_val = childSnapshot.val().name;
                    var id_val = childSnapshot.val().lastmsg;
                    var id_val1 = childSnapshot.val().lastsender;
                    var date = childSnapshot.val().date;
                    var userid = childSnapshot.val().uid;

                    var fix = date;

                    var x1 = document.createElement("div");
                    var w = document.createElement("button");
                    w.setAttribute('class', 'userst1');
                    w.onclick = function () {
                        window.localStorage.setItem("chatwith", key);
                        window.localStorage.setItem("chatname", name_val);
                        var useridabc = window.localStorage.getItem("chatwith");
                        var imgh = document.getElementById("hasnameimg1");
                        if (typeof (imgh) != 'undefined' && imgh != null) {
                            imgh.src = "";
                            firebase.database().ref("dp/" + useridabc).orderByKey().once("value").then(function (snapshot) {
                                if (snapshot.exists()) {
                                    var url = snapshot.val().url;
                                    imgh.src = url;
                                } else {
                                    firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                                        var url = snapshot.val().url;
                                        imgh.src = url;
                                    });
                                }
                            });
                        }
                        if ($(window).width() < 1650) {
                            $("#list-msg").css("display", "none");
                            $("#hi-msg").css("display", "block");
                            var elem = document.getElementById('pardo');
                            if (typeof (elem) != 'undefined' && elem != null) {
                                var uid1 = uid;
                                var uid2 = window.localStorage.getItem("chatwith");
                                hisname = window.localStorage.getItem("chatname");
                                document.getElementById("hisnamez").innerHTML = hisname;
                                var uidx = uid1 + "-" + uid2;
                                console.log(uidx);
                                firebase.database().ref("messages").child(uidx).orderByKey().on("value", function (snapshot) {
                                    var elem = document.getElementById('pardo');
                                    if (typeof (elem) != 'undefined' && elem != null) {
                                        document.getElementById('pardo').innerHTML = "";
                                    }
                                    snapshot.forEach(function (childSnapshot) {

                                        var key = childSnapshot.key;
                                        var childData = childSnapshot.val();

                                        var name_val = childSnapshot.val().user;
                                        var date = childSnapshot.val().date;
                                        var time = childSnapshot.val().time;
                                        var message = childSnapshot.val().message;
                                        console.log(message);
                                        var int = window.setInterval(function () {
                                            var elem = document.getElementById('pardo');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                elem.scrollTop = elem.scrollHeight;
                                            };
                                        }, 500);

                                        setTimeout(() => clearInterval(int), 550);

                                        const div = document.createElement('div');
                                        div.className = 'row';
                                        console.log(hisname + " " + myname);
                                        if (name_val === hisname && uid1 != uid2) {
                                            div.innerHTML = `
                            <div class="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle" />
                                <div class="media-body ml-3" styles = "overflow: hidden;">
                                    <div class="bg-light rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-muted" id="msg1">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                        `;
                                            var elem = document.getElementById('pard');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById('pard').appendChild(div);
                                            }
                                            console.log("adding x");
                                        } else {
                                            div.innerHTML = `
                            <div class="media w-50 ml-auto mb-3">
                                <div class="media-body">
                                    <div class="bg-primary rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-white" id="msg2">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                         `;
                                            var elem = document.getElementById('pardo');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById('pardo').appendChild(div);
                                            }
                                            console.log("adding x");
                                        }
                                    });
                                });
                                return (
                                    <div class="px-4 py-5 chat-box bg-white" id="pardo">

                                    </div>
                                );
                            }
                        } else {
                            var elem = document.getElementById('pardo');
                            if (typeof (elem) != 'undefined' && elem != null) {
                                var uid1 = uid;
                                var uid2 = window.localStorage.getItem("chatwith");
                                hisname = window.localStorage.getItem("chatname");
                                document.getElementById("hisnamez").innerHTML = hisname;
                                var uidx = uid1 + "-" + uid2;
                                console.log(uidx);
                                firebase.database().ref("messages").child(uidx).orderByKey().on("value", function (snapshot) {
                                    var elem = document.getElementById('pardo');
                                    if (typeof (elem) != 'undefined' && elem != null) {
                                        document.getElementById('pardo').innerHTML = "";
                                    }
                                    snapshot.forEach(function (childSnapshot) {

                                        var key = childSnapshot.key;
                                        var childData = childSnapshot.val();

                                        var name_val = childSnapshot.val().user;
                                        var date = childSnapshot.val().date;
                                        var time = childSnapshot.val().time;
                                        var message = childSnapshot.val().message;
                                        console.log(message);
                                        var int = window.setInterval(function () {
                                            var elem = document.getElementById('pardo');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                elem.scrollTop = elem.scrollHeight;
                                            };
                                        }, 500);

                                        setTimeout(() => clearInterval(int), 550);

                                        const div = document.createElement('div');
                                        div.className = 'row';
                                        console.log(hisname + " " + myname);
                                        if (name_val === hisname && uid1 != uid2) {
                                            div.innerHTML = `
                            <div class="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle" />
                                <div class="media-body ml-3" styles = "overflow: hidden;">
                                    <div class="bg-light rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-muted" id="msg1">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                        `;
                                            var elem = document.getElementById('pard');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById('pard').appendChild(div);
                                            }
                                            console.log("adding x");
                                        } else {
                                            div.innerHTML = `
                            <div class="media w-50 ml-auto mb-3">
                                <div class="media-body">
                                    <div class="bg-primary rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-white" id="msg2">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                         `;
                                            var elem = document.getElementById('pardo');
                                            if (typeof (elem) != 'undefined' && elem != null) {
                                                document.getElementById('pardo').appendChild(div);
                                            }
                                            console.log("adding x");
                                        }
                                    });
                                });
                                return (
                                    <div class="px-4 py-5 chat-box bg-white" id="pardo">

                                    </div>
                                );
                            }
                        }
                    };
                    w.appendChild(document.createTextNode(name_val));
                    x1.appendChild(w);
                    var d = document.createElement("br");
                    x1.appendChild(d);

                    var xop = document.createElement("span");
                    xop.setAttribute('class', 'usersty1');
                    xop.appendChild(document.createTextNode(fix));
                    x1.appendChild(xop);
                    var d = document.createElement("br");
                    x1.appendChild(d);

                    var xo = document.createElement("span");
                    xo.setAttribute('class', 'userstx1x');
                    xo.appendChild(document.createTextNode(id_val1 + " : " + id_val));
                    x1.appendChild(xo);
                    var xfz = document.createElement("div");
                    xfz.id = "lol1x1y";
                    var xg = document.createElement("div");
                    xg.id = "lol";
                    var img = document.createElement('img');
                    img.id = "imgtu"
                    firebase.database().ref("dp/" + userid).orderByKey().once("value").then(function (snapshot) {
                        if (snapshot.exists()) {
                            var url = snapshot.val().url;
                            img.src = url;
                            xg.appendChild(img);
                        } else {
                            firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                                var url = snapshot.val().url;
                                img.src = url;
                                xg.appendChild(img);
                            });
                        }
                    });
                    var xf = document.createElement("div");
                    xf.id = "lol3";
                    xf.appendChild(x1);
                    xfz.appendChild(xg);
                    xfz.appendChild(xf);
                    document.getElementById('parentDivx21').appendChild(xfz);
                });
            });
            return (
                <div id="parentDivx21">

                </div>
            );
        } else {
            window.location.href = "myacc";
        }
    }
    sentnow() {
        var name;
        var message = document.getElementById("textyx").value;
        console.log("text : " + message);
        if (this.state.data != "login") {
            var uid1 = this.state.data;
            var uid2 = window.localStorage.getItem("chatwith");

            var uidx = uid1 + "-" + uid2;
            var uidy = uid2 + "-" + uid1;

            var d = new Date();
            var dateo = d.getDate();
            console.log(dateo);
            var month = d.getMonth() + 1;
            console.log(month);
            var year = d.getFullYear();
            console.log(year);

            var stamp = dateo + "/" + month + "/" + year;

            console.log(stamp);

            var hours = d.getHours();
            var minutes = d.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            var time = hours + ":" + minutes + " " + ampm;
            var notification = myname + " sent a message";
            var finaltime = time + " at " + stamp;

            if (uid1 != null && uid2 != null) {
                firebase.database().ref("messages/" + uidx).push({
                    date: stamp,
                    message: message,
                    time: time,
                    user: myname
                }).then(success => {
                    console.log("Done sending");
                    firebase.database().ref("messages/" + uidy).push({
                        date: stamp,
                        message: message,
                        time: time,
                        user: myname
                    }).then(success => {
                        console.log("Done sending");
                        firebase.database().ref("notification/" + uid2).push({
                            notification: notification,
                            message: message,
                            time: finaltime
                        }).then(success => {
                            console.log("Done sending");
                            firebase.database().ref("Chat/" + uid1 + "/" + uid2).set({
                                date: stamp,
                                lastmsg: message,
                                time: time,
                                uid: uid2,
                                name: hisname,
                                lastsender: myname
                            }).then(success => {
                                console.log("Done sending");
                                firebase.database().ref("Chat/" + uid2 + "/" + uid1).set({
                                    date: stamp,
                                    lastmsg: message,
                                    time: time,
                                    uid: uid1,
                                    name: myname,
                                    lastsender: myname
                                }).then(success => {
                                    firebase.database().ref("NOTIFY/" + uid2).update({
                                        noti: "yes"
                                    }).then(success => {
                                        firebase.database().ref("NOTIFY/" + uid2).update({
                                            chat: "yes"
                                        }).then(success => {
                                            document.getElementById("textyx").value = "";
                                            console.log("Finished sending");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        } else {
            window.location.href = "myacc";
        }
    }
    getmessages() {
        if (this.state.data != "login" && hisname != null) {
            var uid1 = this.state.data;
            var uid2 = window.localStorage.getItem("chatwith");

            var uidx = uid1 + "-" + uid2;
            console.log(uidx);
            firebase.database().ref("messages").child(uidx).orderByKey().on("value", function (snapshot) {
                var elem = document.getElementById('pardo');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById('pardo').innerHTML = "";
                }
                snapshot.forEach(function (childSnapshot) {

                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();

                    var name_val = childSnapshot.val().user;
                    var date = childSnapshot.val().date;
                    var time = childSnapshot.val().time;
                    var message = childSnapshot.val().message;
                    console.log(message);
                    var int = window.setInterval(function () {
                            var elem = document.getElementById('pardo');
                            if (typeof (elem) != 'undefined' && elem != null) {
                                elem.scrollTop = elem.scrollHeight;
                            };
                    }, 500);

                    setTimeout(() => clearInterval(int), 550);

                    const div = document.createElement('div');
                    div.className = 'row';
                    console.log(hisname + " " + myname);
                    if (name_val === hisname && uid1 != uid2) {
                        div.innerHTML = `
                            <div class="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle" />
                                <div class="media-body ml-3" styles = "overflow: hidden;">
                                    <div class="bg-light rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-muted" id="msg1">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                        `;
                        var elem = document.getElementById('pard');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            document.getElementById('pard').appendChild(div);
                        }
                        console.log("adding x");
                    } else {
                        div.innerHTML = `
                            <div class="media w-50 ml-auto mb-3">
                                <div class="media-body">
                                    <div class="bg-primary rounded py-2 px-3 mb-2">
                                        <p class="text-small mb-0 text-white" id="msg2">` + message + `</p>
                                    </div>
                                    <p class="small text-muted">` + time + ` | ` + date + `</p>
                                </div>
                            </div>
                         `;
                        var elem = document.getElementById('pardo');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            document.getElementById('pardo').appendChild(div);
                        }
                        console.log("adding x");
                    }
                });
            });
            return (
                <div class="px-4 py-5 chat-box bg-white" id="pardo">

                </div>
            );
        } else {
            window.location.href = "myacc";
        }
    }
    render() {
        if (this.state.data === "login") {
                window.location.href = "myacc";
        }

        return (

            <div class="container py-5 px-4 fullwin">
                <div class="huix">
                    <ScaleLoader
                        css={override}
                        size={30}
                        color={"#3D94F6"}
                        loading={this.state.loading}
                    />
                </div>
                <div class="row rounded-lg overflow-hidden shadow ">

                    <div class="col-5 px-0 fulwin" id = "list-msg">
                        <div class="bg-white">
                            <div class="bg-gray px-4 py-2 bg-lightinline">
                                <div class="block">
                                    <p class="h5 mb-0 py-1">Recent</p>
                                </div>

                                <div class="eit block">
                                    <button type="button" class="btn btn-exit btn-block xo" onClick={() => this.getList()}><span class="fa fa-refresh"></span></button>
                                </div>
                            </div>

                            <div class="messages-box">
                                <div class="list-group rounded-0 messages-box" id="okey">
                                    {this.getList()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-7 px-0" id = "hi-msg">
                        <div class="bg-gray px-4 py-2 bg-lightinline">
                            <div class="block" id = "back-btn">
                                <button id="button-addon21" type="button" class="btn btn-link" onClick={() => this.backx()}> <i class="fa fa-arrow-left"></i></button>
                            </div>
                            <div class="block">
                                <div id="lol1x1z">
                                    <div id="lolly">
                                        <img id="hasnameimg1"></img>
                                    </div>
                                    <div id="lolly3">
                                        <p id="hisnamez" ></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-5 chat-box bg-white" id="pardo">
                            <div></div>
                        </div>


                        <form class="bg-light">
                            <div class="input-group colo">
                                <textarea placeholder="Write a message" id="textyx" name="text" rows="2" styles="overflow: hidden; word-wrap: break-word; height: 50px;"></textarea>
                                <div class="input-group-append">
                                    <button id="button-addon2" type="button" class="btn btn-link" onClick={() => this.sentnow()}> <i class="fa fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
