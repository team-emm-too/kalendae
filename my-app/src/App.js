import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header, Form, TextArea, Menu } from 'semantic-ui-react';

class App extends React.Component {
    state = {}

    submit = () => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/calendar;charset=utf-8,'
            + 'BEGIN:VCALENDAR\n' +
            'BEGIN:VEVENT\n' +
            'DTSTAMP:20200627T123349Z\n' +
            'UID:20200627T123349Z-1508030932@marudot.com\n' +
            'DTSTART;VALUE=DATE:20200627\n' +
            'DTEND;VALUE=DATE:20200628\n' +
            'SUMMARY:Test123\n' +
            'DESCRIPTION:foo\n' +
            'LOCATION:hawaii\n' +
            'END:VEVENT' +
            'END: VCALENDAR');
        element.setAttribute('download', "test.ics");



        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);


    };

    render() {
        return (
            <div className="App">
        <Menu>
        <Header as="h1">Kalendae</Header>
            </Menu>
            <Grid container>
        <Grid.Column>
        <Header as="h2" textAlign="center" className='white'>Add an Event!</Header>
        <Form onSubmit={this.submit}>
            <Form.Input fluid  label='Event Name' placeholder='Ex. New Year Party' />
            <Form.Group widths='equal'>
            <Form.Input   label='Location' placeholder='Ex. 1234 Foo St. Honolulu, HI 96821' />
            <Form.Input  label=' Start Date' type='datetime-local' />
            <Form.Input  label=' End Date' type='datetime-local' />
            </Form.Group>
            <Form.Input control={TextArea}  label='Event Description' placeholder='Ex. New Year Party' />
            <Form.Button>Submit</Form.Button>
        </Form>
        <br/>
        <br/>
        </Grid.Column>
        </Grid>
        </div>
    );
    }
}

export default App;
