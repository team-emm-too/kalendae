import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header, Form, TextArea, Menu } from 'semantic-ui-react';

class App extends React.Component {
    state = {eventName: "", eventLocation: "", start: "", end: "", eventDescription: "" };

    submit = (e, {formData}) => {
        e.preventDefault();
        let element = document.createElement('a');
        let date = new Date();
        let currentDateTime = date.getFullYear() + '' +
            + '' + (date.getMonth() + 1) + '' + ("0" + date.getDate()).slice(-2) + 'T' +
            ("0" + date.getHours()).slice(-2) + '' + ("0" + date.getMinutes()).slice(-2) + '' +
            ("0" + date.getSeconds()).slice(-2);
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
            'DTSTAMP:' + currentDateTime + '\n' +
            //Start time of event
            'DTSTART:' + this.state.start.split('-').join('').replace(':', '') + '00\n' +
            //End time of event
            'DTEND:' + this.state.end.split('-').join('').replace(':', '') + '00\n' +
            //Event Name
            'SUMMARY:' + this.state.eventName + '\n' +
            //Event Description
            'DESCRIPTION:' + this.state.eventDescription + '\n' +
            //Event Location
            'LOCATION:' + this.state.eventLocation + '\n' +
            //Ending Event
            'END:VEVENT\n' +
            //Ending Calendar
            'END:VCALENDAR');

        element.setAttribute('download', this.state.eventName + ".ics");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        this.setState({eventName: "", eventLocation: "", start: "", end: "", eventDescription: "" });
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value.split('-').join('').replace(':', ''));
    }

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
            <Form.Input fluid  name='eventName' value={this.state.eventName} label='Event Name' placeholder='Ex. New Year Party' onChange={this.handleChange}/>
            <Form.Group widths='equal'>
            <Form.Input name='eventLocation' label='Location' placeholder='Ex. 1234 Foo St. Honolulu, HI 96821' onChange={this.handleChange}/>
            <Form.Input  name='start' label=' Start Date' type='datetime-local' onChange={this.handleChange}/>
            <Form.Input  name='end' label=' End Date' type='datetime-local' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Input name='eventDescription' control={TextArea}  label='Event Description' placeholder='Ex. New Year Party' onChange={this.handleChange}/>
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
