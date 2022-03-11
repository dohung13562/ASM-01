import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DEPARTMENTS, STAFFS } from './shared/staffs';
import './App.css';
import Header from './components/HeaderComponent';
import StaffList from './components/ListInfomation';
import StaffsInfomation from './components/StaffsInfomation';
import Department from './components/Department';
import StaffSalary from './components/StaffSalary';
import Footer from './components/FooterComponent';


class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      staffId: null,
      staffdepartment: null,
    }
  }

  onchangeStaffId(staffId) {
    this.setState({ staffId: staffId })

} 
render() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element = { <StaffList staffs = 
                     {STAFFS} onClick = {(staffId) => this.onchangeStaffId(staffId) }/> }/>
          <Route path={"/staff/" + this.state.staffId} element = {<StaffsInfomation staff={ STAFFS.filter((staff) => staff.id === this.state.staffId)[0] }/> }/>
          <Route path="/department" element = {<Department apartments={DEPARTMENTS}/> }/>
          <Route path="/salary" element = {<StaffSalary staffs={STAFFS} />}></Route>
        </Routes>
      <Footer />
    </div>
    );
  }
}

export default App;