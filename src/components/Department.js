import { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap"

class Department extends Component {

    constructor(props) {
        super(props)
    
}
    render() {
        const list = this.props.departments.map((departments) => {
            return (
                <div key={departments.id} className="col-lg-4 col-md-6 col-sm-12">
                    <Link to = {`/departments${this.props.dept.id}`}>
                        <Card className="m-4" style={{ background: "#ADD8E6" }}>
                            <CardTitle className="ms-1 p-2"><span className="fa fa-tag" /> {this.props.dept.name}</CardTitle><br />
                            <CardText className="ms-4 p-2"><span className="fa fa-users" /> Số lượng nhân viên: {this.props.numberOfStaff.length}</CardText>
                        </Card>
                    </Link>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row mt-1">
                    {list}
                </div>
            </div>
        );
    }
    
}

export default Department