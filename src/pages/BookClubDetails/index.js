import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { selectUser } from "../../store/user/selectors";

export default function BookClubDetails() {
  const [showMore, setShowMore] = useState(false);
  const [joined, setJoined] = useState(false);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const bookClubDetails = useSelector(getBookClubDetails);
  const isLoggedIn = user.token === null ? false : true;
  const isParticipant = () => {
    if (bookClubDetails) {
      if (bookClubDetails.participant.length) {
        if (
          bookClubDetails.participant.find((item) => {
            return item.id === user.id;
          })
        ) {
          return true;
        }
      }
      if (bookClubDetails.ownerId === user.id) {
        return true;
      }
      return false;
    }
    return false;
  };
  console.log(bookClubDetails);
  // console.log("participant", isParticipant());
  useEffect(() => {
    dispatch(fetchBookClubsById(id));
  }, [dispatch, id]);

  const checkKey = (key, item) => {
    if (key in item) {
      return true;
    }
    return false;
  };
  if (!bookClubDetails) {
    return <Loading />;
  }
  return (
    <div className="container fluid">
      <Row>
        <h1 className="text-center fonts">{bookClubDetails.title}</h1>
        <p className="text-center  text-muted author">
          By {bookClubDetails.author}
        </p>
        <Col>
          {checkKey("imageLinks", bookClubDetails) ? (
            <img
              style={{ height: "550px", width: "400px" }}
              src={bookClubDetails.imageLinks.medium}
              alt="..."
              className="col img-thumbnail"
            ></img>
          ) : (
            <img
              style={{ height: "550px", width: "400px" }}
              src="https://previews.123rf.com/images/asfia/asfia1902/asfia190200080/117673149-3d-illustration-of-man-reading-book-sitting-near-pile-of-books-3d-human-person-character-and-white-p.jpg"
              alt="..."
              className="col img-thumbnail"
            ></img>
          )}
          {/* <img
            style={{ height: "550px", width: "400px" }}
            src={bookClubDetails.imageLinks.medium}
            alt="..."
            className="col img-thumbnail"
          ></img> */}
        </Col>
        <Col>
          {checkKey("description", bookClubDetails) ? (
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
          ) : (
            ""
          )}
          {/* <p className="text-muted col description">
            {showMore
              ? `${bookClubDetails.description.replace(/(<([^>]+)>)/gi, "")}`
              : `${bookClubDetails.description
                  .substring(0, 250)
                  .replace(/(<([^>]+)>)/gi, "")}`}
            <span className="span-tag" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "...read more"}
            </span>
          </p> */}
          <Row>
            <span className="specs">{bookClubDetails.genre.genre}</span>
            <span className="specs">{bookClubDetails.language.language}</span>
            <span className="specs">
              {checkKey("averageRating", bookClubDetails)
                ? bookClubDetails.averageRating
                : ""}
            </span>
            <span className="specs">Pages:{bookClubDetails.pageCount}</span>
            <Row>
              <ReactStars
                edit={false}
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
          {isLoggedIn ? (
            isParticipant() ? (
              <span style={{ color: "darkgrey" }}>Already joined.</span>
            ) : (
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
                {}
              </Button>
            )
          ) : (
            <span
              style={{
                paddingTop: "30px",
                marginTop: "10px",
                fontSize: "20px",
                fontWeight: "5px",
                fontFamily: "fantasy",
              }}
            >
              You need to <Link to="/login">login</Link> first to join the club
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <ThreadsDisplay
          bookClubDetails={bookClubDetails}
          isParticipant={isParticipant}
        />
      </Row>
    </div>
  );
}
