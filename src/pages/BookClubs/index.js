import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BookClubCard from "../../components/BookClubCard";
import { fetchBookClubs } from "../../store/bookclubs/actions";
import { getBookClubs } from "../../store/bookclubs/selectors";
import { fetchAllGenres } from "../../store/genres/actions";
import { getGenres } from "../../store/genres/selectors";
import "./styles.css";
import { filterOnGenre } from "../../store/bookclubs/selectors";
import HeroBanner from "../../components/HeroBanner";
export default function BookClubs() {
  const dispatch = useDispatch();
  const bookClubs = useSelector(getBookClubs);
  const genres = useSelector(getGenres);
  const [selectedGenre, setSelectedGenre] = useState("All");
  // console.log(bookClubs);
  // console.log(genres);

  useEffect(() => {
    dispatch(fetchBookClubs());
    dispatch(fetchAllGenres());
  }, [dispatch]);

  const filteredClubs =
    selectedGenre === "All"
      ? bookClubs
      : bookClubs.filter((bookclub) => {
          // console.log(bookclub, selectedGenre);
          return bookclub.genreId === parseInt(selectedGenre);
        });

  // console.log(selectedGenre);

  return (
    <div>
      <HeroBanner>
        <p>The right Book in the right hands at the right time <br/>can change the world!</p>
      </HeroBanner>
      <div className="container">
        <Row>
          <Col>
            <Form.Select
              className="my_select"
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                console.log(selectedGenre);
              }}
            >
              <option value={"All"} className="text-muted">
                All
              </option>
              {!genres
                ? ""
                : genres.map((genre) => {
                    return (
                      <option key={genre.id} value={genre.id}>
                        {genre.genre}
                      </option>
                    );
                  })}
            </Form.Select>
          </Col>
          <Col>Language</Col>
        </Row>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredClubs &&
            filteredClubs.map((bookClub) => {
              return <BookClubCard key={bookClub.id} bookClub={bookClub} />;
            })}
        </div>
      </div>
    </div>
  );
}
