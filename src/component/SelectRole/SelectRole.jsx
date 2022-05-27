import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { SET_MASTER } from "../../redux/game_master/actions";

const SelectedRole = ({useDispatchData}) => {
  const dispatch = useDispatch();
  const OpenMaster = (val) => {
    useDispatchData({type: SET_MASTER, masterGame: val}, dispatch);
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{margin: '0 50vh'}}>
        <Button.Group widths={16} size={'massive'}>
          <Button color={'youtube'} onClick={()=>OpenMaster(false)}><Link to="/players">Players</Link></Button>
          <Button.Or />
          <Button positive onClick={()=>OpenMaster(true)}><Link to="/map">Game Master</Link></Button>
        </Button.Group>
        <Outlet />
      </div>
    </div>
  );
};

export default SelectedRole;
