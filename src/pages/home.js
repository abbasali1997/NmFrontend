import React, { Component } from 'react';
import '../styles/home.css';
import {NavLink} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
     return (
         <div id='bg' className='container-fluid p-0 m-0'>
             <div id='homeContentContainer' className="container-fluid w-50 m-0 ps-5 d-flex align-items-center">
                 <div>
                     <p id='heading' className='mb-4'>Quick Diagnoses With AI Solution</p>
                     <p id='para' className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur leo quam, at dictum leo porttitor a. Pellentesque vel felis non lorem faucibus viverra. Suspendisse non cursus lacus. In auctor leo non dolor lacinia, ut iaculis erat scelerisque.</p>
                     <div className=''>
                         <NavLink exact to="/upload"><button type="button" className="homeBtn btn btn-outline-warning me-2" st>Try It Now</button></NavLink>
                     </div>
                 </div>
             </div>
         </div>
     )
    }
}

export default Home;
