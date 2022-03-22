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
      staffs: STAFFS,
      department: DEPARTMENTS
    }
    this.addStaff = this.addStaff.bind(this)
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 1000 + 1);
    const newStaff = {id, ...staff};
    this.setState({
      staffs: [...this.state.staffs, newStaff]
    })
  }

  onchangeStaffId(staffId) {
    this.setState({ staffId: staffId })
} 

render() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element = { <StaffList onAdd = {this.addStaff} staffs = {this.state.staffs} onClick = {(staffId) => this.onchangeStaffId(staffId) }/> }/>
          <Route path={"/staff/" + this.state.staffId} element = {<StaffsInfomation staff={ this.state.staffs.filter((staff) => staff.id === this.state.staffId)[0] }/> }/>
          <Route path="/department" element = {<Department apartments={this.state.department}/> }/>
          <Route path="/salary" element = {<StaffSalary staffs={this.state.staffs} />}></Route>
        </Routes>
      <Footer />
    </div>
    );
  }
}

export default App;