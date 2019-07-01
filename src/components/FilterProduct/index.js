import React, { Component } from "react";
import "./index.css";
import { Row, Col } from "react-bootstrap";
import { messageService } from "../../services/common";
class FilterProduct extends Component {
  state = { selectedItem: 0 };
  clearFilter() {
    // clear messages
    //messageService.clearMessages();
    messageService.sendMessage("all");
    document.getElementById("selectProduct").selectedIndex = 0;
  }
  filterProduct() {
    // send message to subscribers via observable subject
    //this.setState({ counter: this.state.counter ? this.state.counter + 1 : 1 });
    let optionValue = document.getElementById("selectProduct").options[
      document.getElementById("selectProduct").selectedIndex
    ].value;
    messageService.sendMessage(optionValue);
  }
  render() {
    return (
      <div className="product-filter">
        <Row>
          <Col>
            <span>
              <b>Product Filter:</b>
            </span>
            <span>
              <select
                id="selectProduct"
                className="filter-Product--select"
                onChange={this.filterProduct}
              >
                <option value="all">All</option>
                <option value="expiring">Expiring</option>
                <option value="expired">Expired</option>
              </select>
            </span>
            <button onClick={this.clearFilter} className="btn btn-link">
              Clear
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FilterProduct;
