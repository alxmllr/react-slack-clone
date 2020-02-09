import React, { useState } from "react";
import firebase from "../../firebase";
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
  email: "",
  password: ""
};

const Login = () => {
  const [error, setError] = useState();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm({
      ...form,
      [name]: value
    });

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError();
    try {
      const { email, password } = form;
      const signedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log({ signedInUser });
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = form.email && form.password;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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

            <Button
              color="violet"
              fluid
              size="large"
              className={loading ? "loading" : ""}
              disabled={!canSubmit || loading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        {error && (
          <Message error>
            <p>{error}</p>
          </Message>
        )}
        <Message>
          Not a user? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
