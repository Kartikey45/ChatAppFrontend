import React from "react";
import { Toast } from "react-bootstrap";

export default function CustomToast(props) {
  return (
    <Toast
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "smokewhite",
      }}
      onClose={() => {
        props.onClose();
      }}
      show={props.display}
      delay={8000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Alert Notification</strong>
      </Toast.Header>
      <Toast.Body>{props.Message}</Toast.Body>
    </Toast>
  );
}
