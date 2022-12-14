import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem("user");
    console.log(username);
    const token = localStorage.getItem("token");
    console.log(this.props);
    axios
      .delete(
        `https://mycinemamovieapp.herokuapp.com/users/${username}/movies/${movie._id}`,
        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favorites.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://mycinemamovieapp.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(`https://mycinemamovieapp.herokuapp.com/users/${username}`, {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile Updated");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://mycinemamovieapp.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("User has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
                <>
                  <p>Name: {Username}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="update-inputs">
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card>
                  <Form className="update-form" onSubmit={(e) => this.editUser(e, this.Username, this.Password, this.Email, this.Birthday)}>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control type="date" name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Button variant="warning" type="submit" onClick={() => this.editUser()}>Update User</Button>
                      <Button className="delete-button" variant="danger" onClick={() => this.onDeleteUser()}>Delete User</Button>
                    </Form.Group>
                  </Form>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
        <Card className="favmovie-inputs">
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {FavoriteMovies.map((ImagePath, Title, _id) => {
                return (
                  <Col key={_id} className="fav-movie">
                    <Figure>
                      <Link to={`/movies/${movie._id}`}>
                        <Figure.Image src={ImagePath} alt={Title} />
                        <Figure.caption>{Title}</Figure.caption>
                      </Link>
                    </Figure>
                    <Button className="remove" variant="secondary" onClick={() => this.onRemoveFavorite(movie._id)}>Remove from favorites.</Button>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}