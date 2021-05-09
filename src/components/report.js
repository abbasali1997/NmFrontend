import React, { Component } from 'react';
import '../styles/report.css';

class Report extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const result = (this.props.result.pneumothorax) 
                            ? (
                            <div>
                                <h5 className="text-center">Pneumothorax</h5>
                                <h1 className="text-center" style={{color: 'red'}}>Detected</h1>
                                
                                <h5 className="text-center mt-5">Diagnosis</h5>
                                <h1 className="text-center" style={{color: 'cadetblue'}}>{this.props.result.diagnosis}</h1>
                            </div>
                            )
                            : (
                                <div>
                                    <h5 className="text-center">Pneumothorax</h5>
                                    <h1 className="text-center" style={{color: 'limegreen'}}>Not Detected</h1>
                                </div>
                            );
        return (
            <div className='container d-flex flex-column justify-content-center'>
                <div className="row">
                    <div className="col-12 col-lg-6 reportCol">
                        <h3 className="reportH3 text-center">Patient's Information</h3>
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colspan="2"><b>First Name:</b><span className="ms-4">{this.props.firstName}</span></td>
                                    <td colspan="2"><b>Last Name:</b><span className="ms-4">{this.props.lastName}</span></td>       
                                </tr>
                                <tr>
                                    <td colspan="2"><b>Date Of Birth:</b><span className="ms-4">{this.props.DOB}</span></td>
                                    <td colspan="2"><b>Age:</b><span className="ms-4">23</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><b>Sex:</b><span className="ms-4">{this.props.sex}</span></td>
                                    <td colspan="2"><b>Marital Status:</b><span className="ms-4">{this.props.maritalStatus}</span></td>
                                </tr>
                                <tr>
                                    <td><b>Blood Group:</b><span className="ms-4">{this.props.bloodGroup}</span></td>
                                    <td><b>Height:</b><span className="ms-4">{this.props.height} cm</span></td>
                                    <td><b>Weight:</b><span className="ms-4">{this.props.weight} lbs</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><b>Email:</b><span className="ms-4">{this.props.email}</span></td>
                                    <td colspan="2"><b>Phone#:</b><span className="ms-4">{this.props.phoneNumber}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Address:</b><span className="ms-4">{this.props.address}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><b>City:</b><span className="ms-4">{this.props.city}</span></td>
                                    <td colspan="2"><b>Country:</b><span className="ms-4">{this.props.country}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Description:</b><br />
                                        {this.props.description}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 className="reportH3 text-center mt-5">Doctor's Information</h3>
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colspan="2"><b>Name:</b><span className="ms-4">Dr. {this.props.doctorName}</span></td>
                                    <td colspan="2"><b>Speciality:</b><span className="ms-4">{this.props.doctorSpeciality}</span></td>       
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-lg-6 d-flex flex-column">
                        <h3 className="reportH3 text-center m-0">Result</h3>
                        <div className="my-3 flex-grow-1 d-flex flex-column justify-content-center" 
                             style={{background: "#212529", color: 'white'}}>
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;
