import React, { useContext } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { UserContext } from "../../contexts/user";

const handleSignOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.error(e);
  }
};

const UserPanel = ({ user }) => {
  const dropdownOptions = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
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
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={user.photoURL} spaced="right" avatar />
                  {user.displayName}
                </span>
              }
              options={dropdownOptions}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

const UserPanelContainer = () => {
  const {
    state: { user }
  } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return <UserPanel user={user} />;
};

export default UserPanelContainer;
