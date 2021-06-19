import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './Login.css';
import $ from 'jquery';
import * as firebase from 'firebase';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import moment from 'react-moment'
import SyncLoader from "react-spinners/SyncLoader";
import ReactLoading from 'react-loading'
import { css } from "@emotion/core";
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
export class Home extends Component {

    constructor(props) {
        super(props);
        const $ = window.$;
        this.state = {
            data: null
        };
        this.state = {
            loading: true

        }
        this.state = {
            url: null
        }
        this.state = {
            chatName: "",
            chatUid: ""
        }
        window.localStorage.setItem("Index", "1");
    }


    componentWillMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ data: authUser.uid })
                : this.setState({ data: 'login' });
            this.gethisname();
            this.getmyname();
            this.setState({ loading: false });
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000);

    }
    getStatusxc() {
        console.log("Calling");
        if (this.state.data != "login") {
            var elem = document.getElementById('yu');
            if (typeof (elem) != 'undefined' && elem != null) {
                var but = document.getElementById("yu");
                var name = window.localStorage.getItem("iamadiscodanceryeyeye");
                var outer = 4;
                var borderString = outer + 'px solid #1abc9c';
                $("#yu").css("border-bottom", borderString);
                but.innerHTML = "Signed in as : " + name;
                but.onclick = function () {
                    window.location.href = "myacc";
                };
            }
        } else {
            var elem = document.getElementById('yu');
            if (typeof (elem) != 'undefined' && elem != null) {
                var but = document.getElementById("yu");
                but.innerHTML = "Sign in or create account";
                var outer = 4;
                var borderString = outer + 'px solid #F39C12';
                $("#yu").css("border-bottom", borderString);
                but.onclick = function () {
                    window.location.href = "myacc";
                };
            }
        }
    }
    openNavik() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNavik() {
        document.getElementById("mySidenav").style.width = "0";
    }
    gethisname() {
        hisname = window.localStorage.getItem("chatname");
        console.log(hisname);
    }
    getmyname() {
        myname = window.localStorage.getItem("iamadiscodanceryeyeye");
        console.log(myname);
    }
    Share() {
        var name, url;
        var message = document.getElementById("text").value;
        var vrx = this.state.data;

        this.setState({ loading: true });

        setTimeout(() => this.setState({ loading: false }), 5000);

        if (vrx != "login") {
            name = window.localStorage.getItem("iamadiscodanceryeyeye");
            if (message.length < 1) {
                alert("Write something to share");
            }
            else {
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

                console.log(name + message + stamp + time);

                var fileholder = document.getElementById("hvfile");
                if (fileholder != null && fileholder != 'undefined') {
                    var file = fileholder.files[0];
                    if (file != null) {
                        console.log(file);
                        var storageRef = firebase.storage().ref("img");
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
                                firebase.database().ref("GlobalChat").push({
                                    date: stamp,
                                    message: message,
                                    time: time,
                                    user: name,
                                    uid: vrx
                                }).then((snap) => {
                                    var key = snap.key;
                                    console.log(key);
                                    firebase.database().ref("PostImage/" + key).set({
                                        url: downloadURL
                                    }).then(success => {
                                        document.getElementById("text").value = "";
                                        console.log("Shared");
                                        var elem = document.getElementById('pic_name');
                                        if (typeof (elem) != 'undefined' && elem != null) {
                                            document.getElementById("pic_name").innerHTML = "";
                                        }

                                    });
                                });
                            });
                        });

                    } else {
                        firebase.database().ref("GlobalChat").push({
                            date: stamp,
                            message: message,
                            time: time,
                            user: name,
                            uid: vrx
                        }).then((snap) => {
                            var key = snap.key;
                            console.log(key);

                        }).then(success => {
                            document.getElementById("text").value = "";
                            console.log("Shared");

                        });
                    }
                }
            }
        }
        else {
            window.location.href = "/myacc";
        }
    }


    getStatus() {
        var uid = this.state.data;
        if (uid != "login") {
            var name = window.localStorage.getItem("iamadiscodanceryeyeye");
            firebase.database().ref("GlobalChat").orderByKey().on("value", function (snapshot) {

                var elem = document.getElementById('parentDiv');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById('parentDiv').innerHTML = "";

                }
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    var h;
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
                    x.id = "myDivssxo";
                    x.onclick = function () {
                        window.localStorage.setItem("comkey", key);
                        window.location.href = "dpost";
                    };
                    var xfz = document.createElement("div");
                    xfz.id = "lol1";
                    var xg = document.createElement("div");
                    xg.id = "lol01";
                    var img = document.createElement('img');
                    img.id = "imgtuio"
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
                    xf.id = "lol011";
                    var w = document.createElement("span");
                    w.setAttribute('class', 'userst');
                    w.appendChild(document.createTextNode(name_val));
                    xf.appendChild(w);
                    var d = document.createElement("br");
                    xf.appendChild(d);
                    var xop = document.createElement("span");
                    xop.setAttribute('class', 'usersty');
                    xop.appendChild(document.createTextNode(fix));
                    xf.appendChild(xop);
                    xfz.appendChild(xg);
                    xfz.appendChild(xf);
                    x.appendChild(xfz);
                    var d = document.createElement("br");
                    x.appendChild(d);
                    var d = document.createElement("br");
                    x.appendChild(d);
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
                            var cruk = document.createElement("div");
                            cruk.id = "imgt_con";
                            cruk.appendChild(img);
                            x.appendChild(cruk);
                            var d = document.createElement("br");
                            x1.appendChild(d);
                        }
                    });

                    x1.appendChild(x);



                    var x01 = document.createElement("div");
                    x01.setAttribute('class', 'namezedx');
                    x01.id = "parentDivxxox";
                    var x0 = document.createElement("div");
                    x0.id = "parentDivxxo";
                    x01.style.display = "none";
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
                            x01.style.display = "block";
                            var name_val = childSnapshot.val().user;
                            var id_val = childSnapshot.val().comment;
                            var date = childSnapshot.val().date;
                            var time = childSnapshot.val().time;
                            var useridx = childSnapshot.val().uid;

                            var fix = date + " " + time;

                            var x1 = document.createElement("div");
                            var x = document.createElement("div");
                            var xfz = document.createElement("div");
                            xfz.id = "lol1";
                            var xg = document.createElement("div");
                            xg.id = "lol01";
                            var img = document.createElement('img');
                            img.id = "imgtuiom"
                            firebase.database().ref("dp/" + useridx).orderByKey().once("value").then(function (snapshot) {
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
                            xf.id = "lol011";
                            var w = document.createElement("span");
                            w.setAttribute('class', 'userstm');
                            w.appendChild(document.createTextNode(name_val));
                            xf.appendChild(w);
                            var d = document.createElement("br");
                            xf.appendChild(d);
                            var xop = document.createElement("span");
                            xop.setAttribute('class', 'userstym');
                            xop.appendChild(document.createTextNode(fix));
                            xf.appendChild(xop);
                            xfz.appendChild(xg);
                            xfz.appendChild(xf);
                            xfz.onclick = function () {
                                window.localStorage.setItem("uid", useridx);
                                window.location.href = "dprof";
                            };
                            x.appendChild(xfz);
                            var d = document.createElement("br");
                            x.appendChild(d);
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
                                    $(doplike).css('color', '#808B96');
                                    f = "found";
                                }

                            });

                        }).then(success => {
                            if (f != "found") {
                                firebase.database().ref("React/Likes/" + key).push({
                                    user: name,
                                    uid: uid
                                }).then(success => {
                                    if (userid != uid) {
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
                                    } else {
                                        console.log("Done sending NOTI");
                                        $(doplike).css('color', '#5C4CFA');
                                        f = "not found";
                                    }
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
                    setInterval(function () {
                        if ($(window).width() > 1650) {
                            butlike2.onmouseenter = function () {
                                if ($(window).width() > 1650) {
                                    document.getElementById("mainpop").style.display = "block";
                                    document.getElementById("ceoss").style.display = "none";
                                    firebase.database().ref("React/Likes/" + key).orderByKey().on("value", function (snapshot) {
                                        var abc = document.getElementById("nameze");
                                        if (typeof (abc) != 'undefined' && abc != null) {
                                            abc.innerHTML = "";
                                        }
                                        snapshot.forEach(function (childSnapshot) {
                                            var xn = document.createElement("div");
                                            xn.id = "sysco";
                                            var name = childSnapshot.val().user;
                                            var id = childSnapshot.val().uid;
                                            xn.onclick = function () {
                                                window.localStorage.setItem("uid", id);
                                                window.location.href = "dprof";
                                            };
                                            var img = document.createElement("img");
                                            img.id = "lopa";
                                            var a = document.createElement("div");
                                            var b = document.createElement("div");
                                            a.id = "sour";
                                            b.id = "sour";
                                            firebase.database().ref("dp/" + id).orderByKey().once("value").then(function (snapshot) {
                                                if (snapshot.exists()) {
                                                    var url = snapshot.val().url;
                                                    img.src = url;
                                                    a.appendChild(img);
                                                } else {
                                                    firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                                                        var url = snapshot.val().url;
                                                        img.src = url;
                                                        a.appendChild(img);
                                                    });
                                                }
                                            });
                                            
                                            var w = document.createElement("span");
                                            w.setAttribute('class', 'userstm23');
                                            w.appendChild(document.createTextNode(name));
                                            b.appendChild(w);
                                            xn.appendChild(a);
                                            xn.appendChild(b);
                                            var abc = document.getElementById("nameze");
                                            if (typeof (abc) != 'undefined' && abc != null) {
                                                abc.appendChild(xn);
                                                var w = document.createElement("br");
                                                abc.appendChild(w);
                                            }
                                        });

                                    });
                                }
                            }
                            butlike2.onmouseleave = function () {
                                if ($(window).width() > 1650) {
                                    document.getElementById("ceoss").style.display = "inline-block";
                                    document.getElementById("ceoss").style.cursor = "pointer";
                                    document.getElementById("ceoss").onclick = function () {
                                        document.getElementById("mainpop").style.display = "none";
                                    };
                                }
                            }
                        } else if ($(window).width() < 1650) {
                            butlike2.onclick = function () {
                                document.getElementById("mainpop").style.display = "grid";
                                firebase.database().ref("React/Likes/" + key).orderByKey().on("value", function (snapshot) {
                                    var abc = document.getElementById("nameze");
                                    if (typeof (abc) != 'undefined' && abc != null) {
                                        abc.innerHTML = "";
                                    }
                                    snapshot.forEach(function (childSnapshot) {
                                        var xn = document.createElement("div");
                                        xn.id = "sysco";
                                        var name = childSnapshot.val().user;
                                        var id = childSnapshot.val().uid;
                                        xn.onclick = function () {
                                            window.localStorage.setItem("uid", id);
                                            window.location.href = "dprof";
                                        };
                                        var img = document.createElement("img");
                                        img.id = "lopa";
                                        var a = document.createElement("div");
                                        var b = document.createElement("div");
                                        a.id = "sour";
                                        b.id = "sour";
                                        firebase.database().ref("dp/" + id).orderByKey().once("value").then(function (snapshot) {
                                            if (snapshot.exists()) {
                                                var url = snapshot.val().url;
                                                img.src = url;
                                                a.appendChild(img);
                                            } else {
                                                firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                                                    var url = snapshot.val().url;
                                                    img.src = url;
                                                    a.appendChild(img);
                                                });
                                            }
                                        });
                                        var w = document.createElement("span");
                                        w.setAttribute('class', 'userstm23');
                                        w.appendChild(document.createTextNode(name));
                                        b.appendChild(w);
                                        xn.appendChild(a);
                                        xn.appendChild(b);
                                        var abc = document.getElementById("nameze");
                                        if (typeof (abc) != 'undefined' && abc != null) {
                                            abc.appendChild(xn);
                                            var w = document.createElement("br");
                                            abc.appendChild(w);
                                        }
                                    });

                                });
                            }
                        }
                    }, 500);
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
                                if (comp.length < 140) {
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
                                        user: name,
                                        uid: uid
                                    }).then(success => {
                                        console.log("Shared");
                                        window.localStorage.setItem("comkey", key);
                                        if (uid != userid) {
                                            firebase.database().ref("notification/" + userid).push({
                                                notification: name + " comment on your post",
                                                time: stamp + " " + time
                                            }).then(success => {
                                                firebase.database().ref("NOTIFY/" + userid).update({
                                                    noti: "yes"
                                                });
                                            });
                                        }
                                        com.value = "";
                                    });
                                } else {
                                    window.alert("Comment can not be greater than 140 characters");
                                }
                            }
                        } else {
                            window.location.href = "myacc";
                        }
                    };
                    x2.appendChild(but);
                    var d = document.createElement("hr");
                    x2.appendChild(d);
                    x2.appendChild(x01);
                    firebase.database().ref("React/Mute/" + key).orderByKey().on("value", function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            if (childSnapshot.val().uid === uid) {
                                console.log("Hell yeah");
                                x2.style.display = "none";
                            }
                        });
                    });
                    var el = document.getElementById('parentDiv');
                    if (typeof (el) != 'undefined' && el != null) {
                        el.appendChild(x2);
                    }
                });
            });
        }
        else {
            window.location.href = "/myacc";
        }
        return (
            <div id="parentDiv">

            </div>
        )

    }
    sentnow() {
        var name;
        var message = document.getElementById("texty").value;
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
                                    console.log("Finished sending");
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

                    var fix = date;

                    var x1 = document.createElement("div");
                    var d1 = document.createElement("div");
                    d1.setAttribute('class', 'divider');
                    x1.appendChild(d1);
                    var d = document.createElement("hr");
                    x1.appendChild(d);
                    var w = document.createElement("button");
                    w.id = "prospects_form";
                    w.setAttribute('class', 'userst1');
                    w.onclick = function () {
                        window.localStorage.setItem("chatwith", key);
                        window.localStorage.setItem("chatname", name_val);

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
                    var d = document.createElement("hr");
                    x1.appendChild(d);

                    document.getElementById('parentDivx').appendChild(x1);
                });
            });
            return (
                <div id="parentDivx">

                </div>
            );
        } else {
            window.location.href = "myacc";
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
        var elem = document.getElementById('mySidenav');
        if (typeof (elem) != 'undefined' && elem != null) {
            if (document.getElementById("mySidenav").style.width == "250px") {

                document.getElementById("mySidenav").style.width = "0";

            } else {
                document.getElementById("mySidenav").style.width = "250px";
            }
        }
    }
    how2cls() {
        document.getElementById("mainpop").style.display = "none";
    }
    render() {



        $(document).ready(function () {
            $('input[type="file"]').change(function (e) {
                if (e.target.files[0] != null) {
                    var fileName = e.target.files[0].name;
                    var elem = document.getElementById('pic_name');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById("pic_name").innerHTML = fileName;
                        document.getElementById("tick").style.visibility = 'visible';
                    }
                } else {
                    var elem = document.getElementById('pic_name');
                    if (typeof (elem) != 'undefined' && elem != null) {
                        document.getElementById("pic_name").innerHTML = "";
                        document.getElementById("tick").style.visibility = 'hidden';
                    }
                }

            });
        });

        return (

            <div class="sys">
                <div className="huix">
                    <SyncLoader
                        css={override}
                        size={30}
                        color={"#3D94F6"}
                        loading={this.state.loading}

                    />
                </div>



                <div class="sysaqx" id="intro3">
                    <div class="okji">
                        <div id="wrapper">
                            <textarea placeholder="Share something" id="text" name="text" rows="3"></textarea>
                        </div>
                        <div class="choose">
                            <label class="have_it"> Choose file </label>

                            <br></br>

                            <span class="have_it" id="pic_name"></span>
                            <span class="hide have_it fa fa-check" id="tick"></span>
                            <br></br>
                            <form enctype="multipart/form-data" action="/upload/file" method="post">
                                <input type="file" class="ixjd" id="hvfile" />
                            </form>
                        </div>
                    </div>
                    <div class="sys" id="donna">

                        <div class="sysaq" id="intro11">
                            <form method="POST">
                                <button type="button" class="button buttonmc" onClick={() => this.Share()}>
                                    <span> Share</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <br></br>
                    <div id="mainpop">
                        <div id="headx">
                            <div id="like"> Likes </div>
                            <div id="ceoss" onClick={() => this.how2cls()}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div id="nameze">

                        </div>
                    </div>
                    <div id="status">
                        {this.getStatus()}
                    </div>
                </div>
            </div >

        );
    }
}
