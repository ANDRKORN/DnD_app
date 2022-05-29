import React, { useEffect, useRef } from "react";
import s from "./style.module.css";
import { Button, Input, Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
  SET_SHOW_FOG_WAR,
  SET_OPEN_MAP,
  SET_MAP,
  SET_MAP_URL,
  SET_SELECT_MAPS,
} from "../../redux/map/actions";
import PlayersMarkerMap from "../PlayersMarkerMap/PlayersMarkerMap";
import CloudDnDContainer from "../Cloud/CloudDnDContainer";
import { SET_SHOW_MAP_PLAYERS } from "../../redux/game_master/actions";

const Map = ({
  open,
  fog_war_open,
  map,
  useDispatchData,
  fog_war,
  masterGame,
  selectMap,
  url_img,
  showMapPlayers,
}) => {
  useEffect(() => {}, [open, fog_war, map.url_img]);
  const dispatch = useDispatch();
  const imgMap = useRef();
  const nameMap = useRef();
  const DownloadMapRef = useRef();
  const ShowMapPlayers = () => {
    localStorage.setItem("showMapPlayers", JSON.stringify(!showMapPlayers));
    useDispatchData(
      { type: SET_SHOW_MAP_PLAYERS, show: !showMapPlayers },
      dispatch
    );
  };
  const SetUrlMap = (url) => {
    useDispatchData({ type: SET_MAP_URL, url: url }, dispatch);
  };
  const OpenMap = () => {
    useDispatchData({ type: SET_OPEN_MAP, open: !open }, dispatch);
    useDispatchData({ type: SET_SHOW_FOG_WAR, open: true }, dispatch);
  };
  const OpenMapForPlayers = (val) => {
    useDispatchData({ type: SET_OPEN_MAP, open: val }, dispatch);
  };
  const SetMap = (result, name) => {
    useDispatchData(
      { type: SET_MAP, map: { url: result, nameMap: name } },
      dispatch
    );
  };

  const DownloadMap = () => {
    const e = DownloadMapRef.current.inputRef.current;
    const eName = nameMap.current.inputRef.current.value;
    const allMap = JSON.parse(localStorage.getItem("maps"));
    if (!eName) {
      alert("Пустое имя карты");
      return;
    }
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      if (this.result && localStorage) {
        if (allMap) {
          for (let item of allMap) {
            if (item.text === eName || item.value === reader.result) {
              alert(
                "Гей мастер бог конечно, но такая карта уже есть кинь D20 на интелект"
              );
              return;
            }
          }
          allMap.push({ text: eName, value: this.result });
          try {
            localStorage.setItem("maps", JSON.stringify(allMap));
          } catch (err) {
            alert(err);
          }
          imgMap.src = reader.result;
          map.src = reader.result;
          SetMap(reader.result, eName);
        } else {
          localStorage.setItem(
            "maps",
            JSON.stringify([{ text: eName, value: this.result }])
          );
          imgMap.src = reader.result;
          map.src = reader.result;
          SetMap(reader.result, eName);
        }
      } else {
        alert();
      }
    });
    reader.readAsDataURL(e.files[0]);
  };

  const DeleteMap = (data) => {
    const eName = data.value;
    const allMap = JSON.parse(localStorage.getItem("maps"));
    const newMaps = allMap.filter((el) => el.text !== eName);
    useDispatchData({ type: SET_SELECT_MAPS, map: newMaps }, dispatch);
    localStorage.setItem("maps", JSON.stringify(newMaps));
  };
  const FogWar = () => {
    localStorage.setItem("fog_war_open", JSON.stringify(!fog_war_open));
    useDispatchData({ type: SET_SHOW_FOG_WAR, open: !fog_war_open }, dispatch);
  };
  const CreateNewFogWar = () => {
    const res = JSON.parse(localStorage.getItem("mapForgs"));
    for (let value of res) {
      if (JSON.parse(localStorage.getItem("selectMaps")) === value.name) {
        const index = res.findIndex(
          (el) => el.name === JSON.parse(localStorage.getItem("selectMaps"))
        );
        res[index].forg = false;
        console.log(res);
        localStorage.setItem("mapForgs", JSON.stringify(res));
      }
    }
    localStorage.removeItem("forg");
  };
  if (!masterGame) {
    setInterval(() => {
      if (!masterGame) {
        if (JSON.parse(localStorage.getItem("showMapPlayers"))) {
          if (!open) {
            OpenMapForPlayers(true);
            SetUrlMap(JSON.parse(localStorage.getItem("selectMaps")));
            return;
          }
        } else {
          if (open) {
            OpenMapForPlayers(false);
            SetUrlMap("#");
            return;
          }
        }
      }
    }, 10000);
  }
  const color = ["#DE130D", "#AB62D5", "#0F19DB", "#430408"];
  const pl = JSON.parse(localStorage.getItem("players"));
  let resPl = [];
  function resPLGeb(i, arr) {
    if (i === 0) {
      return;
    } else {
      arr.push(
        <PlayersMarkerMap
          key={i + `playrs${i}`}
          selectMap={JSON.parse(localStorage.getItem("selectMaps"))}
          players={`playrs${i}`}
          refs={imgMap}
          open={open}
          masterGame={masterGame}
          color={color[i - 1]}
          pl={pl}
        />
      );
      resPLGeb(i - 1, arr);
    }
  }
  resPLGeb(+pl, resPl);
  /*for (let i = 1; i < +pl + 1; i++) {
    resPl.push(<PlayersMarkerMap 
      key={i + `playrs${i}`} 
      selectMap={JSON.parse(localStorage.getItem("selectMaps"))} 
      players={`playrs${i}`} 
      refs={imgMap} 
      open={open} 
      masterGame={masterGame}
      color={color[i-1]}
      pl={pl} 
      />)
  }*/
  const newselectMap = selectMap.map((el, i) => {
    el.content = (
      <div
        style={{
          display: "flex",
          "align-items": "center",
          justifyContent: "space-between",
        }}
      >
        <Dropdown.Item>{el.text}</Dropdown.Item>
        <Button
          onClick={(el, data) => {
            el.stopPropagation();
            DeleteMap(data);
          }}
          icon={"delete"}
          value={el.text}
        />
      </div>
    );
    el.key = i;
    return el;
  });
  return (
    <>
      {masterGame ? (
        <>
          <div>
            <Dropdown
              clearable
              options={newselectMap}
              selection
              onChange={(e, data) => {
                console.log(data);
                localStorage.setItem("selectMaps", JSON.stringify(data.value));
                SetUrlMap(data.value);
              }}
            />
            <Input type="file" ref={DownloadMapRef} />
            <Input
              type="text"
              placeholder="Write name map uniqe"
              ref={nameMap}
            />
            <Button
              animated
              active
              content={"Download map."}
              onClick={DownloadMap}
              size={"big"}
            />
          </div>
          <Button
            disabled={url_img === "#" && !!url_img}
            animated
            active
            color="google plus"
            icon="map signs"
            content={open ? "Close map." : "Open map ."}
            onClick={OpenMap}
            size={"big"}
          />
          <Button
            disabled={!open}
            animated
            active
            color="google plus"
            icon="map signs"
            content={fog_war_open ? "Unshow fog for war." : "Show fog for war."}
            onClick={FogWar}
            size={"big"}
          />
          <Button
            disabled={!open}
            animated
            active
            color="google plus"
            icon="map signs"
            content={"Create fog for war."}
            onClick={CreateNewFogWar}
            size={"big"}
          />
          <Button
            disabled={!open}
            animated
            active
            color="google plus"
            icon="map signs"
            content={showMapPlayers ? "Unshow map players" : "Show map players"}
            onClick={ShowMapPlayers}
            size={"big"}
          />
        </>
      ) : (
        <></>
      )}
      <div style={{ position: "relative" }}>{resPl}</div>
      <div
        className={s.container}
        style={{ zIndex: 1, maxHeight: "-webkit-fill-available" }}
      >
        <img
          className={s.map}
          src={map.src}
          alt=""
          style={open ? {} : { minWidth: "100%", height: "auto", opacity: 0 }}
          ref={imgMap}
        />
        {open ? (
          <CloudDnDContainer
            masterGame={masterGame}
            width={40}
            height={38}
            refs={imgMap}
            fog_war_open={JSON.parse(localStorage.getItem("fog_war_open"))}
            url_img={url_img}
            open={open}
            OpenMapForPlayers={OpenMapForPlayers}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Map;
