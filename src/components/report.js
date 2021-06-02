import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import '../styles/report.css';
import Modal from './modal';
import axios from 'axios';
import { storage } from '../firebase/index';
const API = '/api';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalPopUp: false,
            modal: {
                message: '',
                action: null,
                actionMessage: '',
                closeModal: null,
                actionType: '',
            },
            loader: false,
            loaderText: ''
        }
    }
    
    closeModal = () => {
        this.setState({
            modalPopUp: false
        })
    }

    onSaveClick = () => {
        this.setState({
            modalPopUp: true,
            modal: {
                message: 'Are you sure you want to save this report?',
                action: this.saveReport,
                actionMessage: 'Save',
                closeModal: this.closeModal,
                actionType: 'info',
            }
        })
    }

    saveReport = async () => {
        this.setState({
            loader: true,
            modalPopUp: false,
            loaderText: 'Saving Report'
        });
        const storageRef = storage.ref();
        const imageType = this.props.picture.type.split('/')[1];
        const input = {
            imageType,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            DOB: new Date(this.props.DOB),
            bloodGroup: this.props.bloodGroup,
            sex: this.props.sex,
            maritalStatus: this.props.maritalStatus,
            email: this.props.email,
            phoneNumber: this.props.phoneNumber,
            height: this.props.height,
            weight: this.props.weight,
            address: this.props.address,
            description: this.props.description,
            doctorName: this.props.doctorName,
            doctorSpeciality: this.props.doctorSpeciality,
            pneumothorax: this.props.result.pneumothorax,
            diagnosis: this.props.result.diagnosis || 'none',
        };

        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            axios({
                method: 'post',
                url: `${API}/report/`,
                data: {
                    userId: JSON.parse(localStorage.getItem('user'))._id,
                    reportData: input,
                }
            })
                .then(res => res.data)
                .then(data => {
                    storageRef.child(`images/${data._id}.${imageType}`).put(this.props.picture).then((snapshot) => {
                        this.setState({
                            loaderText: 'Saved, Redirecting'
                        });
                        setTimeout(() => {                        
                            this.props.history.push(`/report-list/${data._id}`);
                        }, 2000);
                    });
                });
        }

    }

    render() {
        const loader = (this.state.loader)
            ? (<div id="loaderContainer"
                className="d-flex flex-column justify-content-center align-items-center w-100"
                style={{ position: 'fixed', top: '0', left: '0', height: '100vh', background: 'rgb(0 0 0 / 90%)' }}>
                <Loader type="Puff" color="#00BFFF" height={80} width={80} />
                <h4 className="text-center mt-4" style={{ color: "#00BFFF", fontWeight: 'bold' }}>{this.state.loaderText}</h4>
            </div>) : null;
        const result = (this.props.result.pneumothorax)
            ? (
                <div>
                    <h5 className="text-center">Pneumothorax</h5>
                    <h1 className="text-center" style={{ color: 'red' }}>Detected</h1>

                    <h5 className="text-center mt-5">Diagnosis</h5>
                    <h1 className="text-center" style={{ color: 'cadetblue' }}>{this.props.result.diagnosis}</h1>
                </div>
            )
            : (
                <div>
                    <h5 className="text-center">Pneumothorax</h5>
                    <h1 className="text-center" style={{ color: 'limegreen' }}>Not Detected</h1>
                </div>
            );
        const { modal } = this.state;
        const modalComponent = (this.state.modalPopUp) ? (
            <Modal action={modal.action}
                actionMessage={modal.actionMessage}
                actionType={modal.actionType}
                closeModal={modal.closeModal}
                message={modal.message} />
        ) : null; 
        return (
            <div className='container d-flex flex-column justify-content-center'>
                { modalComponent }
                { loader } 
                <div className="text-end">
                    <button type="button" className="btn btn-outline-light reportBtns d-inline-block mb-5" onClick={this.props.onRedoClick}>Redo <i class="ms-2 fas fa-redo"></i></button>
                    <button type="button" className="btn btn-outline-info reportBtns d-inline-block ms-3 mb-5" onClick={this.onSaveClick}>Save Report <i className="ms-2 far fa-save"></i></button>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 reportCol">
                        <h3 className="reportH3 text-center">Patient's Information</h3>
                        <table className="table table-dark table-striped mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan="2"><b>First Name:</b><span className="ms-4">{this.props.firstName}</span></td>
                                    <td colSpan="2"><b>Last Name:</b><span className="ms-4">{this.props.lastName}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>Date Of Birth:</b><span className="ms-4">{this.props.DOB}</span></td>
                                    <td colSpan="2"><b>Age:</b><span className="ms-4">23</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>Sex:</b><span className="ms-4">{this.props.sex}</span></td>
                                    <td colSpan="2"><b>Marital Status:</b><span className="ms-4">{this.props.maritalStatus}</span></td>
                                </tr>
                                <tr>
                                    <td><b>Blood Group:</b><span className="ms-4">{this.props.bloodGroup}</span></td>
                                    <td><b>Height:</b><span className="ms-4">{this.props.height} m</span></td>
                                    <td><b>Weight:</b><span className="ms-4">{this.props.weight} lbs</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Email:</b><span className="ms-4">{this.props.email}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Phone#:</b><span className="ms-4">{this.props.phoneNumber}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>Address:</b><span className="ms-4">{this.props.address}</span></td>
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
                                    <td colSpan="2"><b>Name:</b><span className="ms-4">Dr. {this.props.doctorName}</span></td>
                                    <td colSpan="2"><b>Speciality:</b><span className="ms-4">{this.props.doctorSpeciality}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-lg-6 d-flex flex-column">
                        <h3 className="reportH3 text-center m-0">Result</h3>
                        <div className="my-3 flex-grow-1 d-flex flex-column justify-content-center"
                            style={{ background: "#212529", color: 'white' }}>
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;
