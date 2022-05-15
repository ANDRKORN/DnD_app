import React, { useRef, useState } from "react";
import map from "../../static/map2.jpg";
import s from "./style.module.css";
import Cloud from "../Cloud/CloudDnD";
import {
  Button,
  Dropdown,
  Modal,
  Icon,
  Segment,
  Menu,
  Input
} from "semantic-ui-react";
import { listGamers } from "../../compact/gamer";
const Map = (props) => {
  const [forgWar, setForgWar] = useState(false);
  const [openConf, setOpenConf] = useState(false);
  const Btn = (props) => (
    <Button
      animated
      active
      color="google plus"
      icon="map signs"
      content={forgWar ? "Close map." : "Open map ."}
      onClick={() => {
        setForgWar(!forgWar);
      }}
      size={"big"}
    />
  );
  const MenuSpeshial = (props) => (
    <div>
      <Menu attached="top">
        <Dropdown item icon="wrench" simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span className="text">New</span>
              <Dropdown.Menu>
                <Dropdown.Item>Download new map <Input type={'file'}/></Dropdown.Item>
                <Dropdown.Item>Download map by save</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item onClick={(e)=>{console.log(e)}}>Open</Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>
              <Button
                animated
                active
                color="google plus"
                icon="map signs"
                content={forgWar ? "Close config ." : "Config ."}
                onClick={() => {
                  setOpenConf(!forgWar);
                }}
                size={"big"}
              />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input
                className="prompt"
                type="text"
                placeholder="Search animals..."
              />
              <i className="search link icon" />
            </div>
            <div className="results" />
          </div>
        </Menu.Menu>
      </Menu>
      <Segment>
        <Btn />
      </Segment>
    </div>
  );
  const imgMap = useRef();
  const mapNew = new Image();
  mapNew.src = map;
  <Dropdown options={listGamers} search value={4} />;
  return (
    <>
      <MenuSpeshial />
      <Modal open={openConf} />
      <div className={s.container}>
        <img
          className={s.map}
          src={map}
          alt=""
          style={
            forgWar
              ? { opacity: 1 }
              : { minWidth: "100%", height: "auto", opacity: 0 }
          }
          ref={imgMap}
        />
      </div>
      {forgWar ? <Cloud width={40} height={40} refs={imgMap} /> : <></>}
    </>
  );
};

export default Map;
