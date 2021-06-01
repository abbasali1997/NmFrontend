import React, { Component } from 'react';
import axios from 'axios';
import { storage } from '../firebase/index';
import Loader from "react-loader-spinner";

const API = '/api';

class ReportDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportId: this.props.location.pathname.split('/').pop(),
            reportData: {},
            imageUrl: '',
            loader: true,
        }
    }

    componentDidMount = () => {
        const storageRef = storage.ref();
        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            axios({
                method: 'get',
                url: `${API}/report/${this.state.reportId}`,
                params: {
                    userId: JSON.parse(localStorage.getItem('user'))._id,
                }
            })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    storageRef.child(`images/${data._id}.${data.imageType}`).getDownloadURL()
                        .then((url) => {
                            this.setState({
                                reportData: { ...data },
                                imageUrl: url,
                                loader: false,
                            })
                        })
                        .catch((error) => {
                            // Handle any errors
                            console.log(error);
                        });
                });
        }
    }

    render() {
        const { reportData } = this.state;
        const style = (reportData.pneumothorax) ? { color: 'red' } : { color: 'limegreen' };
        const pneumothorax = (reportData.pneumothorax) ? 'POSITIVE' : 'NEGATIVE';
        const DOB = new Date(Date.parse(reportData.DOB)).toLocaleDateString();

        const loader = (this.state.loader)
            ? (<div id="loaderContainer"
                className="d-flex flex-column justify-content-center align-items-center w-100"
                style={{ position: 'fixed', top: '0', left: '0', height: '100vh', background: 'rgb(0 0 0 / 90%)' }}>
                <Loader type="Circles" color="#00BFFF" height={80} width={80} />
                <h4 className="text-center mt-4" style={{ color: "#00BFFF", fontWeight: 'bold' }}>Loading Data</h4>
            </div>) : null;

        return (
            <div className='container d-flex flex-column justify-content-center'>
                {loader}
                <h2 className="text-center" style={{ color: 'white' }}>Patient Report</h2>
                <div className="row">
                    <div className="col-12 col-lg-6 d-flex flex-column">
                        <div className="my-3 p-2 flex-grow-1 d-flex flex-column justify-content-center"
                            style={{ background: "#212529", color: 'white' }}>
                            <h5><b>Patient's CXR:</b></h5>    
                            <img src={this.state.imageUrl}
                                style={{ width: '60%', maxHeight: '100%' }}
                                className='d-block m-auto mt-5'
                                alt="patient's x-ray" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan="3"><b>ID:</b><span className="ms-4">{reportData._id}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>First Name:</b><span className="ms-4">{reportData.firstName}</span></td>
                                    <td colSpan="2"><b>Last Name:</b><span className="ms-4">{reportData.lastName}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>Date Of Birth:</b><span className="ms-4">{DOB}</span></td>
                                    <td colSpan="2"><b>Age:</b><span className="ms-4">23</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>Sex:</b><span className="ms-4">{reportData.sex}</span></td>
                                    <td colSpan="2"><b>Marital Status:</b><span className="ms-4">{reportData.maritalStatus}</span></td>
                                </tr>
                                <tr>
                                    <td><b>Blood Group:</b><span className="ms-4">{reportData.bloodGroup}</span></td>
                                    <td><b>Height:</b><span className="ms-4">{reportData.height} cm</span></td>
                                    <td><b>Weight:</b><span className="ms-4">{reportData.weight} lbs</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Email:</b><span className="ms-4">{reportData.email}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Phone#:</b><span className="ms-4">{reportData.phoneNumber}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Address:</b><span className="ms-4">{reportData.address}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Description:</b><br />
                                        {reportData.description}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan="2"><b>Doctor's name:</b><span className="ms-4">Dr. {reportData.doctorName}</span></td>
                                    <td colSpan="2"><b>Speciality:</b><span className="ms-4">{reportData.doctorSpeciality}</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan="2"><b>Pneumothorax:</b><span className="ms-4" style={style}>{pneumothorax}</span></td>
                                    <td colSpan="2"><b>Diagnosis:</b><span className="ms-4">{reportData.diagnosis}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

export default ReportDetail;