(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{174:function(e,t,a){e.exports=a(312)},179:function(e,t,a){},180:function(e,t,a){},312:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(35),l=a.n(o),s=(a(179),a(142)),i=a(143),c=a(144),u=a(163),m=a(162),d=(a(180),a(181),a(328)),h=a(329),p=a(330),E=a(29),g=a(331),R=a(324),v=a(323),y=a(327),S=a(325),P=a(322),C=a(326),V=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={eventName:"",eventLocation:"",start:"",end:"",eventDescription:"",repeat:"No Repeat",class:"PUBLIC",priority:"9",error:[],timezone:"",RSVP:!1,toRSVP:"",arrRSVP:[],GEO:"",sender:"",resources:[],resource:"",emailError:!1,repeatOptions:[{key:"n",value:"No Repeat",text:"No Repeat"},{key:"d",value:"DAILY",text:"Daily"},{key:"w",value:"WEEKLY",text:"Weekly"},{key:"m",value:"MONTHLY",text:"Monthly"},{key:"y",value:"YEARLY",text:"Yearly"}],classOptions:[{key:"u",value:"PUBLIC",text:"Public"},{key:"r",value:"PRIVATE",text:"Private"},{key:"s",value:"CONFIDENTIAL",text:"Confidential"}],priorityOptions:[{key:"l",value:"9",text:"Low"},{key:"m",value:"5",text:"Medium"},{key:"h",value:"1",text:"High"}]},e.submit=function(t){t.preventDefault();var a=document.createElement("a"),n=new Date,r=!1,o=[];new Date(e.state.start)>new Date(e.state.end)&&(r=!0,o.push("The event start date cannot be later than the event end date!"));var l=n.getFullYear()+"0"+(n.getMonth()+1)+("0"+n.getDate()).slice(-2)+"T"+("0"+n.getHours()).slice(-2)+("0"+n.getMinutes()).slice(-2)+("0"+n.getSeconds()).slice(-2),s="",i="",c="",u=Intl.DateTimeFormat().resolvedOptions().timeZone,m="",d="RESOURCE:";"No Repeat"!==e.state.repeat&&(s+="RRULE:FREQ="+e.state.repeat+"\r\n"),""!==e.state.class&&(i+="CLASS:"+e.state.class+"\r\n"),""!==e.state.priority&&(c+="PRIORITY:"+e.state.priority+"\r\n"),!0===e.state.RSVP&&e.state.arrRSVP.forEach((function(e){return m+="ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;\r\n RSVP=TRUE:MAILTO:"+e+"\r\n"})),0!==e.state.resources.length&&(e.state.resources.forEach((function(e){return d.substring(d.indexOf("\n")).length+e.length>28?d+="\r\n ".concat(e,","):d+="".concat(e,",")})),d=d.substring(0,d.length-1),d+="\r\n"),a.setAttribute("href","data:text/calendar;charset=utf-8,BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Team-emm-too//Kalendae//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n"+e.state.timezone+"\r\nBEGIN:VEVENT\r\nUID:"+l+"-kalendae@ics414.com\r\nSEQUENCE:0\r\nDTSTAMP;TZID="+u+":"+l+"\r\nDTSTART;TZID="+u+":"+e.state.start.split("-").join("").replace(":","")+"00\r\nDTEND;TZID="+u+":"+e.state.end.split("-").join("").replace(":","")+"00\r\nSUMMARY:"+e.state.eventName+"\r\nDESCRIPTION:"+e.state.eventDescription+"\r\nLOCATION:"+e.state.eventLocation+"\r\nGEO:"+e.state.GEO+"\r\n"+s+i+c+"ORGANIZER:MAILTO:"+e.state.sender+"\r\n"+m+d+"END:VEVENT\r\nEND:VCALENDAR\r\n"),r?(console.log("error"),e.setState({error:o})):(a.setAttribute("download",e.state.eventName+".ics"),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),e.setState({eventName:"",eventLocation:"",start:"",end:"",eventDescription:"",repeat:"No Repeat",class:"PUBLIC",priority:"9",error:[],RSVP:!1,toRSVP:"",arrRSVP:[],GEO:"",sender:"",resources:[],resource:"",emailError:!1}))},e.handleChange=function(t){e.setState(Object(s.a)({},t.target.name,t.target.value))},e.handlePlaceChange=function(t){e.setState({eventLocation:t.formatted_address,GEO:"".concat(t.geometry.location.lat(),";").concat(t.geometry.location.lng())})},e.showRSVP=function(){e.setState({RSVP:!e.state.RSVP})},e.handleRSVP=function(){var t=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(e.state.toRSVP);if(t&&-1===e.state.arrRSVP.indexOf(e.state.toRSVP)){var a=e.state.arrRSVP;a.push(e.state.toRSVP),e.setState({arrRSVP:a,toRSVP:"",emailError:!1})}else!1===t?e.setState({emailError:!0}):e.setState({toRSVP:"",emailError:!1})},e.handleResources=function(){if(-1===e.state.resources.indexOf(e.state.resource)){var t=e.state.resources;t.push(e.state.resource),e.setState({resources:t,resource:""})}else e.setState({resource:""});console.log(e.state.resources)},e.handleRemove=function(t){var a=e.state.arrRSVP.indexOf(t),n=e.state.arrRSVP.slice();n.splice(a,1),e.setState({arrRSVP:n}),console.log(a,n)},e.handleResourceRemove=function(t){var a=e.state.resources.indexOf(t),n=e.state.resources.slice();n.splice(a,1),e.setState({resources:n}),console.log(a,n,t)},e.initAutocomplete=function(){var t=document.getElementById("pac-input"),a=new window.google.maps.places.Autocomplete(t);a.addListener("place_changed",(function(){var t=a.getPlace();e.handlePlaceChange(t)}))},e.handleEnter=function(t){13===t.which&&(t.preventDefault(),"resource"===t.target.name?e.handleResources():"toRSVP"===t.target.name&&e.handleRSVP())},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=Intl.DateTimeFormat().resolvedOptions().timeZone,t=new XMLHttpRequest;t.responseType="text",t.onreadystatechange=function(){if(4===t.readyState&&200===t.status){var e=t.response.split("\r\n"),a=e.slice(e.indexOf("BEGIN:VTIMEZONE"),e.indexOf("END:VTIMEZONE")+1).join("\r\n");this.setState({timezone:a})}}.bind(this),t.open("GET","https://cors-anywhere.herokuapp.com/http://tzurl.org/zoneinfo-outlook/".concat(e)),t.send(),this.initAutocomplete()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(d.a,{size:"huge",inverted:!0},r.a.createElement(h.a,{style:{margin:"3px 0px 2px 0px"}},r.a.createElement(h.a.Row,null,r.a.createElement(h.a.Column,null,r.a.createElement(p.a,{as:"h1",textAlign:"center",style:{color:"white"}},r.a.createElement(E.a,{name:"calendar alternate",color:"blue"})," Kalendae"))))),r.a.createElement(h.a,{container:!0,stretched:!0},r.a.createElement(h.a.Column,null,r.a.createElement(p.a,{as:"h2",textAlign:"center",className:"white"},"Add an Event!"),r.a.createElement(g.a,null,r.a.createElement(R.a,{onSubmit:this.submit,error:!0},r.a.createElement(R.a.Input,{style:{paddingBottom:"30px"},required:!0,fluid:!0,name:"eventName",value:this.state.eventName,label:"Event Name",placeholder:"Ex. New Year Party",onChange:this.handleChange}),r.a.createElement(v.a,{style:{backgroundColor:"paleturquoise"}}),r.a.createElement(R.a.Group,{widths:"equal",style:{paddingBottom:"30px"}},r.a.createElement(R.a.Input,{id:"pac-input",required:!0,name:"eventLocation",value:this.state.eventLocation,label:"Location",placeholder:"Ex. 1234 Foo St. Honolulu, HI 96821",onChange:this.handleChange}),r.a.createElement(R.a.Input,{required:!0,name:"start",value:this.state.start,label:"Start Date",type:"datetime-local",onChange:this.handleChange}),r.a.createElement(R.a.Input,{required:!0,name:"end",value:this.state.end,label:"End Date",type:"datetime-local",onChange:this.handleChange})),r.a.createElement(v.a,{style:{backgroundColor:"paleturquoise"}}),r.a.createElement(R.a.Group,{widths:"equal",style:{paddingBottom:"30px"}},r.a.createElement(R.a.Select,{name:"repeat",value:this.state.repeat,label:"Repeat",options:this.state.repeatOptions,onChange:function(t,a){var n=a.value;e.setState({repeat:n})}}),r.a.createElement(R.a.Select,{name:"classification",value:this.state.class,label:"Classification",options:this.state.classOptions,onChange:function(t,a){var n=a.value;e.setState({class:n})}}),r.a.createElement(R.a.Select,{name:"priority",value:this.state.priority,label:"Priority",options:this.state.priorityOptions,onChange:function(t,a){var n=a.value;e.setState({priority:n})}})),r.a.createElement(v.a,{style:{backgroundColor:"paleturquoise"}}),r.a.createElement(R.a.Group,{style:{paddingBottom:"30px"}},r.a.createElement(R.a.Input,{action:r.a.createElement(y.a,{type:"button",onClick:this.handleResources,icon:!0},r.a.createElement(E.a,{color:"green",name:"add"})),type:"text",value:this.state.resource,name:"resource",label:"Resources",placeholder:"Ex. Projector, Camera, etc.",onChange:this.handleChange,onKeyDown:this.handleEnter}),r.a.createElement(h.a,{container:!0},r.a.createElement(h.a.Row,{centered:!0,verticalAlign:"middle",style:{padding:"0 0 0 0"}},r.a.createElement(h.a.Column,null,r.a.createElement(p.a,{as:"h5",textAlign:"center",style:{height:"15px"}},"Resource List"))),r.a.createElement(h.a.Row,{id:"resource",stretched:!0},r.a.createElement(S.a,{ordered:!0,horizontal:!0},this.state.resources.map((function(t){return r.a.createElement(S.a.Item,{key:t},t,r.a.createElement(y.a,{style:{backgroundColor:"transparent"},type:"button",size:"tiny",value:t,onClick:function(){return e.handleResourceRemove(t)},icon:!0,circular:!0},r.a.createElement(E.a,{color:"red",name:"close"})))})))))),r.a.createElement(v.a,{style:{backgroundColor:"paleturquoise"}}),r.a.createElement(R.a.Group,null,r.a.createElement(R.a.Radio,{name:"RSVP",label:"RSVP",toggle:!0,onChange:this.showRSVP})),r.a.createElement(R.a.Group,{style:{paddingBottom:"40px"}},!0===this.state.RSVP&&!1===this.state.emailError?r.a.createElement(R.a.Input,{id:"toRSVP",action:r.a.createElement(y.a,{type:"button",onClick:this.handleRSVP,icon:!0},r.a.createElement(E.a,{color:"green",name:"add"})),type:"email",value:this.state.toRSVP,multiple:!0,name:"toRSVP",label:"RSVP To",placeholder:"Ex. attendee@email.com",onChange:this.handleChange,onKeyDown:this.handleEnter}):this.state.emailError&&this.state.RSVP?r.a.createElement(R.a.Input,{id:"toRSVP",error:{content:"Please enter a valid email",pointing:"below"},action:r.a.createElement(y.a,{type:"button",onClick:this.handleRSVP,icon:!0},r.a.createElement(E.a,{color:"green",name:"add"})),type:"email",value:this.state.toRSVP,multiple:!0,name:"toRSVP",label:"RSVP To",placeholder:"Ex. attendee@email.com",onChange:this.handleChange,onKeyDown:this.handleEnter}):"",!0===this.state.RSVP?r.a.createElement(R.a.Input,{required:!0,type:"email",value:this.state.sender,name:"sender",label:"Organizer Email",placeholder:"Ex. organizer@email.com",onChange:this.handleChange}):"",!0===this.state.RSVP?r.a.createElement(h.a,{container:!0},r.a.createElement(h.a.Row,{centered:!0,verticalAlign:"middle",style:{padding:"0 0 0 0"}},r.a.createElement(h.a.Column,null,r.a.createElement(p.a,{as:"h5",textAlign:"center",style:{height:"15px"}},"Attendee List"))),r.a.createElement(h.a.Row,{id:"attendee",stretched:!0},r.a.createElement(S.a,{ordered:!0,horizontal:!0},this.state.arrRSVP.map((function(t){return r.a.createElement(S.a.Item,{key:t},t,r.a.createElement(y.a,{style:{backgroundColor:"transparent"},type:"button",size:"tiny",value:t,onClick:function(){return e.handleRemove(t)},icon:!0,circular:!0},r.a.createElement(E.a,{color:"red",name:"close"})))}))))):""),r.a.createElement(v.a,{style:{backgroundColor:"paleturquoise"}}),r.a.createElement(R.a.Input,{name:"eventDescription",value:this.state.eventDescription,control:P.a,label:"Event Description",placeholder:"Ex. New Year Party",onChange:this.handleChange}),r.a.createElement(R.a.Button,{color:"green",icon:!0,labelPosition:"right"},"Submit/Download",r.a.createElement(E.a,{name:"download"})),0!==this.state.error.length?r.a.createElement(C.a,{error:!0,header:"Action Forbidden",list:this.state.error}):"")))))}}]),a}(r.a.Component);l.a.render(r.a.createElement(V,null),document.getElementById("root"))}},[[174,1,2]]]);
//# sourceMappingURL=main.2e9795bf.chunk.js.map