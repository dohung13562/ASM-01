import React, { Component } from 'react';
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
            
        }        
    }
        
    render() {
        const list = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-lg-2 col-md-3 col-sm-6">
                    <Link className="nav-link link-dark" to={"/staff/" + staff.id}>
                        <Card onClick={() => this.props.onClick(staff.id)}>
                            <CardImg src={staff.image} />
                            <p style={{textAlign: "center"}}>{staff.name}</p>
                        </Card>
                    </Link>
                </div>
            );
        });

        return (
            <div className="container">
                <h4>Nhân Viên</h4><hr />
                <div className="row mt-1">
                    {list}
                </div>
            </div>
        );
    }
    
}

export default StaffList;