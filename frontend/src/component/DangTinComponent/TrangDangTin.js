import React from 'react';
// import ContentPost from './DangTinComponent/ContentPost'
import NavingTabs from './NavingTabs';
import Header from '../layout/Header'

export default class TrangDangTin extends React.Component{
    render(){
        localStorage.setItem("prevPath", this.props.location.pathname)
        return(
            <div>
                    <Header/>
                    <NavingTabs />
            </div>
            
        );
    }
}