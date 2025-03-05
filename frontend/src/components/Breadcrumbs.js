import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src/styles/Breadcrumbs.css"

const Breadcrumbs = ({ items }) => {
  return (
    <Breadcrumb className="custom-breadcrumb">
      {items.map((item, index) => (
        index === items.length - 1 ? (
          <Breadcrumb.Item active key={item.path} className="breadcrumb-text">
            {item.label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: item.path }} key={item.path} className="breadcrumb-link">
            {item.label}
          </Breadcrumb.Item>
        )
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
