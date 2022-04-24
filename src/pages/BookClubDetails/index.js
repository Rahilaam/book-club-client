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
import ReactStars from "react-rating-stars-component";
import ThreadsDisplay from "../../components/ThreadsDisplay";

export default function BookClubDetails() {
  const [showMore, setShowMore] = useState(false);
  const [joined, setJoined] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const bookClubDetails = useSelector(getBookClubDetails);

  // console.log(bookClubDetails);
  useEffect(() => {
    dispatch(fetchBookClubsById(id));
  }, [dispatch, id]);

  if (!bookClubDetails) {
    return <Loading />;
  }
  return (
    <div className="container fluid">
      <Row>
        <h1 className="text-center fonts">{bookClubDetails.title}</h1>
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
          <p className="text-muted col description">
            {showMore
              ? `${bookClubDetails.description.replace(/(<([^>]+)>)/gi, "")}`
              : `${bookClubDetails.description
                  .substring(0, 250)
                  .replace(/(<([^>]+)>)/gi, "")}`}
            <span className="span-tag" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "...read more"}
            </span>
          </p>
          <Row>
            <span className="specs">{bookClubDetails.genre.genre}</span>
            <span className="specs">{bookClubDetails.language.language}</span>
            <span className="specs">{bookClubDetails.averageRating}</span>
            <span className="specs">Pages:{bookClubDetails.pageCount}</span>
            <Row>
              <ReactStars
                count={5}
                value={bookClubDetails.averageRating}
                size={20}
                half
                activeColor="#ffd700"
              />
              <span>({bookClubDetails.ratingsCount})</span>
            </Row>
          </Row>
          <Row>
            <Col>
              <span>Starting from:</span>
            </Col>
            <Col>
              <span>
                {moment(bookClubDetails.startDate).format("DD/MM/YYYY")}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>Ends On: </span>
            </Col>
            <Col>{moment(bookClubDetails.endDate).format("DD/MM/YYYY")}</Col>
          </Row>
          <Row>
            <span className="spots">
              {bookClubDetails.maxPeople - bookClubDetails.participant.length}{" "}
              spots left.
            </span>
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
      <Row>
        <ThreadsDisplay bookClubDetails={bookClubDetails} />
      </Row>
    </div>
  );
}
