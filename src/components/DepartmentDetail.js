import { Component } from "react";
import StaffList from './ListInfomation';

class DepartmentDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h3 className="text-primary">Phòng Ban: {this.props.dept.name}</h3><br />
                    <StaffList staffs={this.props.staffs} />
                </div>
            </div>
        )
    }
}

export default DepartmentDetail;