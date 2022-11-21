import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card">
        <img className="card-img-top" src="movie.ImagePath" alt="Movie Poster" />
        <div className="card-body">
          <h5 className="card-title">{movie.Title}</h5>
          <p className="card-text">{movie.Description}</p>
          <a href="/movies/${movie._id}" className="btn-primary">Read More</a>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};