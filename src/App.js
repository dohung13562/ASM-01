import React, { Component } from 'react';
import { Route, Routes, useParams, useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import Header from './components/HeaderComponent';
import StaffList from './components/ListInfomation';
import StaffsInfomation from './components/StaffsInfomation';
import DepartmentDetail from './components/DepartmentDetail';
import Department from './components/Department';
import StaffSalary from './components/StaffSalary';
import Footer from './components/FooterComponent';
import { addStaff, deleteStaff, fetchDepartments, fetchStaffs, fetchStaffsSalary, updateStaff } from './redux/ActionCreators';

export const history = useRoutes;
  const mapStateToProps = (state) => {
    return {
      staffs: state.staffs,
      departments: state.departments,
      staffsSalary: state.staffsSalary
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    addStaff: (staff) => {
      dispatch(addStaff(staff))
    },
    fetchStaffs: () => {
      dispatch(fetchStaffs())
    },
    fetchDepartments: () => {
      dispatch(fetchDepartments())
    },
    fetchStaffsSalary: () => {
      dispatch(fetchStaffsSalary())
    },
    deleteStaff: (id) => {
      dispatch(deleteStaff(id))
    },
    updateStaff: (staff) => {
      dispatch(updateStaff(staff))
    },
  })

class App extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

render() {
  const StaffWithId = () => {
    let params = useParams()
    return(
        <StaffsInfomation 
          staff = {this.props.staffs.staffs.filter((staff) => staff.id === parseInt(params.staffId,10))[0]} 
          dept = {this.props.departments.departments.filter((dept) => dept.id === (this.props.staffs.staffs.filter((staff) => staff.id === parseInt(params.staffId,10))[0].departmentId))}  
          onUpdateStaff = {this.props.updateStaff}
          staffId = {this.props.staffs.staffs.filter((staff) => staff.id === parseInt(params.staffId,10))[0].id} 
            />
    );
  };

  const StaffWithDept = () => {
    let params = useParams()
    return(
        <DepartmentDetail
          dept = {this.props.departments.departments.filter((dept) => dept.id === params.deptId)[0]} 
          staffs = {this.props.staffs.staffs.filter((staff) => staff.departmentId === params.deptId)} />
    );
  }; 

  return (
    <div>
      <Header />
        <TransitionGroup>
          <CSSTransition classNames="page" timeout={300}>
            <Routes location={this.props.location}>
              <Route path="/staff/:staffId" element = {<StaffWithId/>}/>
              <Route path="/departments/:deptId" element = {<StaffWithDept />}/>
              <Route path="/" element = {<StaffList staffsLoading= {this.props.staffs.isLoading} onAddStaff = {this.props.addStaff} staffs = {this.props.staffs.staffs} onDeleteStaff = {this.props.deleteStaff}/> }/>
              <Route path="/department" element = {<Department dept={this.props.departments.departments}/> }/>
              <Route path="/salary" element = {<StaffSalary salary = {this.props.staffsSalary.staffsSalary} />}></Route>
            </Routes>
          </CSSTransition>
       </TransitionGroup>
      <Footer />
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);