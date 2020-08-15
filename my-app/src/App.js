import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Form, Grid, Header, Menu, Message, TextArea, Button, Icon, List, Segment, Divider} from 'semantic-ui-react';

class App extends React.Component {
    state = {
        eventName: "",
        eventLocation: "",
        start: "",
        end: "",
        eventDescription: "",
        repeat: "No Repeat",
        class: "PUBLIC",
        priority: "9",
        error: [],
        timezone: "",
        RSVP: false,
        toRSVP: "",
        arrRSVP: [],
        GEO: "",
        sender: "",
        dateException: "",
        arrDate: [],
        resources: [],
        resource: '',
        arrMonths: [],
        emailError: false,
        repeatOptions: [
            {key: 'n', value: "No Repeat", text: 'No Repeat'},
            {key: 'd', value: 'DAILY', text: 'Daily'},
            {key: 'w', value: 'WEEKLY', text: 'Weekly'},
            {key: 'm', value: 'MONTHLY', text: 'Monthly'},
            {key: 'y', value: 'YEARLY', text: 'Yearly'},
        ],
        classOptions: [
            {key: 'u', value: 'PUBLIC', text: 'Public'},
            {key: 'r', value: 'PRIVATE', text: 'Private'},
            {key: 's', value: 'CONFIDENTIAL', text: 'Confidential'},
        ],
        priorityOptions: [
            {key: 'l', value: '9', text: 'Low'},
            {key: 'm', value: '5', text: 'Medium'},
            {key: 'h', value: '1', text: 'High'},
        ],
        months: [
            {key: "JAN", value: '1', text: "January"},
            {key: "FEB", value: '2', text: "February"},
            {key: "MAR", value: '3', text: "March"},
            {key: "APR", value: '4', text: "April"},
            {key: "MAY", value: '5', text: "May"},
            {key: "JUN", value: '6', text: "June"},
            {key: "JUL", value: '7', text: "July"},
            {key: "AUG", value: '8', text: "August"},
            {key: "SEP", value: '9', text: "September"},
            {key: "OCT", value: '10', text: "October"},
            {key: "NOV", value: '11', text: "November"},
            {key: "DEC", value: '12', text: "December"},
        ]
    };

    componentDidMount() {
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text";//force the HTTP response, response-type header to be blob
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let arr = xhr.response.split("\r\n");
                let result = arr.slice(arr.indexOf("BEGIN:VTIMEZONE"), arr.indexOf("END:VTIMEZONE") + 1).join("\r\n");
                this.setState({timezone: result});
            }
        }.bind(this);
        xhr.open("GET", `https://cors-anywhere.herokuapp.com/http://tzurl.org/zoneinfo-outlook/${timezone}`);
        xhr.send();
        this.initAutocomplete();
    }

    submit = (e) => {
        e.preventDefault();
        let element = document.createElement('a');
        let date = new Date();
        let startDate = new Date(this.state.start);
        let endDate = new Date(this.state.end);
        let formError = false;
        let errorMessages = [];

        //Date checking
        if (startDate > endDate) {
            formError = true;
            errorMessages.push("The event start date cannot be later than the event end date!");
        }

        let currentDateTime = date.getFullYear() + '' +
            +'' + (date.getMonth() + 1) + '' + ("0" + date.getDate()).slice(-2) + 'T' +
            ("0" + date.getHours()).slice(-2) + '' + ("0" + date.getMinutes()).slice(-2) + '' +
            ("0" + date.getSeconds()).slice(-2);
        let recurrence = '';
        let classification = '';
        let priority = '';
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let RSVP = '';
        let resource = 'RESOURCE:';
        let dateExceptions = "";

        if (this.state.repeat !== 'No Repeat') {
            recurrence += 'RRULE:FREQ=' + this.state.repeat + '\r\n';
        }

        if (this.state.arrMonths.length !== 0) {
            recurrence += 'EXRULE:FREQ=YEARLY;BYMONTH=' + this.state.arrMonths.join(",") + '\r\n';
        }

        if (this.state.class !== '') {
            classification += 'CLASS:' + this.state.class + '\r\n';
        }

        if (this.state.priority !== '') {
            priority += 'PRIORITY:' + this.state.priority + '\r\n';
        }

        if (this.state.RSVP === true) {
            this.state.arrRSVP.forEach(
                (value) => RSVP += 'ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;\r\n RSVP=TRUE:MAILTO:' + value + '\r\n'
            )
        }

        if (this.state.resources.length !== 0) {
            this.state.resources.forEach(
                (value) => (resource.substring(resource.indexOf('\n')).length + value.length > 28) ? resource += `\r\n ${value},` : resource += `${value},`
            );
            resource = resource.substring(0, resource.length - 1);
            resource += '\r\n';
        }

        if (this.state.arrDate.length !== 0) {
            dateExceptions = 'EXDATE:' + this.state.arrDate.join(",").split("-").join("") + '\r\n';
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
            //GEO LOCATION
            'GEO:' + this.state.GEO + '\r\n' +
            //Recurrence
            recurrence +
            //Date Exceptions
            dateExceptions +
            //Classification
            classification +
            //Priority
            priority +
            //Organizer(Sender)
            "ORGANIZER:MAILTO:" + this.state.sender + '\r\n' +
            //Attendee
            RSVP +
            //Resources
            resource +
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
                eventDescription: "",
                repeat: "No Repeat",
                class: "PUBLIC",
                priority: "9",
                error: [],
                RSVP: false,
                toRSVP: "",
                arrRSVP: [],
                GEO: "",
                sender: "",
                resources: [],
                resource: '',
                emailError: false,
                dateException: "",
                arrDate: [],
                arrMonths: [],
            });
        } else {
            console.log("error");
            this.setState({error: errorMessages});
        }
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handlePlaceChange = (place) => {
        this.setState({
            eventLocation: place.formatted_address,
            GEO: `${place.geometry.location.lat()};${place.geometry.location.lng()}`
        });
    }

    showRSVP = () => {
        this.setState({RSVP: !this.state.RSVP});
    }

    handleRSVP = () => {
        //email checking
        let email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.state.toRSVP);

        if (email && this.state.arrRSVP.indexOf(this.state.toRSVP) === -1) {
            let arr = this.state.arrRSVP;
            arr.push(this.state.toRSVP);
            this.setState({arrRSVP: arr, toRSVP: '', emailError: false});
        } else if (email === false) {
            this.setState({emailError: true});
        } else {
            this.setState({toRSVP: '', emailError: false});
        }

    }

    handleResources = () => {
        if (this.state.resources.indexOf(this.state.resource) === -1 && this.state.resource !== "") {
            let arr = this.state.resources;
            arr.push(this.state.resource);
            this.setState({resources: arr, resource: ''});
        } else {
            this.setState({resource: ''});
        }

        console.log(this.state.resources);
    }

    handleDateExceptions = () => {
        if (this.state.arrDate.indexOf(this.state.dateException) === -1 && this.state.dateException !== "") {
            let arr = this.state.arrDate;
            arr.push(this.state.dateException);
            this.setState({arrDate: arr, dateException: ''});
        } else {
            this.setState({dateException: ''});
        }
    }

    handleRemove = (value) => {
        let index = this.state.arrRSVP.indexOf(value);
        let arr = this.state.arrRSVP.slice();
        arr.splice(index, 1);
        this.setState({arrRSVP: arr});
        console.log(index, arr);
    }

    handleResourceRemove = (value) => {
        let index = this.state.resources.indexOf(value);
        let arr = this.state.resources.slice();
        arr.splice(index, 1);
        this.setState({resources: arr});
    }

    handleDateRemove = (value) => {
        let index = this.state.arrDate.indexOf(value);
        let arr = this.state.arrDate.slice();
        arr.splice(index, 1);
        this.setState({arrDate: arr});
    }

    initAutocomplete = () => {

        // Create the search box and link it to the UI element.
        const input = document.getElementById("pac-input");
        const searchBox = new window.google.maps.places.Autocomplete(input);

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("place_changed", () => {
            const place = searchBox.getPlace();
            this.handlePlaceChange(place)
        });
    }

    handleEnter = (event) => {
        if (event.which === 13) {
            event.preventDefault();
            if (event.target.name === 'resource') {
                this.handleResources();
            } else if (event.target.name === 'toRSVP') {
                this.handleRSVP();
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Menu size="huge" inverted>
                    <Grid style={{margin: "3px 0px 2px 0px"}}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h1" textAlign="center" style={{color: "white"}}><Icon
                                    name="calendar alternate" color="blue"/> Kalendae</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Menu>

                <Grid container stretched>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" className='white'>Add an Event!</Header>
                        <Segment>
                            <Form style={{padding: "5px 30px 10px 30px"}} onSubmit={this.submit} error>
                                <Form.Input style={{paddingBottom: "30px"}} required fluid name='eventName'
                                            value={this.state.eventName} label='Event Name'
                                            placeholder='Ex. New Year Party' onChange={this.handleChange}/>

                                <Divider style={{backgroundColor: "paleturquoise"}}/>

                                <Form.Group widths='equal' style={{paddingBottom: "30px"}}>
                                    <Form.Input id="pac-input" required name='eventLocation'
                                                value={this.state.eventLocation}
                                                label='Location'
                                                placeholder='Ex. 1234 Foo St. Honolulu, HI 96821'
                                                onChange={this.handleChange}
                                    />
                                    <Form.Input required name='start' value={this.state.start} label='Start Date'
                                                type='datetime-local'
                                                onChange={this.handleChange}/>
                                    <Form.Input required name='end' value={this.state.end} label='End Date'
                                                type='datetime-local'
                                                onChange={this.handleChange}/>
                                </Form.Group>

                                <Divider style={{backgroundColor: "paleturquoise"}}/>

                                <Form.Group style={{paddingBottom: "30px"}}>
                                    <Form.Select name='repeat' value={this.state.repeat} label='Repeat'
                                                 options={this.state.repeatOptions}
                                                 onChange={
                                                     (e, {value}) => {
                                                         this.setState({repeat: value});
                                                     }
                                                 }
                                    />

                                    {this.state.repeat !== 'No Repeat' ?
                                        <Form.Select multiple name='monthException'
                                                     label='Month Exception'
                                                     options={this.state.months}
                                                     onChange={
                                                         (e, {value}) => {

                                                             this.setState({arrMonths: value});
                                                         }
                                                     }
                                        /> : ""}

                                </Form.Group>
                                {this.state.repeat !== 'No Repeat' ?
                                <Form.Group style={{paddingBottom: "30px"}}>
                                    <Form.Input
                                        action={
                                            <Button type="button" onClick={this.handleDateExceptions} icon>
                                                <Icon color="green" name="add"/>
                                            </Button>}
                                        type='date' value={this.state.dateException} name='dateException'
                                        label='Date Exceptions'
                                        onChange={this.handleChange}
                                        onKeyDown={this.handleEnter}/>
                                    <Grid container>
                                        <Grid.Row centered verticalAlign="middle" style={{padding: "0 0 0 0"}}>
                                            <Grid.Column>
                                                <Header as='h5' textAlign="center" style={{height: "15px"}}>Date
                                                    Exceptions
                                                    List</Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row id="date-exception" stretched>
                                            <List ordered horizontal>
                                                {this.state.arrDate.map((value) =>
                                                    <List.Item key={value}>
                                                        {value}
                                                        <Button style={{backgroundColor: 'transparent'}} type='button'
                                                                size='tiny'
                                                                value={value}
                                                                onClick={() => this.handleDateRemove(value)}
                                                                icon
                                                                circular>
                                                            <Icon color='red' name='close'/>
                                                        </Button>
                                                    </List.Item>)}
                                            </List>
                                        </Grid.Row>
                                    </Grid>
                                </Form.Group> : "" }

                                <Divider style={{backgroundColor: "paleturquoise"}}/>
                                <Form.Group widths='equal' style={{paddingBottom: "30px"}}>
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

                                <Divider style={{backgroundColor: "paleturquoise"}}/>

                                <Form.Group style={{paddingBottom: "30px"}}>
                                    <Form.Input
                                        action={
                                            <Button type="button" onClick={this.handleResources} icon>
                                                <Icon color="green" name="add"/>
                                            </Button>}
                                        type='text' value={this.state.resource} name='resource' label='Resources'
                                        placeholder='Ex. Projector, Camera, etc.' onChange={this.handleChange}
                                        onKeyDown={this.handleEnter}/>
                                    <Grid container>
                                        <Grid.Row centered verticalAlign="middle" style={{padding: "0 0 0 0"}}>
                                            <Grid.Column>
                                                <Header as='h5' textAlign="center" style={{height: "15px"}}>Resource
                                                    List</Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row id="resource" stretched>
                                            <List ordered horizontal>
                                                {this.state.resources.map((value) =>
                                                    <List.Item key={value}>
                                                        {value}
                                                        <Button style={{backgroundColor: 'transparent'}} type='button'
                                                                size='tiny'
                                                                value={value}
                                                                onClick={() => this.handleResourceRemove(value)}
                                                                icon
                                                                circular>
                                                            <Icon color='red' name='close'/>
                                                        </Button>
                                                    </List.Item>)}
                                            </List>
                                        </Grid.Row>
                                    </Grid>
                                </Form.Group>

                                <Divider style={{backgroundColor: "paleturquoise"}}/>

                                <Form.Group>
                                    <Form.Radio name='RSVP' label='RSVP' toggle onChange={this.showRSVP}/>
                                </Form.Group>
                                <Form.Group style={{paddingBottom: "40px"}}>
                                    {this.state.RSVP === true && this.state.emailError === false ?
                                        <Form.Input id="toRSVP" action={
                                            <Button type="button" onClick={this.handleRSVP} icon>
                                                <Icon color="green" name="add"/>
                                            </Button>}
                                                    type='email' value={this.state.toRSVP} multiple name='toRSVP'
                                                    label='RSVP To'
                                                    placeholder='Ex. attendee@email.com' onChange={this.handleChange}
                                                    onKeyDown={this.handleEnter}/> :
                                        (this.state.emailError && this.state.RSVP) ?
                                            <Form.Input id="toRSVP"
                                                        error={{
                                                            content: 'Please enter a valid email',
                                                            pointing: 'below'
                                                        }}
                                                        action={
                                                            <Button type="button" onClick={this.handleRSVP} icon>
                                                                <Icon color="green" name="add"/>
                                                            </Button>}
                                                        type='email' value={this.state.toRSVP} multiple name='toRSVP'
                                                        label='RSVP To'
                                                        placeholder='Ex. attendee@email.com'
                                                        onChange={this.handleChange}
                                                        onKeyDown={this.handleEnter}/> : ""}

                                    {this.state.RSVP === true ?
                                        <Form.Input required type='email' value={this.state.sender} name='sender'
                                                    label='Organizer Email'
                                                    placeholder='Ex. organizer@email.com'
                                                    onChange={this.handleChange}/> : ""}
                                    {this.state.RSVP === true ?
                                        (
                                            <Grid container>
                                                <Grid.Row centered verticalAlign="middle" style={{padding: "0 0 0 0"}}>
                                                    <Grid.Column>
                                                        <Header as='h5' textAlign="center" style={{height: "15px"}}>Attendee
                                                            List</Header>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row id='attendee' stretched>
                                                    <List ordered horizontal>
                                                        {this.state.arrRSVP.map((value) =>
                                                            <List.Item key={value}>
                                                                {value}
                                                                <Button style={{backgroundColor: 'transparent'}}
                                                                        type='button' size='tiny'
                                                                        value={value}
                                                                        onClick={() => this.handleRemove(value)}
                                                                        icon circular>
                                                                    <Icon color='red' name='close'/>
                                                                </Button>
                                                            </List.Item>)}
                                                    </List>
                                                </Grid.Row>
                                            </Grid>
                                        ) : ""}
                                </Form.Group>
                                <Divider style={{backgroundColor: "paleturquoise"}}/>
                                <Form.Input name='eventDescription' value={this.state.eventDescription}
                                            control={TextArea}
                                            label='Event Description' placeholder='Ex. New Year Party'
                                            onChange={this.handleChange}/>
                                <Form.Button color="green" icon labelPosition='right'>Submit/Download<Icon
                                    name="download"/></Form.Button>
                                {this.state.error.length !== 0 ? <Message
                                    error
                                    header='Action Forbidden'
                                    list={this.state.error}
                                /> : ""}
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default App;
