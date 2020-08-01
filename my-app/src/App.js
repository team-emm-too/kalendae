import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Form, Grid, Header, Menu, Message, TextArea} from 'semantic-ui-react';

class App extends React.Component {

    state = {
        eventName: "",
        eventLocation: "",
        start: "",
        end: "",
        eventDescription: "",
        repeat: "",
        class: "",
        priority: "",
        error: [],
        timezone: "",
        RSVP: false,
        repeatOptions: [
            {key: 'd', value: 'DAILY', text: 'Daily'},
            {key: 'w', value: 'WEEKLY', text: 'Weekly'},
            {key: 'm', value: 'MONTHLY', text: 'Monthly'},
            {key: 'y', value: 'YEARLY', text: 'Yearly'},
        ],
        classOptions: [
            {key: 'u', value: 'PUBLIC', text: 'Public'},
            {key: 'r', value: 'PRIVATE', text: 'Private'},
            {key: 'CONFIDENTIAL', text: 'Confidential'},
        ],
        priorityOptions: [
            {key: 'h', value: '1', text: 'High'},
            {key: 'm', value: '5', text: 'Medium'},
            {key: 'l', value: '9', text: 'Low'},
        ],
    };

    componentDidMount() {
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text";//force the HTTP response, response-type header to be blob
        xhr.onreadystatechange = function (e) {
             if(xhr.readyState === 4 && xhr.status === 200) {
                let arr =  xhr.response.split("\r\n");
                 let result = arr.slice(arr.indexOf("BEGIN:VTIMEZONE"), arr.indexOf("END:VTIMEZONE") + 1).join("\r\n");
                this.setState({timezone: result});
             }
        }.bind(this);
        xhr.open("GET", `http://tzurl.org/zoneinfo-outlook/${timezone}`);
        xhr.send();
    }

     setTimezone = function(text) {
        this.setState({timezone: text});
    }


    submit = (e, {formData}) => {
        e.preventDefault();
        let element = document.createElement('a');
        let date = new Date();
        let startDate = new Date(this.state.start);
        let endDate = new Date(this.state.end);
        let formError = false;
        let errorMessages = [];

        if (startDate > endDate) {
            formError = true;
            errorMessages.push("The event start date cannot be later than the event end date!")
        }

        let currentDateTime = date.getFullYear() + '' +
            +'' + (date.getMonth() + 1) + '' + ("0" + date.getDate()).slice(-2) + 'T' +
            ("0" + date.getHours()).slice(-2) + '' + ("0" + date.getMinutes()).slice(-2) + '' +
            ("0" + date.getSeconds()).slice(-2);
        let recurrence = '';
        let classification = '';
        let priority = '';
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (this.state.repeat !== '') {
            recurrence += 'RRULE:FREQ=' + this.state.repeat + '\r\n';
        }

        if (this.state.class !== '') {
            classification += 'CLASS:' + this.state.class + '\r\n';
        }

        if (this.state.priority !== '') {
            priority += 'PRIORITY:' + this.state.priority + '\r\n';
        }

        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' +
            //Starting Calendar
            'BEGIN:VCALENDAR\r\n' +
            //Calendar Version
            'VERSION:2.0\r\n' +
            'PRODID:-//Team-emm-too//Kalendae//EN\r\n' +
            //Calendar Type
            'CALSCALE:GREGORIAN\r\n' +
            'METHOD:PUBLISH\r\n' +
            //Timezone info
            this.state.timezone + "\r\n" +
            //Starting Event
            'BEGIN:VEVENT\r\n' +
            "UID:" + currentDateTime + "-kalendae@ics414.com\r\n" +
            'SEQUENCE:0\r\n' +
            // Time event was created
            'DTSTAMP;TZID=' + timezone + ":" + currentDateTime + '\r\n' +
            //Start time of event
            'DTSTART;TZID=' + timezone + ":" + this.state.start.split('-').join('').replace(':', '') + '00\r\n' +
            //End time of event
            'DTEND;TZID=' + timezone + ":" + this.state.end.split('-').join('').replace(':', '') + '00\r\n' +
            //Event Name
            'SUMMARY:' + this.state.eventName + '\r\n' +
            //Event Description
            'DESCRIPTION:' + this.state.eventDescription + '\r\n' +
            //Event Location
            'LOCATION:' + this.state.eventLocation + '\r\n' +
            //Recurrence
            recurrence +
            //Classification
            classification +
            //Priority
            priority +
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

            this.setState({
                eventName: "",
                eventLocation: "",
                start: "",
                end: "",
                repeat: "",
                class: "",
                priority: "",
                eventDescription: "",
                error: [],
                repeatOptions: [
                    {key: 'd', value: 'DAILY', text: 'Daily'},
                    {key: 'w', value: 'WEEKLY', text: 'Weekly'},
                    {key: 'm', value: 'MONTHLY', text: 'Monthly'},
                    {key: 'y', value: 'YEARLY', text: 'Yearly'},
                ],
                classOptions: [
                    {key: 'u', value: 'PUBLIC', text: 'Public'},
                    {key: 'r', value: 'PRIVATE', text: 'Private'},
                    {key: 'CONFIDENTIAL', text: 'Confidential'},
                ],
                priorityOptions: [
                    {key: 'h', value: '1', text: 'High'},
                    {key: 'm', value: '5', text: 'Medium'},
                    {key: 'l', value: '9', text: 'Low'},
                ],
            });
        } else {
            console.log("error");
            this.setState({error: errorMessages});
        }
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value.split('-').join('').replace(':', ''));
    };

    showRSVP = (e) => {
        this.setState({RSVP: !this.state.RSVP});
    }

    render() {
        console.log(this.state.error);
        console.log(this.state.timezone);
        return (
            <div className="App">
                <Menu>
                    <Header as="h1">Kalendae</Header>
                </Menu>
                <Grid container>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" className='white'>Add an Event!</Header>
                        <Form onSubmit={this.submit} error>
                            <Form.Input required fluid name='eventName' value={this.state.eventName} label='Event Name'
                                        placeholder='Ex. New Year Party' onChange={this.handleChange}/>
                            <Form.Group widths='equal'>
                                <Form.Input required name='eventLocation' value={this.state.eventLocation}
                                            label='Location'
                                            placeholder='Ex. 1234 Foo St. Honolulu, HI 96821'
                                            onChange={this.handleChange}/>
                                <Form.Input required name='start' value={this.state.start} label='Start Date'
                                            type='datetime-local'
                                            onChange={this.handleChange}/>
                                <Form.Input required name='end' value={this.state.end} label='End Date'
                                            type='datetime-local'
                                            onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Select name='repeat' value={this.state.repeat} label='Repeat'
                                             options={this.state.repeatOptions}
                                             onChange={
                                                 (e, {value}) => {
                                                     this.setState({repeat: value});
                                                 }
                                             }
                                />
                                <Form.Select name='classification' value={this.state.class} label='Classification'
                                             options={this.state.classOptions}
                                             onChange={
                                                 (e, {value}) => {
                                                     this.setState({class: value});
                                                 }
                                             }
                                />
                                <Form.Select name='priority' value={this.state.priority} label='Priority'
                                             options={this.state.priorityOptions}
                                             onChange={
                                                 (e, {value}) => {
                                                     this.setState({priority: value});
                                                 }
                                             }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Radio name='RSVP' label='RSVP' toggle onChange={this.showRSVP}/>
                                {this.state.RSVP === true ?
                                    <Form.Input type='email' multiple name='toRSVP' label='RSVP To'
                                                placeholder='Ex. attendee@email.com'/> : ""}
                                {this.state.RSVP === true ? <Form.Input type='email' name='sender' label='Sender Email'
                                                                        placeholder='Ex. sender@email.com'/> : ""}
                            </Form.Group>
                            <Form.Input name='eventDescription' value={this.state.eventDescription} control={TextArea}
                                        label='Event Description' placeholder='Ex. New Year Party'
                                        onChange={this.handleChange}/>
                            <Form.Button>Submit</Form.Button>
                            {this.state.error.length !== 0 ? <Message
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
