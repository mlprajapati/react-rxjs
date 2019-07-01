import React from "react";
import "./index.css";
const ProductItem = props => {
  return (
    <div className="item-container">
      <div
        className="item-image"
        {...props}
        style={{
          backgroundImage: "url(" + props.details.imageSrc + ")"
        }}
      />

      <div className="title-wrapper">{props.details.name}</div>
      <div className="code-wrapper">
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          Serial No. - {props.details.serialNo}
        </span>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          |
        </span>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          Order No. - {props.details.orderNo}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
