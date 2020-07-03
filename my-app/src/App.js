import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header, Form, TextArea, Menu } from 'semantic-ui-react';

class App extends React.Component {
    state = {eventName: "", eventLocation: "", start: "", end: "", }

    submit = (e) => {
        let element = document.createElement('a');

        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' +
            //Starting Calendar
            'BEGIN:VCALENDAR\n' +
            //Calendar Version
            'VERSION:2.0\n' +
            'PRODID:-//ZContent.net//Zap Calendar 1.0//EN\n' +
            //Calendar Type
            'CALSCALE:GREGORIAN\n' +
            'METHOD:PUBLISH\n' +
            //Starting Event
            'BEGIN:VEVENT\n' +
            'SEQUENCE:0\n' +
            // Time event was created
            'DTSTAMP:20200627T123349Z\n' +
            //Start time of event
            'DTSTART:20200704\n' +
            //End time of event
            'DTEND:202000704\n' +
            //Event Name
            'SUMMARY:Test123\n' +
            //Event Description
            'DESCRIPTION:foo\n' +
            //Event Location
            'LOCATION:hawaii\n' +
            //Ending Event
            'END:VEVENT\n' +
            //Ending Calendar
            'END:VCALENDAR');

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
