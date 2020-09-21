import React from 'react';
import {
    Button,
    Form,
    Header,
    Icon,
    Input, Dropdown, Grid,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2, disabled: true },
    { key: 3, text: 'Choice 3', value: 3 },
]



const Search = () => {
    return (

        <Grid columns='equal' divided>
            <Grid.Row textAlign='center'>
                <Grid.Column>
                    <Segment>
                        <Dropdown text='Parenting Programme' options={options} />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Dropdown text='$1 - $40' options={options} />
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
        </Grid>
    )
}

export default Search;