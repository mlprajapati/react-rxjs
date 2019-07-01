import React from "react";
import "./index.css";
import ProductItem from "../ProductItem";
import { Row, Col } from "react-bootstrap";

const ProductItems = props => {
  const { itemList, itemClick } = props;
  return (
    <div className="item-list-wrapper">
      <Row>
        {itemList.map((item, key) => (
          <Col
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={key}
            style={{ margin: "10px 0px 10px 0px", padding: "10px" }}
          >
            <ProductItem
              details={item}
              onClick={e => {
                itemClick(item);
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductItems;
