import React from "react";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import "./styles.css";

export default function BookClubCard(props) {
  const {
    id,
    title,
    author,
    genre,
    imageUrl,
    language,
    owner,
    startDate,
    endDate,
  } = props.bookClub;
  return (
    <Card
      className="text-center card card-custom-style"
      style={{ width: "20rem", margin: "5px" }}
    >
      <Card.Img variant="top" src={imageUrl} style={{padding:"0"}} />
      <Card.Body>
        <Card.Text as="h4" className="card-custom-title-style">
          {title}
        </Card.Text>
        <br />
        <Card.Text as="h6" className="text-muted">
          By {author}
        </Card.Text>
        <br />
        <Card.Text style={{ display: "flex", justifyContent: "space-around" }}>
          <span>{genre.genre}</span>
          <span>{language.language}</span>
        </Card.Text>
        <Card.Text><strong>
          {moment(startDate).format("DD/MM/YYYY")}-
          {moment(endDate).format("DD/MM/YYYY")}</strong>
        </Card.Text>
        <Link to={`/bookClubs/${id}`}>
          <Button variant="danger">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
