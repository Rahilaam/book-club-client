import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  InputGroup,
  Button,
  Card,
  Container,
  FormControl,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { seartchForBooks } from "../../store/newClub/actions";
import { getSearchResult } from "../../store/newClub/selectors";
import ReactStars from "react-rating-stars-component";
import "./styles.css";
import { selectToken, selectUser } from "../../store/user/selectors";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { createBookClub } from "../../store/bookclubs/actions";

export default function NewClub() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const [searchTitle, setSearchTitle] = useState("");
  const [newClub, setNewClub] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [maxPeople, setMaxPeople] = useState();

  const searchResult = useSelector(getSearchResult);
  if (token === null) {
    navigate("/");
  }

  const [searchDataDisplay, setSearchDataDisplay] = useState(false);
  useEffect(() => {
    console.log("inside useEffect", searchResult);
    if (searchResult) {
      console.log("inside if");
      setSearchDataDisplay(true);
      return;
    }
    setSearchDataDisplay(false);
    // console.log(searchData);
  }, [searchResult]);
  const checkKey = (key, item) => {
    if (key in item.volumeInfo) {
      return true;
    }
    return false;
  };
  // console.log("search data", searchData);
  console.log("search Result", searchResult);
  // useEffect(() => {}, [searchResul return;t, searchTitle]);

  const handleSelect = (book) => {
    // console.log("in handle select", book.volumeInfo);
    const author = checkKey("authors", book)
      ? book.volumeInfo.authors[0]
      : "Not availabe";
    const genre = checkKey("categories", book)
      ? book.volumeInfo.categories[0]
      : "General";
    const clubData = {
      apiId: book.id,
      title: book.volumeInfo.title,
      author,
      genre,
      language: book.volumeInfo.language,
    };
    setNewClub(clubData);
    console.log(clubData);
    // searchResult = {};
    // setSearchResult({});
    // setSearchTitle(newClub.title)
    setSearchDataDisplay(false);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
      setErrorMessage(`Enter a valid date`);
      return;
    }
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    if (newStartDate < new Date()) {
      setErrorMessage(
        `Date inputs are not valid.Start date cannot be past dates.`
      );
      return;
    }
    if (newStartDate > newEndDate) {
      setErrorMessage("start date cannot be after end date.");
      return;
    }
    // console.log(
    //   newClub,
    //   newStartDate,
    //   newEndDate,
    //   maxPeople,
    //   startDate,
    //   endDate
    // );
    dispatch(createBookClub({ ...newClub, startDate, endDate, maxPeople }));
  };

  return (
    <div className="new-club-form">
      <Form as={Col} md={{ span: 8, offset: 2 }} className="mt-5">
        <h1 className="mt-5 mb-5">Create a new club!</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label></Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
              type="text"
              placeholder="Search books"
              required
            />
            <Button
              variant="outline-secondary"
              id="button-addon1"
              onClick={(e) => {
                // e.preventDefault();
                dispatch(seartchForBooks(searchTitle));
              }}
            >
              <FaSearch />
            </Button>
          </InputGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {!searchDataDisplay
              ? ""
              : searchResult.items.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      style={{ width: "16rem", height: "32rem", margin: "3px" }}
                    >
                      <Card.Body>
                        <Card.Title>{item.volumeInfo.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {checkKey("authors", item)
                            ? ` by ${item.volumeInfo.authors[0]}`
                            : `Author not available`}
                        </Card.Subtitle>
                        <Card.Text>
                          {" "}
                          pages: {item.volumeInfo.pageCount}
                        </Card.Text>
                        <Card.Text>
                          {" "}
                          language: {item.volumeInfo.language}
                        </Card.Text>
                        <Card.Text>
                          <ReactStars
                            count={5}
                            value={item.volumeInfo.averageRating}
                            size={20}
                            half
                            activeColor="#ffd700"
                          />
                          {item.volumeInfo.ratingsCount
                            ? `(${item.volumeInfo.ratingsCount})`
                            : 0}
                        </Card.Text>
                        <Card.Text>
                          {" "}
                          {checkKey("categories", item)
                            ? `Genre: ${item.volumeInfo.categories[0]}`
                            : "General"}
                        </Card.Text>
                        <Card.Link
                          href={`${item.volumeInfo.infoLink}`}
                          target="_blank"
                        >
                          read more
                        </Card.Link>
                      </Card.Body>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelect(item);
                        }}
                      >
                        Select
                      </Button>
                    </Card>
                  );
                })}
          </div>

          {!searchDataDisplay ? (
            <div>
              {/* {} */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <span className="form-text" style={{ fontWeight: "15px", marginBottom: "10px" }}>
                  {" "}
                  Choosen book:{" "}
                </span>
                <h4 style={{ marginBottom: "7px" }}>{newClub.title}</h4>
              </div>
              <Form>
                <Form.Group>
                  <Form.Label className="form-text">Starting Date:</Form.Label>
                  <FormControl
                    min={new Date()}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    type="date"
                    placeholder="Start date"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-text">End Date:</Form.Label>
                  <FormControl
                    min={new Date()}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    type="date"
                    placeholder="End date"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Group>
                    <Form.Label className="form-text">Maximum People:</Form.Label>
                    <FormControl
                      value={maxPeople}
                      onChange={(event) => setMaxPeople(event.target.value)}
                      type="number"
                      min={0}
                      placeholder="Maximum people"
                      required
                    />
                  </Form.Group>
                </Form.Group>

                <Button
                  style={{ margin: "10px" }}
                  variant="outline-primary"
                  id="button-addon1"
                  onClick={handleCreate}
                >
                  Create
                </Button>
                {errorMessage ? `${errorMessage}` : ""}
              </Form>
            </div>
          ) : (
            ""
          )}
        </Form.Group>
      </Form>
    </div>
  );
}
