import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookClubsById } from "../../store/bookclubs/actions";
import { getBookClubDetails } from "../../store/bookclubs/selectors";
import Loading from "../../components/Loading";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./styles.css";
import moment from "moment";
import { addParticipant } from "../../store/bookclubs/actions";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function BookClubDetails() {
  const [showMore, setShowMore] = useState(false);
  const [joined, setJoined] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const bookClubDetails = useSelector(getBookClubDetails);

  console.log(bookClubDetails);
  useEffect(() => {
    dispatch(fetchBookClubsById(id));
  }, [dispatch, id]);

  if (!bookClubDetails) {
    return <Loading />;
  }
  return (
    <div className="container fluid">
      <Row>
        <h1 className="text-center fonts display-4">{bookClubDetails.title}</h1>
        {/* <p class="h1 text-center ">{bookClubDetails.title}</p> */}
        <Col>
          <img
            style={{ height: "550px", width: "400px" }}
            src={bookClubDetails.imageLinks.medium}
            alt="..."
            className="col img-thumbnail"
          ></img>
        </Col>
        <Col>
          <p className="text-muted col">
            {showMore
              ? `${bookClubDetails.description.replace(/(<([^>]+)>)/gi, "")}`
              : `${bookClubDetails.description
                  .substring(0, 250)
                  .replace(/(<([^>]+)>)/gi, "")}`}
            <button
              style={{
                margin: "10px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "15px",
                padding: "5px",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "..."}
            </button>
          </p>
          {/*           
            {bookClubDetails.description.substring(0, 300)}
          </p> */}
          <Row>
            <Col>
              <span>
                <strong>genre:</strong>
                {bookClubDetails.genre.genre}
              </span>
            </Col>
            <Col>
              <span>
                <strong>Language:</strong>
                {bookClubDetails.language.language}
              </span>
            </Col>
            <Col>
              <strong>Rating:</strong>
              {bookClubDetails.averageRating}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Starting from:</strong>
              {moment(bookClubDetails.startDate).format("DD/MM/YYYY")}-
              <strong>Ends On: </strong>
              {moment(bookClubDetails.endDate).format("DD/MM/YYYY")}
            </Col>
          </Row>
          <Row>
            <p>
              Spots left:
              {bookClubDetails.maxPeople - bookClubDetails.participant.length}
            </p>
          </Row>
          <Button
            varient="primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addParticipant(bookClubDetails.id));
              setJoined(!joined);
            }}
            disabled={joined ? true : false}
          >
            {joined ? "JOINED" : "JOIN NOW"}
          </Button>
        </Col>
      </Row>

      {/* <
      
        <div>
          
          <div>
            <p>
              <span>genre:{bookClubDetails.genre.genre}</span>
              <span>Language:{bookClubDetails.language.language}</span>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
