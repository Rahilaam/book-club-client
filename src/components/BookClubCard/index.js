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
      className="text-center card"
      style={{ width: "20rem", padding: "10px", margin: "10px" }}
    >
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Header as="h4">{title}</Card.Header>
        <br />
        <Card.Header as="h6">{author}</Card.Header>
        <br />
        <Card.Text style={{ display: "flex", justifyContent: "space-around" }}>
          <span>{genre.genre}</span>
          <span>{language.language}</span>
        </Card.Text>
        <Card.Text>
          {moment(startDate).format("DD/MM/YYYY")}-
          {moment(endDate).format("DD/MM/YYYY")}
        </Card.Text>
        <Link to={`/bookClubs/${id}`}>
          <Button variant="danger">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}