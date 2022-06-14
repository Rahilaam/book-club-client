import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BookClubCard from "../../components/BookClubCard";
import { fetchBookClubs } from "../../store/bookclubs/actions";
import { getBookClubs } from "../../store/bookclubs/selectors";
import { fetchAllGenres, fetchAllLanguages } from "../../store/genres/actions";
import { getGenres, getLanguages } from "../../store/genres/selectors";
import "./styles.css";
import HeroBanner from "../../components/HeroBanner";
export default function BookClubs() {
  const dispatch = useDispatch();
  const bookClubs = useSelector(getBookClubs);
  const genres = useSelector(getGenres);
  const languages = useSelector(getLanguages);
  const [selectedGenre, setSelectedGenre] = useState("AllGenre");
  const [selectedLang, setSelectedLang] = useState("AllLanguages");
  // console.log(bookClubs);
  // console.log(languages);

  useEffect(() => {
    dispatch(fetchBookClubs());
    dispatch(fetchAllGenres());
    dispatch(fetchAllLanguages());
  }, [dispatch]);

  const filteredClubs =
    selectedGenre === "AllGenre"
      ? bookClubs
      : bookClubs.filter((bookclub) => {
          // console.log(bookclub, selectedGenre);
          return bookclub.genreId === parseInt(selectedGenre);
        });

  const filteredClubsOnLanguage =
    selectedLang === "AllLanguages"
      ? filteredClubs
      : filteredClubs.filter((bookclub) => {
          // console.log(bookclub, selectedGenre);
          return bookclub.languageId === parseInt(selectedLang);
        });

  // console.log(filteredClubsOnLanguage);

  

  return (
    <div>
      <HeroBanner>
        <p>
          Let's read together!
        </p>
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
              <option value={"AllGenre"} className="text-muted">
                genre
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
          <Col>
            <Form.Select
              className="my_select"
              onChange={(e) => {
                setSelectedLang(e.target.value);
                console.log(selectedLang);
              }}
            >
              <option value={"AllLanguages"} className="text-muted">
                language
              </option>
              {!languages
                ? ""
                : languages.map((language) => {
                    return (
                      <option key={language.id} value={language.id}>
                        {language.language}
                      </option>
                    );
                  })}
            </Form.Select>
          </Col>
        </Row>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredClubsOnLanguage &&
            filteredClubsOnLanguage.map((bookClub) => {
              return <BookClubCard key={bookClub.id} bookClub={bookClub} />;
            })}
        </div>
      </div>
    </div>
  );
}
