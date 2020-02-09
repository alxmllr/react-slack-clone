import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel";
import SidePanel from "./SidePanel";
import MetaPanel from "./MetaPanel";
import Messages from "./Messages";

const App = () => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>
    <Grid.Column width="4" style={{}}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

export default App;
