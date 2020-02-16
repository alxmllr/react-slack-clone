import React, { useState, useEffect, useContext } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { UserContext } from "../../contexts/user";
import {
  Context as ChannelsContext,
  ACTION as ChannelActions
} from "../../contexts/channels";

const initialFormState = {
  channelName: "",
  channelDetails: ""
};

const ChannelList = ({ channels, currentChannel, onClick }) =>
  channels.map(channel => (
    <Menu.Item
      key={channel.id}
      name={channel.name}
      style={{ opacity: 0.7 }}
      onClick={() => onClick(channel)}
      active={currentChannel.id === channel.id}
    >
      # {channel.name}
    </Menu.Item>
  ));

const Channels = () => {
  const {
    state: { user }
  } = useContext(UserContext);
  const {
    state: { currentChannel, channels },
    dispatch
  } = useContext(ChannelsContext);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addChannel = async ({ name, details }) => {
    try {
      const newChannel = {
        name,
        details,
        createdBy: { name: user.displayName, avatar: user.photoURL }
      };
      dispatch({ type: ChannelActions.CREATE_CHANNEL, payload: newChannel });
      setForm(initialFormState);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.channelName || !form.channelDetails) {
      return;
    }

    addChannel({ name: form.channelName, details: form.channelDetails });
  };

  const handleInputChange = ({ target: { name, value } }) =>
    setForm({
      ...form,
      [name]: value
    });

  const handleChannelClick = channel =>
    dispatch({ type: ChannelActions.SET_CURRENT_CHANNEL, payload: channel });

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS ({channels.length})
          </span>
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        <ChannelList
          channels={channels}
          onClick={handleChannelClick}
          currentChannel={currentChannel}
        />
      </Menu.Menu>

      <Modal basic open={showModal} onClose={closeModal}>
        <Modal.Header>Add a channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleInputChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default Channels;
