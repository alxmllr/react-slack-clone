import React, { useState } from "react";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const initialFormState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};
const usersRef = firebase.database().ref("users");

const Register = () => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm({
      ...form,
      [name]: value
    });

  const handleSubmit = async event => {
    setLoading(true);
    event.preventDefault();
    try {
      const { username: displayName, email, password } = form;
      const photoURL = `http://gravatar.com/avatar/${md5(email)}?d=identicon`;

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await Promise.all([
        user.updateProfile({ displayName, photoURL }),
        usersRef.child(user.uid).set({ name: displayName, avatar: photoURL })
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    form.email &&
    form.username &&
    form.password &&
    form.password === form.passwordConfirmation;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={form.email}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              type="password"
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={form.passwordConfirmation}
              type="password"
            />

            <Button
              color="orange"
              fluid
              size="large"
              className={loading ? "loading" : ""}
              disabled={!canSubmit || loading}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
