import React, { useState, useContext, useEffect } from 'react';

import {
    Button,
    Form,
    Header,
    Image,
    Input, Dropdown, Grid,
    Message,
    Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import { Slider } from "react-semantic-ui-range";
const axios = require('axios');
const dayOptions = [
    { key: 'Monday', text: 'Monday', value: 'Monday' },
    { key: 'Tuesday', text: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', text: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', text: 'Thursday', value: 'Thursday' },
    { key: 'Friday', text: 'Friday', value: 'Friday' },
    { key: 'Saturday', text: 'Saturday', value: 'Saturday' },
    { key: 'Anyday', text: 'Anyday', value: 'Anyday' },

]
var priceRange = [];

var dayCheck;
var subjectCheck;
var k = 0;
for (var i = 0; k < 1000; i++) {

    priceRange.push({ key: i, text: k, value: k });
    k += 50;
}
class Test extends React.Component {
    state = {
        post: [],
        allPosts: [],
        minValue: 0,
        maxValue: 0,
        counsellingSubjectName: 0,
        counsellingSubjectNameOptions: [],
        counsellingDayName: 0,
    };
    subjectCheck = (subjectCode, post) => {
        var filteredpost = [];
if (subjectCode == '00'){filteredpost = post;}
else{
        post.forEach(checkEachPost);

        function checkEachPost(item, index) {
            for (let detail of item.counselling_details) {
                if (Number(detail.ct_counselling_subject_code) == subjectCode) {
                    filteredpost.push(item);
                    break;
                }
            }
        }
        }
        return filteredpost;

    }
    dayCheck = (day, post) => {
        var filteredpost = [];
        post.forEach(checkEachPost);
        function checkEachPost(item, index) {

            switch (day) {
                case 'Monday':
                    if (item.counselling_monday.length > 0) {
                        filteredpost.push(item);
                    }

                    break;
                case 'Tuesday':
                    if (item.counselling_tuesday.length > 0) {
                        filteredpost.push(item);
                    }

                    break;
                case 'Wednesday':
                    if (item.counselling_wednesday.length > 0) {
                        filteredpost.push(item);
                    }
                    break;
                case 'Thursday':
                    if (item.counselling_thursday.length > 0) {
                        filteredpost.push(item);
                    }
                    break;
                case 'Friday':
                    if (item.counselling_friday.length > 0) {
                        filteredpost.push(item);
                    }
                    break;
                case 'Saturday':
                    if (item.counselling_saturday.length > 0) {
                        filteredpost.push(item);
                    }
                    break;
                case 'Anyday':
                    filteredpost.push(item);

                    break;
                default:

                    break;
            }

        }
        return filteredpost;

    }

    priceRange = (minValue, maxValue, post) => {
        var minPost = [];
        var filteredpost = [];

        post.forEach(checkMinEachPost);
        function checkMinEachPost(item, index) {
            for (let detail of item.counselling_details) {
                if (Number(detail.ct_counsellor_hourly_rate) >= minValue) {
                    minPost.push(item);
                    break;
                }
            }
        }

        minPost.forEach(checkMaxEachPost);

        function checkMaxEachPost(item, index) {
            for (let detail of item.counselling_details) {
                if (Number(detail.ct_counsellor_hourly_rate) <= maxValue) {
                    filteredpost.push(item);
                    break;
                }
            }
        }
        console.log(filteredpost);
        return filteredpost;
    }

    componentDidMount() {
        var counsellingSubjectNameOptions = [{ key: '00', text:'Any Subject', value: '00' }];
        axios.get(`http://localhost:5000/Counsellor/GetCounsellorDetails`)
            .then(res => {
                const persons = res.data.counsellor;
                const minValue = 0;
                const maxValue = 950;
                const counsellingSubjectName = 2;
                this.setState({
                    post: persons,
                    allPosts: persons,
                    minValue: minValue,
                    maxValue: maxValue,
                    counsellingSubjectName: '00',
                    counsellingDayName: "Anyday"
                });
            })

        axios.get(`http://localhost:5000/form/list`)
            .then(res => {
                var counsellingSubjectNameOptionsArray = res.data.COUNSELLING_SUBJECTS;

                counsellingSubjectNameOptionsArray.forEach(setcounsellingSubjectNameOptions)

                function setcounsellingSubjectNameOptions(item, index) {
                    counsellingSubjectNameOptions.push({ key: item.CT_COUNSELLING_SUBJECT_CODE, text: item.CT_COUNSELLING_SUBJECT_NAME, value: item.CT_COUNSELLING_SUBJECT_CODE });
                }

                this.setState({
                    counsellingSubjectNameOptions: counsellingSubjectNameOptions,
                    counsellingDayOptions: [],

                });
            })
    }

    _onKeyUp = e => {
        // filter post list by description  using onKeyUp function
        var  post = [];
        var value =e.target.value.toLowerCase();
        this.state.allPosts.forEach(checkItem);
         
      
        function checkItem(item, index) {
            var itemNotPushed = true ;
            var ar = value.split(' ');   
// var sdf = ar.contains(  item.counselling_introduction[0].ct_counsellor_about_description.toLowerCase());
// console.log(sdf);
 var name =   item.counsellor_details[0].CT_FIRST_NAME.toLowerCase();

//console.log( ar.contains(  item.counsellor_details[0].CT_FIRST_NAME.toLowerCase())   );


                // if (   ar.indexOf(  item.counselling_introduction[0].ct_counsellor_about_description.toLowerCase()) >= 0  && itemNotPushed){
                //     post.push( item  );
                //     console.log("---------------intro----------------");
                //    itemNotPushed = false ;
                // }
                // if ( ar.contains(  name) >= 0  && itemNotPushed ){
                //     post.push( item  );
                //     console.log("---------------fname----------------");

                //     itemNotPushed = false ;
                // } 
                // if (   ar.indexOf(  item.counsellor_details[0].CT_LAST_NAME.toLowerCase()) >= 0  && itemNotPushed ){
                //     post.push( item  );
                //     console.log("---------------lname----------------");

                //     itemNotPushed = false ;
                // }
                
        }
      
        this.setState({ post });
    };

    _onMaxPrice = (e, data) => {
        var maxValue = data.value;
        var post = this.priceRange(this.state.minValue, maxValue, this.state.allPosts);
        var filteredpost = this.subjectCheck(this.state.counsellingSubjectName, post);
        var dayfilteredpost = this.dayCheck(this.state.counsellingDayName, filteredpost);
        this.setState({ post: dayfilteredpost, maxValue: maxValue });
    };

    _onMinPrice = (e, data) => {

        var minValue = data.value;
        var post = this.priceRange(minValue, this.state.maxValue, this.state.allPosts);
        var filteredpost = this.subjectCheck(this.state.counsellingSubjectName, post);
        var dayfilteredpost = this.dayCheck(this.state.counsellingDayName, filteredpost);
        this.setState({ post: dayfilteredpost, minValue: minValue });
    };

    _onSubjectChange = (e, data) => {

        var subjectValue = data.value;
        var filteredpost = this.subjectCheck(subjectValue, this.state.allPosts);
        var dayfilteredpost = this.dayCheck(this.state.counsellingDayName, filteredpost);
        var post = this.priceRange(this.state.minValue, this.state.maxValue, dayfilteredpost);
        this.setState({ post: post, counsellingSubjectName: subjectValue });
    };

    _onDayChange = (e, data) => {

        var DayValue = data.value;
        var filteredpost = this.dayCheck(DayValue, this.state.allPosts);
        var pricefilteredpost = this.priceRange(this.state.minValue, this.state.maxValue, filteredpost);
        var post = this.subjectCheck(this.state.counsellingSubjectName, pricefilteredpost);
        this.setState({ post: post, counsellingDayName: DayValue });

    };
    render() {
        return (

            <Grid columns='equal' divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <input
                                type="search"
                                onChange={this._onKeyUp}
                                name="s"
                                id="s"
                                placeholder="Search by description or counsellor name"
                            />
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.minValue} options={priceRange} onChange={this._onMinPrice} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.maxValue} options={priceRange} onChange={this._onMaxPrice} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.counsellingSubjectName} options={this.state.counsellingSubjectNameOptions} onChange={this._onSubjectChange} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.counsellingDayName} options={dayOptions} onChange={this._onDayChange} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            {this.state.post.map(person =>
                                <div class="ui card" style={{ width: '100%' }}>
                                    <Card style={{ width: '100%' }} >
                                        <Card.Content>
                                            <Image width='100px' style={{ padding: '5%', float: 'left' }} src={person.counselling_introduction[0].ct_counsellor_photo} wrapped ui={true} />
                                            <div style={{ float: 'left', width: '50%', textAlign: 'left' }} >
                                                <Card.Header > {person.counsellor_details[0].CT_FIRST_NAME}   {person.counsellor_details[0].CT_LAST_NAME}  </Card.Header>
                                                <Card.Description>
                                                    <strong >My Counselling Group(s)</strong>
                                                    {person.counselling_details.map((details, index) => (
                                                        <p>
                                                            <span> {details.ct_counselling_level_name} ------- {details.ct_counselling_subject_name}  ------- {details.ct_counsellor_hourly_rate}  </span>
                                                        </p>
                                                    ))}
                                                    <strong >My Qualification</strong>
                                                    {person.counselling_education.map((details, index) => (
                                                        <p>
                                                            <span> {details.ct_qualification_name} ------- {details.ct_institute_name}  </span>
                                                        </p>
                                                    ))}
                                                    <strong  >{person.counselling_introduction[0].ct_counsellor_headline}</strong >
                                                    <p>{person.counselling_introduction[0].ct_counsellor_about_description}</p>
                                                </Card.Description>
                                            </div>

                                            <div style={{ float: 'right', width: '20%', textAlign: 'left' }} >
                                                <Button variant="contained" color="primary" href={person.counselling_introduction[0].ct_counsellor_video_url} target="_blank" >  Watch video</Button>

                                            </div>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a>

                                                Read More
                                            </a>
                                        </Card.Content>
                                    </Card>
                                </div>
                            )}
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>





            // <div className="container">
            //     <div className="search-outer">
            //         <form
            //             role="search"
            //             method="get"
            //             id="searchform"
            //             className="searchform"
            //             action=""
            //         >
            //             {/* input field activates onKeyUp function on state change */}
            //             <input
            //                 type="search"
            //                 onChange={this._onKeyUp}
            //                 name="s"
            //                 id="s"
            //                 placeholder="Search"
            //             />
            //             <button type="submit" id="searchsubmit">
            //                 <i className="fa fa-search" aria-hidden="true" />
            //             </button>
            //         </form>
            //     </div>
            //     <ul className="data-list">
            //         {/* post items mapped in a list linked to onKeyUp function */}
            //         {this.state.post.map((item, index) => (
            //             <li className={"block-" + index}>
            //                 <a className="title" href={item.link}>
            //                     <h3>{item.counselling_introduction[0].ct_counsellor_about_description}</h3>
            //                 </a>
            //                 <a className="link" href={item.counselling_introduction[0].ct_counsellor_about_description}>

            //                 </a>
            //             </li>
            //         ))}
            //     </ul>
            // </div>
        );
    }
}

export default Test;