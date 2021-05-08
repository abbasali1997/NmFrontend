import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import '../styles/upload-data.css';

class UploadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            imageUrl: 'https://icons-for-free.com/iconfiles/png/512/upload+icon+upload+line+icon+icon-1320073121636456908.png',
            firstName: '',
            lastName: '',
            DOB: '',
            bloodGroup: 'A Positive',
            sex: 'Male',
            maritalStatus: 'Single',
            email: '',
            phoneNumber: '',
            height: '',
            weight: '',
            address: '',
            city: '',
            country: '',
            description: ''
        };
        this.onDrop = this.onDrop.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture[0],
        });
        console.log(picture);
        const image = URL.createObjectURL(picture[0]);
        this.setState({
            imageUrl: image,
        })
    }

    render() {
        return (
            <div className='container d-flex flex-column justify-content-center'>
                <form id='patientForm' className="row mb-5">
                    <div className="col-12 col-lg-6">
                        <div className="row g-3">
                            <h2>Patient Form</h2>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">First Name</label>
                                <input type="text" className="patientFormInput form-control" id="inputFirstName" name='firstName' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Last Name</label>
                                <input type="text" className="patientFormInput form-control" id="inputLastName" name='lastName' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDOB" className="patientFormLabel form-label">Date Of Birth</label>
                                <input type="date" className="patientFormInput form-control" id="inputDOB" name='DOB' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSex" className="patientFormLabel form-label">Blood Group</label>
                                <select id="inputSex" className="patientFormSelect form-select" name='bloodGroup' onChange={this.handleChange} defaultValue='A Positive'>
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
                                <select id="inputSex" className="patientFormSelect form-select" name='sex' onChange={this.handleChange} defaultValue='Male'>
                                    <option className='patientFormOption'>Male</option>
                                    <option className='patientFormOption'>Female</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputMaritalStatus" className="patientFormLabel form-label">Marital Status</label>
                                <select id="inputMaritalStatus" className="patientFormSelect form-select" name='maritalStatus' onChange={this.handleChange} defaultValue='Single'>
                                    <option className='patientFormOption'>Single</option>
                                    <option className='patientFormOption'>Married</option>
                                    <option className='patientFormOption'>Divorced</option>
                                    <option className='patientFormOption'>Separated</option>
                                    <option className='patientFormOption'>Widowed</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail" className="patientFormLabel form-label">Email</label>
                                <input type="text" className="patientFormInput form-control" id="inputEmail" name='email' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPhone" className="patientFormLabel form-label">Phone Number</label>
                                <input type="text" className="patientFormInput form-control" id="inputPhone" name='phoneNumber' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">Height (meters)</label>
                                <input type="text" className="patientFormInput form-control" id="inputFirstName" placeholder='1.75 m' name='height' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Weight (pounds)</label>
                                <input type="text" className="patientFormInput form-control" id="inputLastName" placeholder='150 lbs' name='weight' onChange={this.handleChange}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="patientFormLabel form-label">Address</label>
                                <input type="text" className="patientFormInput form-control" id="inputAddress"
                                       placeholder="1234 Main St" name='address' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="patientFormLabel form-label">City</label>
                                <input type="text" className="patientFormInput form-control" id="inputCity" name='city' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCountry" className="patientFormLabel form-label">Country</label>
                                <input type="text" className="patientFormInput form-control" id="inputCountry" name='country' onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-12">
                                <div className="">
                                    <label htmlFor="exampleFormControlTextarea1" className="patientFormLabel form-label">Patient's description (Optional)</label>
                                    <textarea className="patientFormInput form-control" id="exampleFormControlTextarea1" name='description' rows="3" onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="imageColumn" className="col-12 col-lg-6">
                        <img src={this.state.imageUrl} style={{width: '50%'}} className='d-block m-auto mt-5' />
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose CXR image'
                            onChange={this.onDrop}
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
