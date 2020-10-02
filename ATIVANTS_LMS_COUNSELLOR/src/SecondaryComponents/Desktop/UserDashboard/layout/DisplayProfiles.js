import React from 'react';
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
const axios = require('axios');


class DisplayProfiles extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/Counsellor/GetCounsellorDetails`)
            .then(res => {
                console.log(res);
                const persons = res.data.counsellor;
                this.setState({ persons });
            })
    }



    render() {
        return (


            <Grid columns='equal' divided>
                <Grid.Row textAlign='center'>

                    <Grid.Column>
                        <Container>
                            {this.state.persons.map(person =>
                                <div class="ui card"  style={{ width: '100%' }}>
                                    <Card   style={{ width: '100%' }} >
                                  
                                        <Card.Content>
                                        <Image  width = '100px'  style={{    padding : '5%', float : 'left' }}  src={person.counselling_introduction[0].ct_counsellor_photo} wrapped ui={true} />
                                          <div style={{ float : 'left' , width : '50%', textAlign : 'left'}} >
                                          <Card.Header > {person.counsellor_details[0].CT_FIRST_NAME}   {person.counsellor_details[0].CT_LAST_NAME}  </Card.Header>
                                            
                                            <Card.Description>
                                                                                           
                                                <strong >My Counselling Group(s)</strong>
                                                {person.counselling_details.map((details, index) => (
                                                    <p>
                                                        <span> {details.ct_counselling_level_name} ------- {details.ct_counselling_subject_name}  </span>
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

                                            <div style={{ float : 'right' , width : '20%', textAlign : 'left'}} >
                                                <Button variant="contained" color="primary"   href= {     person.counselling_introduction[0]. ct_counsellor_video_url    } target="_blank" >  Watch video</Button>
 
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
        )
    }
}

export default DisplayProfiles;