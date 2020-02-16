import React, { createContext, useReducer, useEffect } from "react";
import firebase from "../firebase";

const channelsRef = firebase.database().ref("channels");

export const ACTION = {
  ADD_CHANNEL: "addChannel",
  CREATE_CHANNEL: "createChannel",
  SET_CURRENT_CHANNEL: "setCurrentChannel"
};

const createChannel = async newChannel => {
  try {
    const key = channelsRef.push().key;
    await channelsRef.child(key).update({ id: key, ...newChannel });
  } catch (e) {
    console.error(e);
  }
};

const Reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_CHANNEL:
      const currentChannel =
        state.channels.length === 0 ? action.payload : state.currentChannel;
      return {
        ...state,
        currentChannel,
        channels: [...state.channels, action.payload]
      };
    case ACTION.CREATE_CHANNEL:
      createChannel(action.payload);
      return state;
    case ACTION.SET_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const Context = createContext();

const initialState = { currentChannel: null, channels: [] };
export default props => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    channelsRef.on("child_added", snap => {
      dispatch({ type: ACTION.ADD_CHANNEL, payload: snap.val() });
    });
    return () => channelsRef.off();
  }, []);

  return <Context.Provider value={{ state, dispatch }} {...props} />;
};
