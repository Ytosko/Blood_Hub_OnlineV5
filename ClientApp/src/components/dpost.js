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

export class dpost extends Component {
    static displayName = dpost.name;

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
            this.getStatus();
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 3000);
    }
    getStatus() {
        var postid = window.localStorage.getItem("comkey");
        var uid = this.state.data;
        if (uid != "login" && postid != null && postid != 'undefined') {
            firebase.database().ref("GlobalChat/" + postid).orderByKey().once("value").then(function (snapshot) {
                var url = window.localStorage.getItem("img-" + postid);
                var name_val = snapshot.val().user;
                var id_val = snapshot.val().message;
                var date = snapshot.val().date;
                var time = snapshot.val().time;
                var userid = snapshot.val().uid;

                var fix = date + " " + time;
                firebase.database().ref("dp/" + userid).orderByKey().once("value").then(function (snapshot) {
                    if (snapshot.exists()) {
                        var url = snapshot.val().url;
                        document.getElementById("imgtuio").src = url;
                    } else {
                        firebase.database().ref("dp/public").orderByKey().once("value").then(function (snapshot) {
                            var url = snapshot.val().url;
                            document.getElementById("imgtuio").src = url;
                        });
                    }
                });
                if (typeof (url) != 'undefined' && url != null) {
                    document.getElementById("imgt").src = url;
                }
                document.getElementById("imgt").onclick = function () {
                    window.location.href = url;
                };

                var elem = document.getElementById('name');
                if (typeof (elem) != 'undefined' && elem != null) {
                    document.getElementById("name").innerHTML = name_val;
                    document.getElementById("time").innerHTML = fix;
                    document.getElementById("post").innerHTML = id_val;
                    document.getElementById("textytx2").style.visibility = 'visible';
                    document.getElementById("hrx").style.visibility = 'visible';
                    document.getElementById("hexa").style.visibility = 'visible';
                }
                var name = window.localStorage.getItem("iamadiscodanceryeyeye");
                var key = window.localStorage.getItem("comkey");
                var dop = document.getElementById("dop");
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
                                firebase.database().ref("notification/" + userid).push({
                                    notification: notification,
                                    time: finaltime
                                }).then(success => {
                                    console.log("Done sending NOTI");
                                    $(doplike).css('color', '#5C4CFA');
                                    $(butlike).prop("disabled", true);
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
                firebase.database().ref("React/Mute/" + key).orderByKey().on("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        if (childSnapshot.val().uid === uid) {
                            console.log("Hell yeah");
                            window.location.href = "/";
                        }
                    });
                });

            });
        } else {
            window.location.href = "myacc";
        }
    }
    getStatusD() {
        var uid = this.state.data;
        var postid = window.localStorage.getItem("comkey");
        firebase.database().ref("comments/" + postid).orderByKey().on("value", function (snapshot) {

            var elem = document.getElementById('parentDiv');
            if (typeof (elem) != 'undefined' && elem != null) {
                document.getElementById('parentDiv').innerHTML = "";

            }
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;
                var childData = childSnapshot.val();

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
                x1.appendChild(x);
                var d = document.createElement("br");
                x1.appendChild(d);

                var d = document.createElement("hr");
                x1.appendChild(d);
                var x12 = document.createElement("div");
                x12.id = "domin";
                x12.appendChild(x1)
                document.getElementById('parentDiv').appendChild(x12);
            });
        });
        return (
            <div id="parentDiv">

            </div>
        )

    }
    ShareCom() {
        var name = window.localStorage.getItem("iamadiscodanceryeyeye");
        var postid = window.localStorage.getItem("comkey");
        var uid = this.state.data;
        console.log(uid);
        if (uid != "login" && name != null && name != 'undefined') {
            var comment = document.getElementById('textytx2').value;
            var elem = document.getElementById('textytx2');
            if (typeof (elem) != 'undefined' && elem != null) {
                if (comment != null && comment != 'undefined') {
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
                    console.log(comment);
                    var userid;
                    firebase.database().ref("GlobalChat/" + postid).orderByKey().once("value").then(function (snapshot) {
                        userid = snapshot.val().uid
                    }).then(success => {
                        firebase.database().ref("comments/" + postid).push({
                            date: stamp,
                            comment: comment,
                            time: time,
                            user: name,
                            uid: uid
                        }).then(success => {
                            console.log("Shared");
                            document.getElementById('textytx2').value = "";
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
                        });
                    });
                    
                } else {
                    alert("Empty comment not possible");
                }
            }
        } else {
            window.location.href = "myacc";
        }
    }
    how2cls() {
        document.getElementById("mainpop").style.display = "none";
    }
    render() {
        return (
            <div id="crossover">
                <div className="huix">
                    <ScaleLoader
                        css={override}
                        size={30}
                        color={"#3D94F6"}
                        loading={this.state.isLoading}
                    />
                </div>
                <div>
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
                    <div id="lol1">
                        <div id="lol01">
                            <img id="imgtuio" />
                        </div>
                        <div id="lol011">
                            <span class="userst" id="name"></span>
                            <br></br>
                            <span class="usersty" id="time"></span>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <span class="userstx" id="post"></span>
                    <br></br>
                    <br></br>
                    <div id="dop">
                    </div>
                    <br></br>
                    <div id="imgt_con"><img id="imgt"></img></div>
                    <br></br>
                </div>
                <br></br>
                <textarea id="textytx2" class="ok" rows="3" placeholder="Write comment"></textarea>
                <button class="fa fa-paper-plane btn btn-link ok" type="button" id="hexa" onClick={() => this.ShareCom()} >  Comment</button>
                <hr class="ok" id="hrx"></hr>
                <div id="status">
                    {this.getStatusD()}
                </div>
            </div>
        );
    }
}