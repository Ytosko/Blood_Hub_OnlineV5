import React, { Component } from 'react';
import './style.css';

export class about extends Component {
    static displayName = about.name;

    render() {
        return (
            <div class="wrapper row2">
                <div id="container" class="clear">
                    <div id="about-us" class="clear">
                        <section id="statements" class="clear">
                            <p>Blood Hub - An integrated platform for being and serching for blood donor</p>
                            <p>A simple Blood Finding and communication app for Donors <a href="https://github.com/Ytosko/Blood_Hub">github.com/Ytosko/Blood_Hub</a></p>
                        </section>

                        <div id="team">
                            <h2>Developer(s)</h2>
                            <div class = "okli">
                                <div>
                                    <div class="clear">
                                        <div class="one_quarter"><img id = "iop" src="https://avatars0.githubusercontent.com/u/43275869?s=460&u=8d2600e335c1ae0b42427fa94a3c480347906a4b&v=4" alt="" /></div>
                                        <div class="three_quarter">
                                            <p class="team_name">Saiki Sarkar</p>
                                            <p class="team_title">2016133091 / Android developer @ Tribe of War Consulting LLC</p>
                                            <p class="team_title">Shahjalal University of Science and Technology</p>
                                            <div class="team_description">
                                                <p>I am an android and windows software developer. I am comfortable with C, C++, Java and also with database both offline like SQL and also with online databases like firebase etc. I have completed many projects on both windows and android with help of Java, Node.js, SQL and firebase. You can check those projects on my Github account which is Ytosko and the link for my Github account is : github/Ytosko</p>

                                            </div>
                                            <ul>
                                                <li><a href="https://sites.google.com/view/ytosko"><img id="soc" src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Google_Sites_Logo.png" alt="" /></a></li>
                                                <li><a href="https://www.facebook.com/Ytosko/"><img id="soc" src="data:image/png;base64,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" alt="" /></a></li>
                                                <li><a href="https://scholar.google.com/citations?user=sw-4dkcAAAAJ&hl=en"><img id="soc" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/512px-Google_Scholar_logo.svg.png" alt="" /></a></li>
                                                <li><a href="https://github.com/Ytosko"><img id="soc" src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" alt="" /></a></li>
                                                <li><a href="https://www.researchgate.net/profile/Saiki_Sarkar"><img id="soc" src="https://www.pngitem.com/pimgs/m/517-5171353_1-researchgate-logo-circle-hd-png-download.png" alt="" /></a></li>
                                                <li><a href="https://bd.linkedin.com/in/ytosko"><img id="soc" src="https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo.png" alt="" /></a></li>
                                                <li><a href="https://www.semanticscholar.org/author/Saiki-Sarkar/1630291702"><img id="soc" src="https://cdn-images-1.medium.com/max/218/1*lo0bvh3aYpL7nOJOqkyt-Q@2x.png" alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "okli">
                                <div>
                                    <div class="clear">
                                        <div class="one_quarter"><img id = "iop" src="https://media-exp1.licdn.com/dms/image/C5103AQEeFoEdWyRENg/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=kN8Do7B2v-qLe0PTrt0WPmJtuCGrbWNnNROSUPq2OlM" alt="" /></div>
                                        <div class="three_quarter">
                                            <p class="team_name">Tarequn Nabi Tareq</p>
                                            <p class="team_title">2016133027</p>
                                            <p class="team_title">Shahjalal University of Science and Technology</p>
                                            <div class="team_description">
                                                <p>Hi, This is Tarequn nabi Tareq and this website is a online version of blood donation platform Blood Hub where you can authenticate, communicate and get donors very quickly</p>

                                            </div>
                                            <ul>
                                                <li><a href="https://www.facebook.com/tarequlnabi.tareq.1"><img id  = "soc" src="data:image/png;base64,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" alt="" /></a></li>
                                                <li><a href="https://bd.linkedin.com/in/md-tarequn-nabi-tareq-3033621a6"><img id="soc" src="https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo.png" alt="" /></a></li>
                                                <li><a href="https://www.instagram.com/_tarequn_nabi/?hl=en"><img id="soc" src="https://instagram-brand.com/wp-content/themes/ig-branding/assets/images/ig-logo-email.png" alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="team">
                            <h2>Instructor(s)</h2>
                            <div class="okli">
                                <div>
                                    <div class="clear">
                                        <div class="one_quarter"><img id="iop" src="https://scontent.fdac24-1.fna.fbcdn.net/v/t1.0-0/c111.0.390.390a/p526x296/74638386_1185354288338946_8707680454699909120_o.jpg?_nc_cat=101&_nc_sid=174925&_nc_eui2=AeH8qR4r23SMP-Vg_FZRD5nUlM-gvPCnbjyUz6C88KduPKgFvrUhbq17SXGGOfC7AVWmBdclZKKC7_DWJv-pZ0EL&_nc_ohc=kaKn-LH7n5oAX8ISqGV&_nc_ht=scontent.fdac24-1.fna&oh=abdc69b37ab213b3b6eb9cc3b7127c39&oe=5EE54237" alt="" /></div>
                                        <div class="three_quarter">
                                            <p class="team_name">Moqsadur Rahman</p>
                                            <p class="team_title">Lecturer, Shahjalal University of Science and Technology</p>
                                            <ul>
                                                <li><a href="https://www.facebook.com/moqsad.rahman"><img id="soc" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///87V508WJ7L0eMqS5jByN0sTZk3VJsjSJfu8PUzUpsiR5dbcqzk6PExUJrEy+D09fiIl8HY3etjeK9xg7Wkr85PZ6a0vdd2h7eapslHYaOOnMOAkLyUocatt9Nhdq5Ua6jT2Ofe4+5pfbEAOZEVP5KostCxutWl/5RpAAAIRElEQVR4nO2da3PqKhRAm4iQEMX4jlHr6572///Dq7WttjUt+8GOzrDmnJl+I0sIbDaPPD1FIpFIJBKJRCKRSCQSiUQikYehzHfd58Vydehtesd/m95ktZ4+d0dl2faT0Sn33UXVSwultXPmCue0Ulm9WU07/Yf1LDuLce2UsyZJG0iMdcrOJtNd2w8LZ7TYOu2a3a41E+u0Hb/0235mf8rOMM387K5q0xX1+jGqcjesMwuy+7R02XYxavv5/yCfzrRD6Z059kC9edsSvzCqMoreu6RWyzt9JQfjzFL13kicqu7wjexutWHxe8Oow505dmaK0e+E1eM76nRGvYzZ74Qpqjt5H/sr7vr7wOr1PUR0U+PC+B1JdN1t228/0+Tx4VdHdchbFVyEaqAXrGsxBNj3dGi/9FSNVVvV+GyDV+AZl3ba8CsPKugbeE1SrOUF97NwXegNtHiH05VqoR/YWjbEWWRiLfQDoySHxpWS9ktPfepUyq+cSAwStxSXQoIb0T7mGlVJCOY1zzwXhRZQzGfCnai0Yj5rsQYlFMu61RoMr1huWq7BE2oV0HDSWi96jQoXpA5Zx8HkO/6Kz4EEpzyRzGnBSWvt7BF39d8/0k1UmNnUIGPQM07Vm+G0u9vt+9959X4HErsPILgHNKMmnBpP943ToIF/GzGzAEm4LXWcSFyx/jUBCjBM3YRdsKJ2o8Yt//jdIYapemEWnFNfQrf9cwYLMkwc74y4j1vzvKA9WhXIMDVb1ldxTIxltE8cAjNM3ZBRkDoS2oNPKUDDtOAbFfvEzH2SejUoqGGSshluiANF5pdDghqmjiurMSe2UdPzKwdsmGie/jRPif2obxQJNkzNmMVwSRzrk5lnQXDDVHGsS1G7mdT5TucQhknCYDihTuu1764KhGGqF2TBXUEU9BwqkIaJJa/YjKlTCt+eFGdIHzF25Hm99U4coQzJlUiuwtR5r6egDP07stuM6Lkn7b0o1kEZJoY0x1jR86Nq0Kz0MrxmgmsvmrLo1mdIPummiCavlXvLsX2AfCESRzBcM2SAGw3Z0suUxWGO/U5NhjlsI/gvEKLTLkcKuMlwxLZSnjh09pQ6L3yjyZDl5zuDHvXJ6ac3Gg35FkGSGjlgTFm6AgFD7xnod3osq6EShv6R4Rf2PC+KhCFySORppCKGyGbK00hlDC2mN82pU993RAxR2Yw50xOIGKaYvGLFtK9EyBCxtE/Nkn6WLWJo4Sume64HkDFEhDW0B1DZJ/81Gf6XfYM0Omlw9D2kzO5VP7/Q8OOW+TdK/70YtwxfoYak0bBARcLPFEMLXS+lLcfgDEkZBbMBlkYLSnGGpBcDnHKjdTQ4w4qU2MuAhxUXpI4NZ0hLKfjnZc/QEqU4wxkpxvDPrZ+hTSxQhiUtigJ2pmVNKg1nSJvMADvTkja/RxkSE+zAvSd7WmkoQ+pCXgEqDbcMRDOkhuIZaCGRWBrK8JVqCIq9n1swpGa+FGiaTywNZbgkrlX+slB5A1pIgzOkbmu5f0Nq9lKD9kcRV7dRhtTE0P0bUvOzQENai1HXx0UabPvdb1AXEWC3S6zsj1NJIHwyUf/0V2glJgm0lVLL+6Rp0aSr2Io4AzNcO7aC79Rw8YiGoEn+IxrCRvxn8nt/KVjMELRKOn9AwwwUeQ/4ipczBM0PRxlbwWKGsDl+XrAVLGYI249RGraCpQyN77GOd2ZsilKG0FXgycMZOuDJiyFbYCplCF0i5RvypQwz4IWnO7bypQwVcNbdf7RWCr6DoGTrTIUMLfjamglXJQoZQpcPn56mXF2NkCF8/2XnwQwN+M7hkmsOLGPofwbwQo+pq5ExxBxImDJVooxh49mjX+CaIgoZYrLsTGWLGOKOPjEF3yKG8J2JJwY8zVTEsEDdT1+mLL2phCFmrDjBs3ghYYjZx36CJ6yRMHTYjyjUHM1UwNDvCqNbsKxACRhCN15e6HNkTcMbGuwBy6fTjQr08sMbUm5V4Fi+CG9YUG7GYMhlBDdEHAi64pU+YAQ3hKYRv1LSB4zQhgY9VJyhp2tCG1Lvo6UHp4ENwWdlfkCuxMCGmMn9NwyxEsMa0qvwdKfgPRsWHFcmE5NuQQ0dy/3sxElUUEP6bW1vVKSZcEhDruuSS1IlBjTEJi9+8krJSQU0pMVrX9gQ2mk4Q814VTJlRTiYoan5BI/tFP84wQyZrtj9AL8kHMqQ4ebSL5QOO+4HMrQM4dpXRtgHCmNoLP/nH16QTxTGMMhXSla4gT+IIfu3H85sUb1Nk+GAECl5fYgAAW6+b7a9mxDSePy9zAcj1GzYNIAWpOS4/6LDvXMZg0lDfq67y7fDHS1oQnwJ6QIhfGMSZP6+zN0pGhv+k7KkySJZMHgNnphrvqMKUEGBGjwxQEfhRGwatpO5sLOtKLpZyGHiK/2a73yiN3ocbqD/STnmO77nieL8gJUPS9ku1WA3BRHo/hN8Ga3hSxz605+JtVR9kHwFr1hmItVo4CcN2OikAn2q3kqNgrcoV6Gr0WbMWUMwnTrk22jUuM0KPFMuXLCmqlOOr47R6VdFkKZqs7++zSrHaKzYHa2u5MJQDzo93i7n6CczUQLQOWRspzKduj+/E6Oq4Jg5Gp0t76p9XpMvakWrSGP1Vj7GBjGoDL7XsapetRFiA8nnkwxTk1a5anA3w8MflN3KaO2fuD+2TZ0MQXcE3QGj6aHW2v2laYxTrq5e2w/OMJT7+fCQFko7+1PUGOt0ltWHdbfp0roHocw7z4tqm/4riss1dce/681qOt81fVfgISnz/eidPs+Gu0gkEolEIpFIJBKJRCKRSOSO+B/L1cxPl+In4wAAAABJRU5ErkJggg==" alt="" /></a></li>
                                                <li><a href="https://scholar.google.com/citations?user=gpJVZeMAAAAJ&hl=en"><img id="soc" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/512px-Google_Scholar_logo.svg.png" alt="" /></a></li>
                                                <li><a href="https://github.com/moqsad?"><img id="soc" src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" alt="" /></a></li>
                                                <li><a href="https://www.researchgate.net/profile/Moqsadur_Rahman"><img id="soc" src="https://www.pngitem.com/pimgs/m/517-5171353_1-researchgate-logo-circle-hd-png-download.png" alt="" /></a></li>
                                                <li><a href="https://bd.linkedin.com/in/moqsadur-rahman-2439b7b6"><img id="soc" src="https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo.png" alt="" /></a></li>
                                                <li><a href="https://www.sust.edu/d/cse/faculty-profile-detail/619"><img id="soc" src="https://upload.wikimedia.org/wikipedia/en/d/d9/Shahjalal_University_of_Science_and_Technology_logo.png" alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
