import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Input } from "semantic-ui-react";
import { listGamers } from "../../compact/gamer";

const PlayersPage = (props) => {
  const [players, setPlayers] = useState(0);
  const arrPlayers = [];
  const arrPlayersInfo = {};
  const playerInfo = (i) => <div key={i} style={{display: 'flex', flexDirection: 'column'}}>
    <h3>{i}</h3>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
    <Input/>
  </div>
  for (let i = 1; i <= players; i++ ) {
    arrPlayers.push(playerInfo(i))
    arrPlayersInfo[`player${i}`] = {
      playersName: '',
      characterName: '',
      species: '',
      class: '',
      archetype: '',
      armor: '',
      speed: '',
      force: '',
      dexterity: '',
      body: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
      resistance: '',
  }
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ margin: "0 40%", width: 'max-content' }}>
        <div>
          <h2>Выбирите количество игроков</h2>
          <Dropdown
            options={listGamers}
            onChange={(e, data) => {setPlayers(data.value); localStorage.setItem('players', JSON.stringify(data.value))}}
          />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        {arrPlayers}
      </div>
      <Button><Link to="/map">Save Config</Link></Button>
    </div>
  );
};

export default PlayersPage;
