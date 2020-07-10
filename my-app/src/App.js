import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header, Form, TextArea, Menu, Message } from 'semantic-ui-react';

class App extends React.Component {
    state = {eventName: "", eventLocation: "", start: "", end: "", eventDescription: "", error: [] };

    submit = (e, {formData}) => {
        e.preventDefault();
        let element = document.createElement('a');
        let date = new Date();
        let startDate = new Date(this.state.start);
        let endDate = new Date(this.state.end);
        let formError = false;
        let errorMessages = [];

        if(startDate > endDate) {
            formError = true;
            errorMessages.push("The event start date cannot be later than the event end date!")
        }

        let currentDateTime = date.getFullYear() + '' +
            + '' + (date.getMonth() + 1) + '' + ("0" + date.getDate()).slice(-2) + 'T' +
            ("0" + date.getHours()).slice(-2) + '' + ("0" + date.getMinutes()).slice(-2) + '' +
            ("0" + date.getSeconds()).slice(-2);
        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' +
            //Starting Calendar
            'BEGIN:VCALENDAR\r\n' +
            //Calendar Version
            'VERSION:2.0\r\n' +
            'PRODID:-//Team-emm-too//Kalendae//EN\r\n' +
            //Calendar Type
            'CALSCALE:GREGORIAN\r\n' +
            'METHOD:PUBLISH\r\n' +
            //Starting Event
            'BEGIN:VEVENT\r\n' +
            'SEQUENCE:0\r\n' +
            // Time event was created
            'DTSTAMP:' + currentDateTime + '\r\n' +
            //Start time of event
            'DTSTART:' + this.state.start.split('-').join('').replace(':', '') + '00\r\n' +
            //End time of event
            'DTEND:' + this.state.end.split('-').join('').replace(':', '') + '00\r\n' +
            //Event Name
            'SUMMARY:' + this.state.eventName + '\r\n' +
            //Event Description
            'DESCRIPTION:' + this.state.eventDescription + '\r\n' +
            //Event Location
            'LOCATION:' + this.state.eventLocation + '\r\n' +
            //Ending Event
            'END:VEVENT\r\n' +
            //Ending Calendar
            'END:VCALENDAR\r\n');

        if (!formError) {
            element.setAttribute('download', this.state.eventName + ".ics");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

            this.setState({eventName: "", eventLocation: "", start: "", end: "", eventDescription: "", error: [] });
        } else {
            console.log("error");
            this.setState({error: errorMessages});
            return;
        }
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value.split('-').join('').replace(':', ''));
    }

    render() {
        console.log(this.state.error);
        return (
            <div className="App">
        <Menu>
        <Header as="h1">Kalendae</Header>
            </Menu>
            <Grid container>
        <Grid.Column>
        <Header as="h2" textAlign="center" className='white'>Add an Event!</Header>
        <Form onSubmit={this.submit} error>
            <Form.Input required fluid  name='eventName' value={this.state.eventName} label='Event Name' placeholder='Ex. New Year Party' onChange={this.handleChange}/>
            <Form.Group widths='equal'>
            <Form.Input required name='eventLocation' value={this.state.eventLocation} label='Location' placeholder='Ex. 1234 Foo St. Honolulu, HI 96821' onChange={this.handleChange}/>
            <Form.Input  required name='start' value={this.state.start} label='Start Date' type='datetime-local' onChange={this.handleChange}/>
            <Form.Input  required name='end' value={this.state.end} label='End Date' type='datetime-local' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Input name='eventDescription' value={this.state.eventDescription} control={TextArea}  label='Event Description' placeholder='Ex. New Year Party' onChange={this.handleChange}/>

            <Form.Button>Submit</Form.Button>
            {this.state.error.length != 0 ? <Message
                error
                header='Action Forbidden'
                list={this.state.error}
            /> : ""}
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
