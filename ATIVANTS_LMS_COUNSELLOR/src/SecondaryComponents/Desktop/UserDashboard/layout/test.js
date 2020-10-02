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


const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2, disabled: true },
    { key: 3, text: 'Choice 3', value: 3 },
]

var priceRange = [];
var k = 0;
for (var i = 0; k < 1000; i++) {

    priceRange.push({ key: i, text: k, value: k });
    k += 50;
}
 
class Test extends React.Component {
    state = {
        post: [],
        allPosts: [],
        minValue:0,
        maxValue: 0 

    };

    componentDidMount() {

        axios.get(`http://localhost:5000/Counsellor/GetCounsellorDetails`)
            .then(res => {

                console.log(res);
                const persons = res.data.counsellor;
                const minValue =  0 ;
                const maxValue =  1000 ;
                this.setState({
                    post: persons,
                    allPosts: persons,
                    minValue :minValue ,
                    maxValue : maxValue
                });
            })
    }

    _onKeyUp = e => {
        // filter post list by description  using onKeyUp function
        const post = this.state.allPosts.filter(item =>
            item.counselling_introduction[0].ct_counsellor_about_description.toLowerCase().includes(e.target.value.toLowerCase())
        );
        this.setState({ post });
    };

 
    _onMaxPrice = (e, data) => { 
        var post = [];

        this.state.allPosts.forEach(checkEachPost);
        console.log("---------------e --------------");
        console.log(e);
        function checkEachPost(item, index) {
            console.log("---------------item--------------");
            console.log(item);
            for (let detail of item.counselling_details) {
                console.log("--------------detail---------------");
                console.log(detail);
                if (Number(detail.ct_counsellor_hourly_rate) <= data.value) {
                    console.log("-----------before push------------------");
                    post.push(item);
                    break;
                }
            }


        }
        this.setState({ post: post , 
            maxValue :  data.value });
    }



    _onMinPrice = (e, data) => {
        console.log("--------------------      e ------------");
        console.log(e);
        console.log("--------------------  data ------------");
        console.log(data.value);

        var post = [];

        this.state.allPosts.forEach(checkEachPost);
        console.log("---------------e --------------");
        console.log(e);
        function checkEachPost(item, index) {
            console.log("---------------item--------------");
            console.log(item);
            for (let detail of item.counselling_details) {
                console.log("--------------detail---------------");
                console.log(detail);
                if (Number(detail.ct_counsellor_hourly_rate) >= data.value) {
                    console.log("-----------before push------------------");
                    post.push(item);
                    break;
                }
            }


        }
        this.setState({ post: post , 
            minValue :  data.value });
    }
    //     _onMaxPrice = e => {
    //         // filter post list by max price using onKeyUp function
    //         // const post = this.state.allPosts.filter(item.counselling_details =>

    //         //     details.ct_counsellor_hourly_rate 
    //         //     item.counselling_introduction[0].ct_counsellor_about_description.toLowerCase().includes(e.target.value.toLowerCase())
    //         // );

    //         var post = [];

    //         this.state.allPosts.forEach(checkEachPost);
    //         console.log("---------------e --------------");
    //         console.log(e);
    // function checkEachPost(item, index) {
    //     console.log("---------------item--------------");
    //     console.log(item);
    //     for (let detail of item.counselling_details) {
    //         console.log("--------------detail---------------");
    //         console.log(detail);
    //         if (detail.ct_counsellor_hourly_rate < e.target.value) {
    //             console.log("-----------before push------------------");
    //             post.push(item);
    //           break;
    //         }
    //       }


    // }
    // this.setState({ post });
    // };

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
                                placeholder="Search"
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown text='Parenting Programme' options={options} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.minValue} options={priceRange} onChange={this._onMinPrice}   />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown value={this.state.maxValue}    options={priceRange} onChange={this._onMaxPrice} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown text='Select please' options={options} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Dropdown text='Anytime' options={options} />
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