import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appLoading } from "../../store/appState/actions";
import { fetchUserProfile } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import "./styles.css";
import { Card } from "react-bootstrap";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";

export default function MyReads() {
  const [showOwnClubs, setShowOwnClubs] = useState(false);
  const [showParticipantClubs, setShowParticipantClubs] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!user) {
    return <Loading />;
  }
  return (
    <div>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="top-container">
            {/* <img src="https://i.imgur.com/G1pXs7D.jpg" class="img-fluid profile-image" width="70"> */}
            <div className="ml-3">
              <h5 className="name">{user.name}</h5>
              <p className="mail">{user.email}</p>
            </div>
          </div>
          <div className="recent-border mt-4">
            {" "}
            <span
              className="recent-orders"
              onClick={(e) => setShowOwnClubs(!showOwnClubs)}
            >
              {showOwnClubs ? "close" : "Show my clubs"}
            </span>{" "}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {!showOwnClubs ? (
              ""
            ) : user.owner.length === 0 ? (
              <h5>You are not the admin of any club</h5>
            ) : (
              user.owner.map((club) => {
                console.log(club);
                return (
                  <Card className="bookclub_card card">
                    <Card.Img variant="top" src={club.imageUrl} />
                    <Card.Body>
                      <Card.Title>{club.title}</Card.Title>
                      <Card.Text className="text-muted">
                        {club.author}
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                      <Link to={`/bookClubs/${club.id}`}>
                        <span>see club</span>
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </div>
          <div className="recent-border mt-4">
            {" "}
            <span
              className="recent-orders"
              onClick={(e) => setShowParticipantClubs(!showParticipantClubs)}
            >
              {showParticipantClubs ? "Close" : "Clubs I joined"}
            </span>{" "}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {!showParticipantClubs ? (
              ""
            ) : user.participant.length === 0 ? (
              <h5>You are not a part of any club</h5>
            ) : (
              user.participant.map((club) => {
                return (
                  <Card className="bookclub_card card">
                    <Card.Img variant="top" src={club.imageUrl} />
                    <Card.Body>
                      <Card.Title>{club.title}</Card.Title>
                      <Card.Text className="text-muted">
                        {club.author}
                      </Card.Text>
                      <Link to={`/bookClubs/${club.id}`}>
                        <span>see club</span>
                      </Link>
                    </Card.Body>
                    {/* <Button variant="danger">Read More</Button> */}
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
