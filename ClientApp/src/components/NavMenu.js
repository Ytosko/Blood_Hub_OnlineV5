import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, CardLink } from 'reactstrap';
import './NavMenu.css';
import './style.css';
import './Login.css';
import $ from 'jquery';
import jQuery from 'jquery'
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import moment from 'react-moment'
import SyncLoader from "react-spinners/SyncLoader";
import ReactLoading from 'react-loading'
import { css } from "@emotion/core";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

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
var hisname, myname;

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


var x, uidfor;
export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        const $ = window.$;
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            data: null
        };
        this.state = {
            popoverOpen1: false,
            popoverOpen2: false,
            popoverOpen3: false,
            popoverOpen4: false,
            popoverOpen5: false,
            popoverOpen6: false
        };
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });
            uidfor = this.state.data;
            this.gethisname();
            this.getmyname();
            this.getStatusxc();
        });
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : window.localStorage.setItem("iamadiscodanceryeyeye", "Not signed in");
        });
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.show()
                : this.noshow();
        });
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.nowimg()
                : this.noimg();
        });
    }
    nowimg() {
        var useridabc = window.localStorage.getItem("chatwith");
        var imgh = document.getElementById("hasnameimg");
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
    noimg() {

    }
    show() {
        console.log("Showing");
        document.getElementById("mySidenav").style.display = "block";
        document.getElementById("ha5").style.display = "inline-block";
        document.getElementById("ha4").style.display = "inline-block";
        document.getElementById("ha2").style.display = "inline-block";
        document.getElementById("mySidenavab").style.display = "block";
        if ($(window).width() > 1650) {
            document.getElementById("hadtoshowf").style.display = "grid";
        } else {
            document.getElementById("hadtoshowm").style.display = "block";
        }
    }
    noshow() {
        console.log("Not Showing");
        document.getElementById("mySidenav").style.display = "none";
        document.getElementById("ha5").style.display = "none";
        document.getElementById("ha4").style.display = "none";
        document.getElementById("ha2").style.display = "none";
        document.getElementById("mySidenavab").style.display = "none";
        document.getElementById("hadtoshowf").style.display = "none";
        document.getElementById("hadtoshowm").style.display = "none";
        $(window).resize(function () {
            if ($(window).width() > 1650) {
                console.log($(window).width());
                document.getElementById("hadtoshowf").style.display = "none";
            } else if ($(window).width() < 1650) {
                document.getElementById("hadtoshowm").style.display = "none";
            }

        });
    }
    componentDidMount() {

        setInterval(function () {
            var elem = document.getElementById('yu');
            if (typeof (elem) != 'undefined' && elem != null) {
                var but = document.getElementById("yu");
                var name = window.localStorage.getItem("iamadiscodanceryeyeye");
                var outer = 4;
                var borderString;
                if (name == "Not signed in") {
                    borderString = outer + 'px solid #ff4000';
                } else {
                    borderString = outer + 'px solid #1abc9c';
                }

                $("#yu").css("border-bottom", borderString);
                but.innerHTML = name;
                but.onclick = function () {
                    window.location.href = "myacc";
                };
            }
            x = window.localStorage.getItem("Index");
            console.log("Index : " + x);
            var elem = document.getElementById(x);
            if (typeof (elem) != 'undefined' && elem != null) {
                var a = document.getElementById("1");
                var b = document.getElementById("2");
                var c = document.getElementById("3");
                var d = document.getElementById("4");
                var f = document.getElementById("6");
                $(a).css("font-weight", "normal");
                $(b).css("font-weight", "normal");
                $(c).css("font-weight", "normal");
                $(d).css("font-weight", "normal");
                $(f).css("font-weight", "normal");
                $(a).css("font-size", "20pt");
                $(b).css("font-size", "20pt");
                $(c).css("font-size", "20pt");
                $(d).css("font-size", "20pt");
                $(f).css("font-size", "20pt");

                $(elem).css("font-weight", "Bold");
                $(elem).css("padding-bottom", "6pt");
                $(elem).css("border-bottom", "3px solid #3F51B5");
                $(elem).css("font-size", "30pt");
                $(elem).css("color", "#3F51B5");
                console.log("Done bolding");
                console.log("Onning on " + uidfor);
                firebase.database().ref("NOTIFY/" + uidfor).orderByKey().once("value").then(function (snapshot) {
                    if (snapshot.exists()) {
                        if (snapshot.hasChild("chat")) {
                            var xj = snapshot.val().chat;
                            if (xj == "yes") {
                                $("div[id^='chatx']").css('display', 'inline-block');
                                console.log("Onning chat");
                            } else {
                                $("div[id^='chatx']").css('display', 'none');
                                console.log("Onning chat");
                            }
                        } else {
                            $("div[id^='chatx']").css('display', 'none');
                            console.log("Onning chat");
                        }
                        if (snapshot.hasChild("noti")) {
                            var xj = snapshot.val().noti;
                            if (xj == "yes") {
                                $("div[id^='notix']").css('display', 'inline-block');
                                console.log("Onning noti");
                            } else {
                                $("div[id^='notix']").css('display', 'none');
                                console.log("Onning noti");
                            }
                        } else {
                            $("div[id^='notix']").css('display', 'none');
                            console.log("Onning noti");
                        }
                    }
                });
            }
        }, 500);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    CheckNav() {
        var elem = document.getElementById('mySidenavab');
        if (typeof (elem) != 'undefined' && elem != null) {
            if (document.getElementById("mySidenavab").style.width == "250px") {

                document.getElementById("mySidenavab").style.width = "0";

            } else {
                document.getElementById("mySidenavab").style.width = "250px";
            }
        }
    }
    getStatusxc() {
        console.log("Calling");
    }
    openNavik() {
        document.getElementById("mySidenav").style.width = "250px";
        if ($(window).width() > 1650) {
            document.getElementById("hadtoshowf").style.display = "none";
            document.getElementById("hadtoshowm").style.display = "none";
        } else {
            document.getElementById("hadtoshowf").style.display = "none";
            document.getElementById("hadtoshowm").style.display = "none";
        }
    }

    closeNavik() {
        document.getElementById("mySidenav").style.width = "0";
        if ($(window).width() > 1650) {
            document.getElementById("hadtoshowf").style.display = "grid";
            document.getElementById("hadtoshowm").style.display = "none";
        } else {
            document.getElementById("hadtoshowf").style.display = "none";
            document.getElementById("hadtoshowm").style.display = "block";
        }
    }
    gethisname() {
        hisname = window.localStorage.getItem("chatname");
        console.log(hisname);
    }
    getmyname() {
        myname = window.localStorage.getItem("iamadiscodanceryeyeye");
        console.log(myname);
    }
    sentnow() {
        var name;
        var message = document.getElementById("texty").value;
        console.log("text : " + message);
        if (this.state.data != "login") {
            document.getElementById("texty").value = "";
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
    getList() {
        var init = "0";
        var uid = this.state.data;
        if (uid != "login") {
            firebase.database().ref("Chat/" + uid).orderByKey().on("value", function (snapshot) {
                var elem = document.getElementById('parentDivx');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById('parentDivx').innerHTML = "";
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
                    var d1 = document.createElement("div");
                    var w = document.createElement("button");
                    w.id = "prospects_form";
                    w.setAttribute('class', 'userst1');
                    w.onclick = function () {
                        window.localStorage.setItem("chatwith", key);
                        window.localStorage.setItem("chatname", name_val);
                        var useridabc = window.localStorage.getItem("chatwith");
                        var imgh = document.getElementById("hasnameimg");
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
                        var elem = document.getElementById('list');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            elem.style.display = 'none';
                            document.getElementById("msg").style.display = 'block';
                        }
                        var elem = document.getElementById('pard');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            var uid1 = uid;
                            var uid2 = window.localStorage.getItem("chatwith");
                            hisname = window.localStorage.getItem("chatname");
                            document.getElementById("hisname").innerHTML = hisname;
                            var uidx = uid1 + "-" + uid2;
                            console.log(uidx);
                            firebase.database().ref("messages").child(uidx).orderByKey().on("value", function (snapshot) {
                                var elem = document.getElementById('pard');
                                if (typeof (elem) != 'undefined' && elem != null) {
                                    document.getElementById('pard').innerHTML = "";
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
                                        var elem = document.getElementById('pard');
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
                                        var elem = document.getElementById('pard');
                                        if (typeof (elem) != 'undefined' && elem != null) {
                                            document.getElementById('pard').appendChild(div);
                                        }
                                        console.log("adding x");
                                    }
                                });
                            });
                            return (
                                <div class="px-4 py-5 chat-box2 bg-white full" id="pard">

                                </div>
                            );
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
                    xo.appendChild(document.createTextNode(id_val));
                    x1.appendChild(xo);
                    var d = document.createElement("br");
                    x1.appendChild(d);
                    var xfz = document.createElement("div");
                    xfz.id = "lol1x1";
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
                    var elem = document.getElementById('parentDivx');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        elem.appendChild(xfz);
                    }
                });
            });
            return (
                <div id="parentDivx">

                </div>
            );
        }
    }

    back() {
        var elem = document.getElementById('list');
        if (typeof (elem) != 'undefined' && elem != null) {
            elem.style.display = 'block';
            document.getElementById("msg").style.display = 'none';
        }
    }
    CheckNavik() {
        firebase.database().ref("NOTIFY/" + uidfor).orderByKey().on("value", function (snapshot) {
            if (snapshot.exists()) {
                if (snapshot.hasChild("chat")) {
                    firebase.database().ref("NOTIFY/" + uidfor).update({
                        chat: "no"
                    }).then(success => {
                        var e = document.getElementById("5");
                        var elem = document.getElementById('mySidenav');
                        if (typeof (elem) != 'undefined' && elem != null) {
                            if (document.getElementById("mySidenav").style.width == "250px") {
                                $(e).css("font-size", "20pt");
                                $(e).css("color", "#000");
                                document.getElementById("mySidenav").style.width = "0";

                            } else {
                                $(e).css("font-size", "30pt");
                                $(e).css("color", "#3F51B5");
                                document.getElementById("mySidenav").style.width = "250px";
                            }
                        }
                    });
                }
            }
        });
    }
    closeNav() {
        document.getElementById("mySidenavab").style.width = "0";

    }
    onHover1 = () => {
        this.setState({
            popoverOpen1: true,
        })
    }

    onHoverLeave1 = () => {
        this.setState({
            popoverOpen1: false,
        })
    }
    onHover2 = () => {
        this.setState({
            popoverOpen2: true,
        })
    }

    onHoverLeave2 = () => {
        this.setState({
            popoverOpen2: false,
        })
    }
    onHover3 = () => {
        this.setState({
            popoverOpen3: true,
        })
    }

    onHoverLeave3 = () => {
        this.setState({
            popoverOpen3: false,
        })
    }
    onHover4 = () => {
        this.setState({
            popoverOpen4: true,
        })
    }

    onHoverLeave4 = () => {
        this.setState({
            popoverOpen4: false,
        })
    }
    onHover5 = () => {
        this.setState({
            popoverOpen5: true,
        })
    }

    onHoverLeave5 = () => {
        this.setState({
            popoverOpen5: false,
        })
    }
    onHover6 = () => {
        this.setState({
            popoverOpen6: true,
        })
    }

    onHoverLeave6 = () => {
        this.setState({
            popoverOpen6: false,
        })
    }
    render() {
        $(window).resize(function () {

            var elem = document.getElementById('mySidenavab');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    console.log($(window).width());
                    document.getElementById("mySidenavab").style.width = "250px";
                } else if ($(window).width() < 1650 && document.getElementById("mySidenavab").style.width == "250px") {
                    document.getElementById("mySidenavab").style.width = "0";
                }
            };

        });

        $(window).resize(function () {

            var elem = document.getElementById('mySidenav');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    console.log($(window).width());
                    document.getElementById("mySidenav").style.width = "250px";
                } else if ($(window).width() < 1650 && document.getElementById("mySidenav").style.width == "250px") {
                    document.getElementById("mySidenav").style.width = "0";
                }
            };

        });

        $(window).resize(function () {

            var elem = document.getElementById('hadtoshowm');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    console.log($(window).width());
                    document.getElementById("hadtoshowm").style.display = "none";
                } else if ($(window).width() < 1650) {
                    document.getElementById("hadtoshowm").style.display = "block";
                }
            };

        });
        $(window).resize(function () {

            var elem = document.getElementById('hadtoshowf');
            if (typeof (elem) != 'undefined' && elem != null) {
                if ($(window).width() > 1650) {
                    console.log($(window).width());
                    document.getElementById("hadtoshowf").style.display = "grid";
                } else if ($(window).width() < 1650) {
                    document.getElementById("hadtoshowf").style.display = "none";
                }
            };

        });
        return (
            <header class="head">
                <div class="hix">
                    <Navbar class="hi">
                        <div class="name">
                            <div id="oiu"><NavbarBrand> <div id="aso2"><img id="hiio" src="https://firebasestorage.googleapis.com/v0/b/bldhub.appspot.com/o/Sources%2F0-1392_blood-drops-png-leukemia-and-lymphoma-society-blood.png?alt=media&token=2659606b-ca7d-4638-a20a-80f0c59ba371" /><span id="koija">Blood Hub Online</span></div></NavbarBrand></div>
                            <div class="syshome">
                                <div class="menu">
                                    <div onMouseEnter={this.onHover1} onMouseLeave={this.onHoverLeave1} id="ha1" ><a href="/"><span id="1" class="fa fa-home" /></a></div>
                                    <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpen1} target="ha1" toggle={this.toggle}>
                                        <PopoverBody id="noti">Home</PopoverBody>
                                    </Popover>
                                    <div onMouseEnter={this.onHover2} onMouseLeave={this.onHoverLeave2} id="ha2" ><a href="myacc"><span id="2" class="fa fa-universal-access" /></a></div>
                                    <Popover id="hio" placement="bottom" isOpen={this.state.popoverOpen2} target="ha2" toggle={this.toggle}>
                                        <PopoverBody id="noti">My account</PopoverBody>
                                    </Popover>
                                    <div onMouseEnter={this.onHover3} onMouseLeave={this.onHoverLeave3} id="ha3" ><a href="search"><span id="3" class="fa fa-search" /></a></div>
                                    <Popover id="hio" placement="bottom" isOpen={this.state.popoverOpen3} target="ha3" toggle={this.toggle}>
                                        <PopoverBody id="noti">Search for blood</PopoverBody>
                                    </Popover>
                                    <div onMouseEnter={this.onHover4} onMouseLeave={this.onHoverLeave4} id="ha4" ><a href="notify"><span id="4" class="fa fa-bell-o" /> <div id="notix" class='text-i-e-s'></div></a></div>
                                    <Popover id="hio" placement="bottom" isOpen={this.state.popoverOpen4} target="ha4" toggle={this.toggle}>
                                        <PopoverBody id="noti">Notification</PopoverBody>
                                    </Popover>
                                    <div onMouseEnter={this.onHover5} onMouseLeave={this.onHoverLeave5} id="ha5" ><a href="Chat"><span id="5" class="fa fa-envelope" /><div id="chatx" class='text-i-e-s'></div></a></div>
                                    <Popover id="hio" placement="bottom" isOpen={this.state.popoverOpen5} target="ha5" toggle={this.toggle}>
                                        <PopoverBody id="noti">Chat window</PopoverBody>
                                    </Popover>
                                    <div onMouseEnter={this.onHover6} onMouseLeave={this.onHoverLeave6} id="ha6" ><a href="contact"><span id="6" class="fa fa-bug" /></a></div>
                                    <Popover id="hio" placement="bottom" isOpen={this.state.popoverOpen6} target="ha6" toggle={this.toggle}>
                                        <PopoverBody id="noti">Report / contact us</PopoverBody>
                                    </Popover>
                                </div>
                            </div>

                        </div>

                    </Navbar>
                </div>
                <div class="hi2">
                    <Navbar class="hi">
                        <div class="name">
                            <NavbarBrand><div id="aso2"><img id="hiio" src="https://firebasestorage.googleapis.com/v0/b/bldhub.appspot.com/o/Sources%2F0-1392_blood-drops-png-leukemia-and-lymphoma-society-blood.png?alt=media&token=2659606b-ca7d-4638-a20a-80f0c59ba371" /><span id="koija">Blood Hub Online</span></div></NavbarBrand>
                        </div>
                        <div class="but">
                            <a href="javascript:void(0)" onClick={() => this.CheckNav()} class="newel"><span id="butox" class="fa fa-bars" aria-hidden="true"></span></a>
                        </div>
                    </Navbar>
                </div>
                <div id="mySidenavab" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
                    <div class="uli"><a href="/"><span>Home</span></a></div>
                    <div class="uli"><a href="myacc">My Account</a></div>
                    <div class="uli" ><a href="search">Search for blood</a></div>
                    <div class="uli" id="wow"><a class="uli" href="notify"><div class="inlinex"><span>Notification</span><div id="notix" class='text-i-e-s' /></div></a></div>
                    <div class="uli" id="wow"><a class="uli" href="Chat"><div class="inlinex"><span>Chat</span><div id="chatx" class='text-i-e-s' /></div></a></div>
                    <a href="emcon">Emergency contact</a>
                    <a href="activity">Activities</a>
                    <a href="updt">Update profile</a>
                    <a href="https://dl.drivebuzz.me/d/kSHQr&type=1">Get the app</a>
                    <a href="about">About</a>
                    <a href="Info">Description of app</a>
                    <div class="uli" ><a class="uli" href="contact">Contact us</a></div>
                </div>
                <div class="gnav" id="hadtoshowf" onClick={() => this.openNavik()}>
                    <div id="hum">
                        <img id="msgsgnx" src="https://firebasestorage.googleapis.com/v0/b/bldhub.appspot.com/o/Sources%2FBSMB.png?alt=media&token=90a262c1-7571-412c-8c54-f5d2df44d416" />
                    </div>
                </div>
                <div class="gnavx" id="hadtoshowm" onClick={() => this.openNavik()}>
                    <div id="hum">
                        <img id="msgsgn" src="https://firebasestorage.googleapis.com/v0/b/bldhub.appspot.com/o/Sources%2Fspeech_bubble_100px.png?alt=media&token=82dff01b-0c69-4c20-823c-e311e1db9e4e" />
                    </div>
                </div>
                <div id="mySidenav" class="sidenavy">
                    <br />
                    <div class="butg">
                        <span class="finalx" id="yu"></span>
                    </div>
                    <div id="list">
                        <div class="px-0">
                            <div class="bg-white">
                                <div class="bg-gray px-4 py-2 bg-lightinline">
                                    <div class="block">
                                        <span class="fa fa-comments" id="rccole" aria-hidden="true"> Recent </span>
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
                                <div>
                                    <button type="button" class="lok" onClick={() => this.closeNavik()}>
                                        <span> <i class="fa fa-minus-square-o" aria-hidden="true"></i> Hide Chat </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="msg">
                        <div class="px-0">
                            <div class="bg-gray px-4 py-2 bg-lightinline">
                                <div class="block">
                                    <button id="button-addon2" type="button" class="btn btn-link" onClick={() => this.back()}> <i class="fa fa-arrow-left"></i></button>
                                </div>
                                <div class="block">
                                    <div id="lol1x1z">
                                        <div id="lolly">
                                            <img id="hasnameimg"></img>
                                        </div>
                                        <div id="lolly3">
                                            <p id="hisname" ></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-5 chat-box2 bg-white full" id="pard">
                                <div></div>
                            </div>

                            <form action="javascript:void(0)" class="bg-light">
                                <div class="input-group colo">
                                    <textarea placeholder="Write a message" id="texty" name="text" rows="2" styles="overflow: hidden; word-wrap: break-word; height: 50px;"></textarea>
                                    <div class="input-group-append">
                                        <button id="button-addon2" type="button" class="btn btn-link" onClick={() => this.sentnow()}> <i class="fa fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </header>

        );
    }
}
