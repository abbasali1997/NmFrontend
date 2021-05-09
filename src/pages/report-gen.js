import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import UploadData from '../components/upload-data';
import Report from '../components/report';
import axios from 'axios';

class ReportGeneration extends Component {
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
            description: '',
            doctorName: '',
            doctorSpeciality: '',
            showComponent: 'form',
            loader: false,
            result: {},
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const defaultImage = 'https://icons-for-free.com/iconfiles/png/512/upload+icon+upload+line+icon+icon-1320073121636456908.png'
        if (this.state.imageUrl !== defaultImage) {
            const formData = new FormData();
            this.setState({ loader: true });
            formData.append("file", this.state.picture);
            axios.post('/uploader', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                return res.data;
            }).then(data => {
                console.log(data);
                this.setState({ 
                    showComponent: 'report', 
                    loader: false, 
                    result: {
                        pneumothorax: (data.result !== "Normal") ? true : false,
                        diagnosis: data.result
                    } 
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    onDrop(picture) {
        this.setState({
            picture: picture[0],
        });
        console.log(picture[0]);
        const image = URL.createObjectURL(picture[0]);
        this.setState({
            imageUrl: image,
        })
    }

    render() {
        const page = (this.state.showComponent === 'form') 
                    ? (<UploadData handleSubmit={this.handleSubmit}
                                  handleChange={this.handleChange} 
                                  onDrop={this.onDrop}
                                  {...this.state}/>)
                    : (<Report {...this.state}/>);  
        const loader = (this.state.loader) 
                    ? (<div id="loaderContainer" 
                    className="d-flex flex-column justify-content-center align-items-center w-100"
                    style={{position: 'fixed', top: '0', left: '0', height: '100vh', background: 'rgb(33 150 243 / 16%)'}}>                
                   <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
                   <h4 className="text-center mt-4" style={{color: "#00BFFF", fontWeight: 'bold'}}>Calculating Results</h4>
               </div>) : null;                       
        return (
            <div>
                {loader}
                {page}
            </div>
        )
    }
}

export default ReportGeneration;
