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
    this.addStaff = this.addStaff.bind(this);
  }

  onchangeStaffId(staffId) {
    this.setState({ staffId: staffId })
} 

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff};
    this.setState ({
      staff: [...this.state.stafffs, newStaff]
    });
    console.log(newStaff);
    console.log(this.state.staffs)
}

addStaff = (staff) => {
  const id = Math.floor(Math.random() * 10000 + 1);
  const newStaff = { id, ...staff };
  this.setState({
    staffs: [...this.state.staffs, newStaff]
  });
  console.log(newStaff);
  console.log(this.state.stafffs)
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
          <Route path='/staff' element = {() => (<StaffList onAdd = {this.addStaff} staff= {this.state.staffs}/>)}/>
        </Routes>
      <Footer />
    </div>
    );
  }
}

export default App;