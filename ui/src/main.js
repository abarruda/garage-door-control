"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
var Image = require('react-bootstrap').Image;
var PageHeader = require('react-bootstrap').PageHeader;
var Row = require('react-bootstrap').Row;
require('./config/globalConfigs.js');

// https://icons8.com/web-app/20157/garage-open
var garageOpenData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB7klEQVRoQ+2a600DMRCEJxVAB9ABUAFQAXQAHVALHUAH0AFUAFQAJUAFoDnZaOPcWuu7tSxFayk/Ivn25pt9xJdkgz1Zmz3hQE+QUwA3AK6TWU8AHgG89zDPG+QqCaf4Q0XwNwBC8fXsBbUWhGLPFfEfAF4APCSxtwAuAJwI8RLqFQDfL1pLQCheOi9vTPEUTre/FEXHCZxgEorbZaaaoKwgvDnF09Fc81kny4PO18RrLmcoxmV8uRiPcRlfM+V/fw0ki6dzbFy5GDy71+RcpW6YaZrEVwnFAcFMq1AlSJ40dEiK/xHC6ZKXeI2LUDn7BDsQGwlFDVsTUIK8VcTT/ZErZ2oO6ozCJMhvUnqf0thl3ju4wUphud+lWBPDHIh1ADhoWhUiGx8gq2x0vDgy4mimS6jmjJRj2UVFYxB+blwW1zSD5Asa7+2+vZymi0FGjeUtwcKeAGnJyCcAHjrnFk8M07HCuIZmhMfuI0Uon1nK03SNaSiI0WzTtgDRxpzJvo6b3MZvR42m0G4gLVPLpMy4KXqkmkKji57bIiOREc960g6HcWgEoDVbpwTshI1mj2bvVGtRWlFaUVp1B6JHokeiR6JHJgfUX6w0f0Y/s1d1SXH86p5/x5hb/H27/KNAp5bYCWvSNcpldxP2BuQPIvjDM0oi1I8AAAAASUVORK5CYII=";
//https://icons8.com/web-app/20156/garage-closed
var garageClosedData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB10lEQVRoQ+2a0U3EMBBE5yqADqADoALoAKgAOqAWOoAOoAOoAKgASoAKDr3IRnsmjhzHUSBaS/dxkr2ZNzu3H+dstJK1WQmH5gQ5lnQl6SKY9SDpXtLrHOa1BjkPwhG/nxH8KQkoPo+toKaCIPY0I/5N0pOkuyD2WtKZpCMj3kI9S+J71aoBQbx13j4Y8QjH7Y+MosMADpiFYrvt1CioUhAejngcjZmPOokHzg+Jz7kcoahLfbuoR13q50z52T8EEsXjHD9cuyge3Rvl3EBu6DQm8UmhGBB0OguVgsRJg0NW/JcRjkutxOe4gIrdB2zPbAQKDTsT0IK8DIjH/SVX7FQf1AnCLMg2KL0NbZxl3jdwg6QQ95tQq2PoAykdAA00TSoRjXeQSTY2POwdaWhmk1KjO5KO5SYqRhZh/F8mZ0aDxAMjn918ezpNq0GWGss7go09DuIdmfhr8WgNToeJ7tYc9454R2pyU3DGo+XRKohJzRaPlkerJjcFZzxaHq2CmNRs8Wh5tGpyU3DGo+XRKohJzZZFo/Uuiau7vsW9S3c5U7gWBeHy8iAjlJvf9E5yiGlRkEKzi7Y5SJFNf2jTr6s3rnx5HeM/Le7duxcYlvo/t7lZqwH5BmPFwjM4vQU4AAAAAElFTkSuQmCC";

var imageSrcUrl = "http://" + window.globalConfigs.server + "/preview";

var Enclosure = React.createClass({

	getInitialState: function() {
		return {
			state: "CLOSED",
			key: 1, 
			url: imageSrcUrl,
			toggle: false};
	},

	refreshPicture: function () {
		this.setState({key: Math.random(), url: imageSrcUrl + "?key=" + this.state.key});
	},

	componentDidMount: function() {
		setInterval(this.refreshPicture, 5000);
	},

	toggle: function(value) {
		if (this.state.state === "CLOSED") {
			//this.setState({state: "OPEN"});
			this.setState({state: "moving"});
		} else {
			this.setState({state: "CLOSED"});
		}
	},

	renderButton: function() {
		if (this.state.state === "CLOSED") {
			return (
				<Button bsStyle="success" bsSize="large" onClick={this.toggle} block>
					<Image src={garageClosedData} width="50" height="50" />
				</Button>
				);
		} else if (this.state.state === "OPEN") {
			return (
				<Button bsStyle="danger" bsSize="large" onClick={this.toggle} block>
					<Image src={garageOpenData} width="50" height="50" />
				</Button>
				);
		} else {
			return (
				<Button bsStyle="warning" bsSize="large" onClick={this.toggle} block>
					<i>DOOR MOVING</i>
				</Button>
				);
		}
	},

	renderDescription: function() {
		if (this.state.state === "CLOSED") {
			return "Press button to open garage";
		} else if (this.state.state === "OPEN") {
			return "Press button to close garage";
		} else {
			return "";
		}
		
	},

	render: function() {
		return (
			<div className="container-fluid" ref="parentContainer">				
				<div className="row">
					<div className="col-sm-4">
						<Grid>
						<PageHeader>Garage Control</PageHeader>
						</Grid>

						<Grid>
							<Row>
								<Image src={this.state.url} responsive/>
							</Row>
							<Row>
								{this.renderButton()}
							</Row>
							<Row>
								{this.renderDescription()}
							</Row>
						</Grid>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Enclosure />, document.getElementById('app'));

module.exports = Enclosure;