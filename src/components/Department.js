import { Component } from "react";
import { Card } from "reactstrap"

class Department extends Component {

    constructor(props) {
        super(props)
    
}
    render() {
        const list = this.props.apartments.map((apartment) => {
            return (
                <div key={apartment.id} className="col-lg-4 col-md-6 col-sm-12">
                        <Card>
                            <h2 className="ms-1">{apartment.name}</h2><br />
                            <p className="ms-4">Số lượng nhân viên: {apartment.numberOfStaff}</p>
                        </Card>
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