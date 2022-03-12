import dateFormat from 'dateformat';
import { Component } from 'react'; 
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

class StaffsInfomation extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const staff = this.props.staff;
            if (staff) {
                return (
                    <div className="col-lg-3" style={{ margin: "0 15px" }}>
                        <p className='mt-2' style={{ color: "#C0C0C0" }}><Link to='/'>Nhân viên</Link> / {staff.name}</p>
                            <CardImg src={staff.image} />
                                <Card>
                                    <div className="ms-1">
                                        <h4><span className="fa fa-user-circle" />Họ và tên : {staff.name}</h4>
                                        <p><span className="fa fa-birthday-cake" />Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                                        <p><span className="fa fa-calendar" />Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                                        <p><span className="fa fa-sitemap" />Phòng ban : {staff.department.name}</p>
                                        <p><span className="fa fa-user-times" />Số ngày nghỉ còn lại : {staff.annualLeave}</p>
                                        <p><span className="fa fa-user-plus" />Số ngày đã làm thêm : {staff.overTime}</p>
                                    </div>
                                </Card>
                    </div>
                );
            } else {
                return (
                    <div></div>
                );
            }   
    }
}

export default StaffsInfomation;

