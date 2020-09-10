import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List, Accordion, ListContent
} from 'semantic-ui-react';


const Registration_Result = () => {


    return (
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center' style={{ padding: "10px" }}>
                 Submitted...
                </Header>
               
            </Grid.Column>
        </Grid>
    )
}

export default Registration_Result;