import React from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";

const UserPanel = () => {
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out");
    } catch (e) {
      console.error(e);
    }
  };

  const dropdownOptions = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={handleSignOut}>Sign out</span>
    }
  ];

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted float="left" as="h2">
            <Icon name="code" />
            <Header.Content>Dev Chat</Header.Content>
          </Header>
        </Grid.Row>
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown trigger={<span>User</span>} options={dropdownOptions} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
