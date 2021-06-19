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
export class activity extends Component {
    static displayName = activity.name;

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
            this.getcross();
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000);
    }
    getcross() {
        var uid = this.state.data;
        if (uid != "login") {
            var name = window.localStorage.getItem("iamadiscodanceryeyeye");
            firebase.database().ref("React/Likes").orderByKey().on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var postkey = childSnapshot.key;
                    firebase.database().ref("React/Likes/" + postkey).orderByKey().on("value", function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var checking_key = childSnapshot.val().uid;
                            var el = document.getElementById('lstat');
                            if (typeof (el) != 'undefined' && el != null) {
                                var elui = document.getElementById("l-header2");
                                elui.style.display = "none";
                                el.innerHTML = "";
                            }
                            if (uid === checking_key) {
                                firebase.database().ref("GlobalChat/").orderByKey().on("value", function (snapshot) {
                                    
                                    snapshot.forEach(function (childSnapshot) {
                                        var key = childSnapshot.key;
                                        var childData = childSnapshot.val();
                                        if (key === postkey) {
                                            var name_val = childSnapshot.val().user;
                                            var id_val = childSnapshot.val().message;
                                            var date = childSnapshot.val().date;
                                            var time = childSnapshot.val().time;
                                            var userid = childSnapshot.val().uid;

                                            var fix = date + " " + time;
                                            var x2 = document.createElement("div");
                                            x2.id = "mainx";
                                            var x1 = document.createElement("div");
                                            x1.setAttribute('class', 'stat');
                                            var x = document.createElement("div");
                                            x.setAttribute('class', 'namezed');
                                            x.onclick = function () {
                                                window.localStorage.setItem("comkey", key);
                                                window.location.href = "dpost";
                                            };
                                            var w = document.createElement("span");
                                            w.setAttribute('class', 'userst');
                                            w.appendChild(document.createTextNode(name_val));
                                            x.appendChild(w);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            var xop = document.createElement("span");
                                            xop.setAttribute('class', 'usersty');
                                            xop.appendChild(document.createTextNode(fix));
                                            x.appendChild(xop);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            var xo = document.createElement("span");
                                            xo.setAttribute('class', 'userstx');
                                            xo.appendChild(document.createTextNode(id_val));
                                            x.appendChild(xo);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            firebase.database().ref("PostImage/" + key).once("value", function (snapshot) {
                                                if (snapshot.exists()) {
                                                    console.log("hi");
                                                    console.log(key);
                                                    var url = snapshot.val().url;
                                                    window.localStorage.setItem("img-" + key, url);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);
                                                    var img = document.createElement('img');
                                                    img.src = url;
                                                    img.id = "imgt"
                                                    x.appendChild(img);
                                                    var d = document.createElement("br");
                                                    x1.appendChild(d);
                                                }
                                            });

                                            x1.appendChild(x);

                                            var x01 = document.createElement("div");
                                            x01.setAttribute('class', 'namezedx');
                                            var x0 = document.createElement("div");
                                            x0.id = "parentDivxxo";
                                            var dot = document.createElement("div");
                                            dot.setAttribute('class', 'comh');
                                            dot.appendChild(document.createTextNode("Comments"));
                                            x01.appendChild(dot);
                                            dot.style.display = "none";
                                            firebase.database().ref("comments/" + key).orderByKey().on("value", function (snapshot) {
                                                x0.innerHTML = "";

                                                snapshot.forEach(function (childSnapshot) {
                                                    dot.style.display = "block";
                                                    var key = childSnapshot.key;
                                                    var childData = childSnapshot.val();

                                                    var name_val = childSnapshot.val().user;
                                                    var id_val = childSnapshot.val().comment;
                                                    var date = childSnapshot.val().date;
                                                    var time = childSnapshot.val().time;

                                                    var fix = date + " " + time;

                                                    var x1 = document.createElement("div");
                                                    var x = document.createElement("div");
                                                    var w = document.createElement("span");
                                                    w.setAttribute('class', 'userst');
                                                    w.appendChild(document.createTextNode(name_val));
                                                    x.appendChild(w);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var xop = document.createElement("span");
                                                    xop.setAttribute('class', 'usersty');
                                                    xop.appendChild(document.createTextNode(fix));
                                                    x.appendChild(xop);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var xo = document.createElement("span");
                                                    xo.setAttribute('class', 'userstx');
                                                    xo.appendChild(document.createTextNode(id_val));
                                                    x.appendChild(xo);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var int = window.setInterval(function () {
                                                        if (typeof (x0) != 'undefined' && x0 != null) {
                                                            x0.scrollTop = x0.scrollHeight;
                                                        };
                                                    }, 500);

                                                    setTimeout(() => clearInterval(int), 550);
                                                    x1.appendChild(x);
                                                    var d = document.createElement("br");
                                                    x1.appendChild(d);

                                                    var d = document.createElement("hr");
                                                    x1.appendChild(d);
                                                    x0.appendChild(x1);
                                                });

                                            });

                                            x01.appendChild(x0);
                                            x1.appendChild(x01);
                                            var d = document.createElement("br");
                                            x.appendChild(d);
                                            var d = document.createElement("br");
                                            x.appendChild(d);
                                            x2.appendChild(x1);
                                            var dop = document.createElement("div");
                                            dop.setAttribute('class', 'inlineop');
                                            var doplike = document.createElement("div");
                                            doplike.setAttribute('class', 'blockop');
                                            var butlike = document.createElement("buton");
                                            butlike.setAttribute('class', 'fa fa-thumbs-up likebtn');
                                            butlike.onclick = function () {
                                                console.log("1+3");
                                                var d = new Date();
                                                var dateo = d.getDate();
                                                console.log(dateo);
                                                var month = d.getMonth() + 1;
                                                var year = d.getFullYear();

                                                var stamp = dateo + "/" + month + "/" + year;

                                                var hours = d.getHours();
                                                var minutes = d.getMinutes();
                                                var ampm = hours >= 12 ? 'pm' : 'am';
                                                hours = hours % 12;
                                                hours = hours ? hours : 12;
                                                minutes = minutes < 10 ? '0' + minutes : minutes;

                                                var time = hours + ":" + minutes + " " + ampm;
                                                var finaltime = time + " at " + stamp;
                                                var notification = name + " Liked your post";
                                                var f = "not found";
                                                firebase.database().ref("React/Likes/" + key).orderByKey().once("value").then(function (snapshot) {
                                                    snapshot.forEach(function (childSnapshot) {
                                                        var del = childSnapshot.key;
                                                        if (childSnapshot.val().uid == uid) {
                                                            firebase.database().ref("React/Likes/" + key + "/" + del).remove();
                                                            f = "found";
                                                        }

                                                    });

                                                }).then(success => {
                                                    if (f != "found") {
                                                        firebase.database().ref("React/Likes/" + key).push({
                                                            user: name,
                                                            uid: uid
                                                        }).then(success => {
                                                            firebase.database().ref("notification/" + userid).push({
                                                                notification: notification,
                                                                time: finaltime
                                                            }).then(success => {
                                                                firebase.database().ref("NOTIFY/" + userid).update({
                                                                    noti: "yes"
                                                                }).then(success => {
                                                                    console.log("Done sending NOTI");
                                                                    $(doplike).css('color', '#5C4CFA');
                                                                    f = "not found";
                                                                });
                                                            });
                                                        });
                                                    }
                                                });

                                            };

                                            var butlike2 = document.createElement("span");
                                            butlike2.setAttribute('class', 'likebtn2');
                                            doplike.appendChild(butlike);
                                            doplike.appendChild(butlike2);

                                            firebase.database().ref("React/Likes/" + key).orderByKey().on("value", function (snapshot) {
                                                var x = 0;
                                                snapshot.forEach(function (childSnapshot) {
                                                    x++;
                                                    if (childSnapshot.val().uid === uid) {
                                                        console.log("Hell yeah");
                                                        $(butlike).prop("disabled", true);
                                                        $(doplike).css('color', '#5C4CFA');
                                                    }

                                                });
                                                if (x == 0) {

                                                    $(doplike).css('color', '#808B96');
                                                }
                                                butlike2.innerHTML = x;
                                            });

                                            var dopmute = document.createElement("div");
                                            dopmute.setAttribute('class', 'blockop');
                                            var butlikex = document.createElement("buton");
                                            butlikex.setAttribute('class', 'fa fa-eye-slash likebtn');
                                            butlikex.onclick = function () {
                                                firebase.database().ref("React/Mute/" + key).push({
                                                    user: name,
                                                    uid: uid
                                                }).then((snap) => {
                                                }).then(success => {
                                                    $(dopmute).css('color', '#5C4CFA');

                                                    $(butlikex).prop("disabled", true);
                                                });
                                            };
                                            var butlike2x = document.createElement("span");
                                            butlike2x.setAttribute('class', 'likebtn2');
                                            dopmute.appendChild(butlikex);
                                            dopmute.appendChild(butlike2x);
                                            dop.appendChild(doplike);
                                            dop.appendChild(dopmute);

                                            firebase.database().ref("React/Mute/" + key).orderByKey().on("value", function (snapshot) {
                                                var x = 0;
                                                snapshot.forEach(function (childSnapshot) {
                                                    x++;
                                                    if (childSnapshot.val().uid === uid) {
                                                        console.log("Hell yeah");
                                                        $(butlikex).prop("disabled", true);
                                                        $(dopmute).css('color', '#5C4CFA');
                                                    }

                                                });
                                                if (x == 0) {

                                                    $(dopmute).css('color', '#808B96');
                                                }
                                                butlike2x.innerHTML = x;
                                            });

                                            x2.appendChild(dop);
                                            var d = document.createElement("br");
                                            x2.appendChild(d);
                                            var d = document.createElement("br");
                                            x2.appendChild(d);
                                            var com = document.createElement("textarea");
                                            com.id = 'textyt';
                                            com.placeholder = "Write comment";
                                            x2.appendChild(com);
                                            var but = document.createElement("button");
                                            but.setAttribute('class', 'fa fa-paper-plane btn btn-link');
                                            but.setAttribute('type', 'button');
                                            but.id = "hexa";
                                            but.innerHTML = "  Comment";

                                            but.onclick = function () {
                                                var name = window.localStorage.getItem("iamadiscodanceryeyeye");

                                                console.log(uid);
                                                if (uid != "login" && name != null && name != 'undefined') {
                                                    var elem = document.getElementById('text');
                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                        var comp = com.value;
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
                                                        var name = window.localStorage.getItem("iamadiscodanceryeyeye");
                                                        var time = hours + ":" + minutes + " " + ampm;
                                                        console.log(comp);
                                                        firebase.database().ref("comments/" + key).push({
                                                            date: stamp,
                                                            comment: comp,
                                                            time: time,
                                                            user: name
                                                        }).then(success => {
                                                            console.log("Shared");
                                                            window.localStorage.setItem("comkey", key);
                                                            com.value = "";
                                                        });
                                                    }
                                                } else {
                                                    window.location.href = "myacc";
                                                }
                                            };
                                            x2.appendChild(but);
                                            var d = document.createElement("hr");
                                            x2.appendChild(d);
                                            var d = document.createElement("hr");
                                            x2.appendChild(d);
                                            firebase.database().ref("React/Mute/" + key).orderByKey().on("value", function (snapshot) {
                                                snapshot.forEach(function (childSnapshot) {
                                                    if (childSnapshot.val().uid === uid) {
                                                        console.log("Hell yeah");
                                                        x2.style.display = "none";
                                                    }
                                                });
                                            });
                                            var el = document.getElementById('lstat');
                                            if (typeof (el) != 'undefined' && el != null) {
                                                var elui = document.getElementById("l-header2");
                                                elui.style.display = "block";
                                                el.appendChild(x2);
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            });
            firebase.database().ref("React/Mute").orderByKey().on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var postkey = childSnapshot.key;
                    firebase.database().ref("React/Mute/" + postkey).orderByKey().on("value", function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var checking_key = childSnapshot.val().uid;
                            var el = document.getElementById('mstat');
                            if (typeof (el) != 'undefined' && el != null) {
                                var elui = document.getElementById("l-header1");
                                elui.style.display = "none";
                                el.innerHTML = "";
                            }
                            if (uid === checking_key) {
                                firebase.database().ref("GlobalChat").orderByKey().on("value", function (snapshot) {
                                   
                                    snapshot.forEach(function (childSnapshot) {
                                        var key = childSnapshot.key;
                                        var childData = childSnapshot.val();
                                        if (key === postkey) {
                                            var name_val = childSnapshot.val().user;
                                            var id_val = childSnapshot.val().message;
                                            var date = childSnapshot.val().date;
                                            var time = childSnapshot.val().time;
                                            var userid = childSnapshot.val().uid;

                                            var fix = date + " " + time;
                                            var x2 = document.createElement("div");
                                            x2.id = "mainx";
                                            var x1 = document.createElement("div");
                                            x1.setAttribute('class', 'stat');
                                            var x = document.createElement("div");
                                            x.setAttribute('class', 'namezed');
                                            x.onclick = function () {
                                                window.localStorage.setItem("comkey", key);
                                                window.location.href = "dpost";
                                            };
                                            var w = document.createElement("span");
                                            w.setAttribute('class', 'userst');
                                            w.appendChild(document.createTextNode(name_val));
                                            x.appendChild(w);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            var xop = document.createElement("span");
                                            xop.setAttribute('class', 'usersty');
                                            xop.appendChild(document.createTextNode(fix));
                                            x.appendChild(xop);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            var xo = document.createElement("span");
                                            xo.setAttribute('class', 'userstx');
                                            xo.appendChild(document.createTextNode(id_val));
                                            x.appendChild(xo);
                                            var d = document.createElement("br");
                                            x.appendChild(d);

                                            firebase.database().ref("PostImage/" + key).once("value", function (snapshot) {
                                                if (snapshot.exists()) {
                                                    console.log("hi");
                                                    console.log(key);
                                                    var url = snapshot.val().url;
                                                    window.localStorage.setItem("img-" + key, url);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);
                                                    var img = document.createElement('img');
                                                    img.src = url;
                                                    img.id = "imgt"
                                                    x.appendChild(img);
                                                    var d = document.createElement("br");
                                                    x1.appendChild(d);
                                                }
                                            });

                                            x1.appendChild(x);

                                            var x01 = document.createElement("div");
                                            x01.setAttribute('class', 'namezedx');
                                            var x0 = document.createElement("div");
                                            x0.id = "parentDivxxo";
                                            var dot = document.createElement("div");
                                            dot.setAttribute('class', 'comh');
                                            dot.appendChild(document.createTextNode("Comments"));
                                            x01.appendChild(dot);
                                            dot.style.display = "none";
                                            firebase.database().ref("comments/" + key).orderByKey().on("value", function (snapshot) {
                                                x0.innerHTML = "";

                                                snapshot.forEach(function (childSnapshot) {
                                                    dot.style.display = "block";
                                                    var key = childSnapshot.key;
                                                    var childData = childSnapshot.val();

                                                    var name_val = childSnapshot.val().user;
                                                    var id_val = childSnapshot.val().comment;
                                                    var date = childSnapshot.val().date;
                                                    var time = childSnapshot.val().time;

                                                    var fix = date + " " + time;

                                                    var x1 = document.createElement("div");
                                                    var x = document.createElement("div");
                                                    var w = document.createElement("span");
                                                    w.setAttribute('class', 'userst');
                                                    w.appendChild(document.createTextNode(name_val));
                                                    x.appendChild(w);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var xop = document.createElement("span");
                                                    xop.setAttribute('class', 'usersty');
                                                    xop.appendChild(document.createTextNode(fix));
                                                    x.appendChild(xop);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var xo = document.createElement("span");
                                                    xo.setAttribute('class', 'userstx');
                                                    xo.appendChild(document.createTextNode(id_val));
                                                    x.appendChild(xo);
                                                    var d = document.createElement("br");
                                                    x.appendChild(d);

                                                    var int = window.setInterval(function () {
                                                        if (typeof (x0) != 'undefined' && x0 != null) {
                                                            x0.scrollTop = x0.scrollHeight;
                                                        };
                                                    }, 500);

                                                    setTimeout(() => clearInterval(int), 550);
                                                    x1.appendChild(x);
                                                    var d = document.createElement("br");
                                                    x1.appendChild(d);

                                                    var d = document.createElement("hr");
                                                    x1.appendChild(d);
                                                    x0.appendChild(x1);
                                                });

                                            });

                                            x01.appendChild(x0);
                                            x1.appendChild(x01);
                                            var d = document.createElement("br");
                                            x.appendChild(d);
                                            var d = document.createElement("br");
                                            x.appendChild(d);
                                            x2.appendChild(x1);
                                            var dop = document.createElement("div");
                                            dop.setAttribute('class', 'inlineop');
                                            var doplike = document.createElement("div");
                                            doplike.setAttribute('class', 'blockop');
                                            var butlike = document.createElement("buton");
                                            butlike.setAttribute('class', 'fa fa-thumbs-up likebtn');
                                            butlike.onclick = function () {
                                                console.log("1+3");
                                                var d = new Date();
                                                var dateo = d.getDate();
                                                console.log(dateo);
                                                var month = d.getMonth() + 1;
                                                var year = d.getFullYear();

                                                var stamp = dateo + "/" + month + "/" + year;

                                                var hours = d.getHours();
                                                var minutes = d.getMinutes();
                                                var ampm = hours >= 12 ? 'pm' : 'am';
                                                hours = hours % 12;
                                                hours = hours ? hours : 12;
                                                minutes = minutes < 10 ? '0' + minutes : minutes;

                                                var time = hours + ":" + minutes + " " + ampm;
                                                var finaltime = time + " at " + stamp;
                                                var notification = name + " Liked your post";
                                                var f = "not found";
                                                firebase.database().ref("React/Likes/" + key).orderByKey().once("value").then(function (snapshot) {
                                                    snapshot.forEach(function (childSnapshot) {
                                                        var del = childSnapshot.key;
                                                        if (childSnapshot.val().uid == uid) {
                                                            firebase.database().ref("React/Likes/" + key + "/" + del).remove();
                                                            f = "found";
                                                        }

                                                    });

                                                }).then(success => {
                                                    if (f != "found") {
                                                        firebase.database().ref("React/Likes/" + key).push({
                                                            user: name,
                                                            uid: uid
                                                        }).then(success => {
                                                            firebase.database().ref("notification/" + userid).push({
                                                                notification: notification,
                                                                time: finaltime
                                                            }).then(success => {
                                                                firebase.database().ref("NOTIFY/" + userid).update({
                                                                    noti: "yes"
                                                                }).then(success => {
                                                                    console.log("Done sending NOTI");
                                                                    $(doplike).css('color', '#5C4CFA');
                                                                    f = "not found";
                                                                });
                                                            });
                                                        });
                                                    }
                                                });

                                            };

                                            var butlike2 = document.createElement("span");
                                            butlike2.setAttribute('class', 'likebtn2');
                                            doplike.appendChild(butlike);
                                            doplike.appendChild(butlike2);

                                            firebase.database().ref("React/Likes/" + key).orderByKey().on("value", function (snapshot) {
                                                var x = 0;
                                                snapshot.forEach(function (childSnapshot) {
                                                    x++;
                                                    if (childSnapshot.val().uid === uid) {
                                                        console.log("Hell yeah");
                                                        $(butlike).prop("disabled", true);
                                                        $(doplike).css('color', '#5C4CFA');
                                                    }

                                                });
                                                if (x == 0) {

                                                    $(doplike).css('color', '#808B96');
                                                }
                                                butlike2.innerHTML = x;
                                            });

                                            var dopmute = document.createElement("div");
                                            dopmute.setAttribute('class', 'blockop');
                                            var butlikex = document.createElement("buton");
                                            butlikex.setAttribute('class', 'fa fa-eye-slash likebtn');
                                            butlikex.onclick = function () {
                                                var f = "not found";
                                                firebase.database().ref("React/Mute/" + key).orderByKey().once("value").then(function (snapshot) {
                                                    snapshot.forEach(function (childSnapshot) {
                                                        var del = childSnapshot.key;
                                                        if (childSnapshot.val().uid == uid) {
                                                            firebase.database().ref("React/Mute/" + key + "/" + del).remove();
                                                            f = "found";
                                                        }

                                                    });

                                                }).then(success => {
                                                    if (f != "found") {
                                                        firebase.database().ref("React/Mute/" + key).push({
                                                            user: name,
                                                            uid: uid
                                                        }).then(success => {
                                                            console.log("Done sending NOTI");
                                                            $(doplike).css('color', '#5C4CFA');
                                                            f = "not found";
                                                        });

                                                    }
                                                });
                                            };
                                            var butlike2x = document.createElement("span");
                                            butlike2x.setAttribute('class', 'likebtn2');
                                            dopmute.appendChild(butlikex);
                                            dopmute.appendChild(butlike2x);
                                            dop.appendChild(doplike);
                                            dop.appendChild(dopmute);

                                            firebase.database().ref("React/Mute/" + key).orderByKey().on("value", function (snapshot) {
                                                var x = 0;
                                                snapshot.forEach(function (childSnapshot) {
                                                    x++;
                                                    if (childSnapshot.val().uid === uid) {
                                                        console.log("Hell yeah");
                                                        $(butlikex).prop("disabled", true);
                                                        $(dopmute).css('color', '#5C4CFA');
                                                    }

                                                });
                                                if (x == 0) {

                                                    $(dopmute).css('color', '#808B96');
                                                }
                                                butlike2x.innerHTML = x;
                                            });

                                            x2.appendChild(dop);
                                            var d = document.createElement("br");
                                            x2.appendChild(d);
                                            var d = document.createElement("br");
                                            x2.appendChild(d);
                                            var com = document.createElement("textarea");
                                            com.id = 'textyt';
                                            com.placeholder = "Write comment";
                                            x2.appendChild(com);
                                            var but = document.createElement("button");
                                            but.setAttribute('class', 'fa fa-paper-plane btn btn-link');
                                            but.setAttribute('type', 'button');
                                            but.id = "hexa";
                                            but.innerHTML = "  Comment";

                                            but.onclick = function () {
                                                var name = window.localStorage.getItem("iamadiscodanceryeyeye");

                                                console.log(uid);
                                                if (uid != "login" && name != null && name != 'undefined') {
                                                    var elem = document.getElementById('text');
                                                    if (typeof (elem) != 'undefined' && elem != null) {
                                                        var comp = com.value;
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
                                                        var name = window.localStorage.getItem("iamadiscodanceryeyeye");
                                                        var time = hours + ":" + minutes + " " + ampm;
                                                        console.log(comp);
                                                        firebase.database().ref("comments/" + key).push({
                                                            date: stamp,
                                                            comment: comp,
                                                            time: time,
                                                            user: name
                                                        }).then(success => {
                                                            console.log("Shared");
                                                            window.localStorage.setItem("comkey", key);
                                                            com.value = "";
                                                        });
                                                    }
                                                } else {
                                                    window.location.href = "myacc";
                                                }
                                            };
                                            x2.appendChild(but);
                                            var d = document.createElement("br");
                                            x2.appendChild(d);
                                            var d = document.createElement("hr");
                                            x2.appendChild(d);
                                            var el = document.getElementById('mstat');
                                            if (typeof (el) != 'undefined' && el != null) {
                                                var elui = document.getElementById("l-header1");
                                                elui.style.display = "block";
                                                el.appendChild(x2);
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            });
        }
    }
    render() {
        if (this.state.data === "login") {
            window.location.href = "myacc";
        }
        return (
            <div>

                <div>
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
                    <main id="x-hold">
                        <span id="l-header1">Muted status(s)</span>
                        <br></br>
                        <div id="mstat"></div>
                        <br></br>
                        <span id="l-header2">Liked status(s)</span>
                        <br></br>
                        <div id="lstat"></div>
                    </main>
                </div>
            </div>
        );
    }
}