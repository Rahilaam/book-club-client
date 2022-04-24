import React from "react";
import { ListGroup } from "react-bootstrap";
import "./styles.css";

export default function ThreadsDisplay(props) {
  const { bookClubDetails } = props;
  console.log(bookClubDetails);
  return (
    <div style={{ margin: "75px 0" }}>
      <h3>Threads</h3>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Cras justo odio
          <span className="badge badge-primary badge-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Dapibus ac facilisis in
          <span className="badge badge-primary badge-pill">2</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Morbi leo risus
          <span className="badge badge-primary badge-pill">1</span>
        </li>
      </ul>
    </div>
  );
}
