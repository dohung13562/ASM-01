import { Card } from "reactstrap";
import { Link } from "react-router-dom";

function StaffSalary({ staffs }) {
    const list = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-lg-4 col-md-6 col-sm-12">
                    <Card className="mt-2">
                        <div style={{ background: "#ADD8E6" }}>
                            <h3>{staff.name}</h3>
                            <p className="ms-2">Mã nhân viên: {staff.id}</p>
                            <p className="ms-2">Hệ số lương: {staff.salaryScale}</p>
                            <p className="ms-2">Số giờ làm thêm: {staff.overTime}</p>
                        </div>
                        <Card style={{ background: "#FFFF00" }}>
                            <p className="m-3">Lương: {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed(0)}</p>
                        </Card>
                    </Card>
            </div>
        );
    });

    return (
        <div className="container">
            <p className='text text-white m-2'><Link to='/'>Nhân viên</Link> / Bảng lương</p>
            <div className="row mt-1">
                {list}
            </div>
        </div>
    );
}

export default StaffSalary;