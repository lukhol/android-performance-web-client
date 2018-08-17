import React, { Component } from 'react';

//React charts:
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//React bootstrap:
import { Row, Col, Panel } from 'react-bootstrap';

export default class TestSummaryCharComponent extends Component {
    constructor(props) {
       super(props);

       this.prepareDataForChart = this.prepareDataForChart.bind(this);
       this.prepareChartsArray = this.prepareChartsArray.bind(this);

       this.state = {
           testResults: this.props.testResults
       }

       this.testTitles = new Map();
       this.testTitles.set('START_UP', 'Startup time');
       this.testTitles.set('ARITHMETIC', 'Arithmetic operations');
       this.testTitles.set('JSON_SERIALIZATION', 'Json serialization');
       this.testTitles.set('JSON_DESERIALIZATION', 'Json deserialization');
       this.testTitles.set('READ_FROM_DEVICE', 'Load file from device');
       this.testTitles.set('SAVE_TO_DEVICE', 'Save file to device');
       this.testTitles.set('SAVE_TO_DATABASE', 'Save to database');
       this.testTitles.set('LOAD_FROM_DATABASE', 'Load from database');
       this.testTitles.set('READ_LAT_LNG', 'Get device location');
       this.testTitles.set('REST_QUERIES', 'Perform rest queries');
    }

    prepareDataForChart(testResults) {
        const data = [];

        if(testResults != null) {
            const nativeTests = [];
            const xamarinFormsTests = [];
            const cordovaTests = [];

            for(let singleTest of testResults.tests) {
                switch(singleTest.applicationType) {
                    case 'NATIVE': {
                        nativeTests.push(singleTest);
                        break;
                    }

                    case 'XAMARIN_FORMS': {
                        xamarinFormsTests.push(singleTest);
                        break;
                    }

                    case 'CORDOVA': {
                        cordovaTests.push(singleTest);
                        break;
                    }

                    default:
                        break;
                }
            }

            let smallestArraySize = Math.min(nativeTests.length, xamarinFormsTests.length, cordovaTests.length);

            for(let i = 0 ; i < smallestArraySize ; i++) {
                let testCode = nativeTests[i].testCode;
                data.push({
                    name: this.testTitles.get(testCode.trim()) + " " + testResults.androidVersion,
                    native: nativeTests[i].time,
                    xamarinForms: xamarinFormsTests.find(item => item.testCode === testCode).time,
                    cordova: cordovaTests.find(item => item.testCode === testCode).time
                });
            }
        }
 
        return data;
    }

    prepareChartsArray(data, i) {
        const charts = [];
        for(let singleData of data) {
            charts.push(
                <Col xs={12} md={6} lg={4} className="center-block" key={i++}>
                    <h3> {singleData.name} </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart width={500} 
                                height={300} data={[singleData]}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="native" fill="#8884d8" />
                            <Bar dataKey="cordova" fill="#82ca9d" />
                            <Bar dataKey="xamarinForms" fill="#8a44c1" />
                        </BarChart>
                    </ResponsiveContainer>
                    <br/>
                </Col>
            );
        }  

        return charts;
    }

    render() {
        const data = this.prepareDataForChart(this.state.testResults);
        const charts = this.prepareChartsArray(data, 0); 
        const startupSectionArray = this.state.testResults != null ? this.prepareChartsArray([{
            name: this.testTitles.get(this.state.testResults.startupTest.testCode.trim()),
            native: this.state.testResults.startupTest.results[0].thisTime,
            cordova: this.state.testResults.startupTest.results[1].thisTime,
            xamarinForms: this.state.testResults.startupTest.results[2].thisTime
        }], 100) : "";
        
        charts.unshift(startupSectionArray[0]);

        return (
            <Panel className={this.props.left != undefined ? "slideIn-left" : "slideIn-right"}>
                <Panel.Heading>
                    <Row>
                        <Col xs={6} className="text-center">
                            <h4>{this.state.testResults.date}</h4>
                        </Col>
                        <Col xs={6} className="text-center">
                            <h4>Android version: {this.state.testResults.androidVersion}</h4>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        {charts}
                    </Row>
                </Panel.Body>
                <Panel.Footer>
                    TestId: {this.state.testResults.testId}
                </Panel.Footer>
            </Panel>
        );
    }
}