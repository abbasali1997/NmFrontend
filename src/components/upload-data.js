import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import '../styles/upload-data.css';

class UploadData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container d-flex flex-column justify-content-center'>
                <form id='patientForm' className="row mb-5" onSubmit={this.props.handleSubmit}>
                    <div className="col-12 col-lg-6">
                        <div className="row g-3">
                            <h2>Patient Form</h2>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">First Name</label>
                                <input required type="text" className="patientFormInput form-control" id="inputFirstName" name='firstName' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Last Name</label>
                                <input required type="text" className="patientFormInput form-control" id="inputLastName" name='lastName' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDOB" className="patientFormLabel form-label">Date Of Birth</label>
                                <input required type="date" className="patientFormInput form-control" id="inputDOB" name='DOB' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSex" className="patientFormLabel form-label">Blood Group</label>
                                <select required id="inputSex" className="patientFormSelect form-select" name='bloodGroup' onChange={this.props.handleChange} defaultValue='A Positive'>
                                    <option className='patientFormOption'>A Positive</option>
                                    <option className='patientFormOption'>A Negative</option>
                                    <option className='patientFormOption'>A Unknown</option>
                                    <option className='patientFormOption'>B Positive</option>
                                    <option className='patientFormOption'>B Negative</option>
                                    <option className='patientFormOption'>B Unknown</option>
                                    <option className='patientFormOption'>AB Positive</option>
                                    <option className='patientFormOption'>AB Negative</option>
                                    <option className='patientFormOption'>AB Unknown</option>
                                    <option className='patientFormOption'>O Positive</option>
                                    <option className='patientFormOption'>O Negative</option>
                                    <option className='patientFormOption'>O Unknown</option>
                                    <option className='patientFormOption'>Unknown</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSex" className="patientFormLabel form-label">Sex</label>
                                <select required id="inputSex" className="patientFormSelect form-select" name='sex' onChange={this.props.handleChange} defaultValue='Male'>
                                    <option className='patientFormOption'>Male</option>
                                    <option className='patientFormOption'>Female</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputMaritalStatus" className="patientFormLabel form-label">Marital Status</label>
                                <select required id="inputMaritalStatus" className="patientFormSelect form-select" name='maritalStatus' onChange={this.props.handleChange} defaultValue='Single'>
                                    <option className='patientFormOption'>Single</option>
                                    <option className='patientFormOption'>Married</option>
                                    <option className='patientFormOption'>Divorced</option>
                                    <option className='patientFormOption'>Separated</option>
                                    <option className='patientFormOption'>Widowed</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail" className="patientFormLabel form-label">Email</label>
                                <input required type="text" className="patientFormInput form-control" id="inputEmail" name='email' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPhone" className="patientFormLabel form-label">Phone Number</label>
                                <input required type="text" className="patientFormInput form-control" id="inputPhone" name='phoneNumber' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">Height (meters)</label>
                                <input required type="text" className="patientFormInput form-control" id="inputFirstName" placeholder='1.75 m' name='height' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Weight (pounds)</label>
                                <input required type="text" className="patientFormInput form-control" id="inputLastName" placeholder='150 lbs' name='weight' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputAddress" className="patientFormLabel form-label">Address</label>
                                <input required type="text" className="patientFormInput form-control" id="inputAddress"
                                       placeholder="1234 Main St" name='address' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="inputCity" className="patientFormLabel form-label">City</label>
                                <input required type="text" className="patientFormInput form-control" id="inputCity" name='city' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="inputCountry" className="patientFormLabel form-label">Country</label>
                                <input required type="text" className="patientFormInput form-control" id="inputCountry" name='country' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-12">
                                <div className="">
                                    <label htmlFor="exampleFormControlTextarea1" className="patientFormLabel form-label">Patient's description (Optional)</label>
                                    <textarea className="patientFormInput form-control" id="exampleFormControlTextarea1" name='description' rows="2" onChange={this.props.handleChange}/>
                                </div>
                            </div>
                            <h5 style={{color: 'white'}}>Patient's doctor info.</h5>
                            <div className="col-md-6">
                                <label htmlFor="inputDoctorNAme" className="patientFormLabel form-label">Full Name</label>
                                <input required type="text" className="patientFormInput form-control" id="inputDoctorNAme" name='doctorName' onChange={this.props.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDoctorSpec" className="patientFormLabel form-label">Speciality</label>
                                <input required type="text" className="patientFormInput form-control" id="inputDoctorSpec" name='doctorSpeciality' onChange={this.props.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div id="imageColumn" className="col-12 col-lg-6">
                        <img src={this.props.imageUrl} style={{width: '50%'}} className='d-block m-auto mt-5' alt="upload"/>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose CXR image'
                            onChange={this.props.onDrop}
                            imgExtension={['.jpg', '.dcm']}
                            label = 'Max file size: 5mb. Accepted: jpg, dcm'
                            maxFileSize={5242880}
                            singleImage = {true}
                            withIcon = {false}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-info d-block w-25 m-auto mt-5 p-2">Calculate Results</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UploadData;
