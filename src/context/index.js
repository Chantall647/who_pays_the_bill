import React, {Component} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: 1,
    players: [],
    result: "",
  };

  addPlayer = (player) => {
    this.setState((prevState) => ({
      players: [...prevState.players, player],
    }));
  };

  deletePlayer = (playerToDelete) => {
    this.setState((prevState) => {
      const updatedPlayers = prevState.players.filter(
        (player) => player !== playerToDelete
      );

      return {
        players: updatedPlayers,
      };
    });
  };

  nextHandler = () => {
    const {stage, players} = this.state;
    if (players.length < 2) {
      toast.error("You must have at least 2 players to continue", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    } else {
      this.setState(
        {
          stage: stage + 1,
        },
        () => {
          this.generateLooser();
        }
      );
    }
  };

  generateLooser = () => {
    const {players} = this.state;
    const result = players[Math.floor(Math.random() * players.length)];
    this.setState({
      result,
    });
  };

  resetGame = () => {
    this.setState({
      stage: 1,
      players: [],
      result: "",
    });
  };

  render() {
    console.log("players", this.state.players);
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addPlayer: this.addPlayer,
          deletePlayer: this.deletePlayer,
          next: this.nextHandler,
          result: this.state.result,
          getNewLooser: this.generateLooser,
          resetGame: this.resetGame,
        }}
      >
        {this.props.children}
        <ToastContainer />
      </MyContext.Provider>
    );
  }
}

export {MyContext, MyProvider};
