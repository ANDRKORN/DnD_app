import React, { useState, useEffect } from "react";

const PlayersMarkerMap = ({color, selectMap, players, open, refs, masterGame, pl }) => {
  const [update, setUpdate] = useState(false);
  setTimeout(() => {
    setUpdate(!update);
  }, 2000);
  useEffect(() => {}, [update]);
  let widthlocalForg = 0;
  let heightlocalForg = 0;
  let localForgMaps = JSON.parse(localStorage.getItem("mapForgs"));
  let localForg = null; 
  if (localForgMaps && localForgMaps.length !== 0 ) {
    localForg = localForgMaps.find(el => el.name === selectMap)?.forg ? localForgMaps.find(el => el.name === selectMap) : false;
  }
  let playersXY = JSON.parse(localStorage.getItem(players)) || 0;
  let kWidth = 1;
  let kHeight = 1;
  if (localForg?.forg && localForg?.forg?.length > 0) {
    widthlocalForg = localForg.forg[0].split(",").slice(2, 4)[0];
    heightlocalForg = localForg.forg[0].split(",").slice(2, 4)[1];
  }
  if (refs.current && localForg?.forg && localForg?.forg?.length > 0) {
    const mapHeight = refs.current.clientHeight;
    const mapWidth = refs.current.clientWidth;
    const changeWidth = localForg.forg.filter((el) => {
      return el.slice(0, 1) === "0";
    }).length;
    const changeHieght =
      +`${Math.max(
        ...localForg.forg.map((el) => {
          return el.split(",")[0];
        })
      )}` + 1;
      kWidth = (Math.floor(mapWidth / changeWidth) / widthlocalForg);
      kHeight = (Math.floor(mapHeight / changeHieght) / heightlocalForg);
  }
  return (
    <div
      tabIndex={0}
      onMouseOver={(e) => {
        e.target.focus();
        e.target.click();
      }}
      onDragEnd={(e) => {
        if (masterGame) {
          const x = e?.nativeEvent?.offsetX || 0;
          const y = e?.nativeEvent?.offsetY || 0;
          if (+e.target.style["left"].slice(0, -2) + x < 0) {
            e.target.style["left"] = 0 + "px;";
          } else {
            e.target.style["left"] =
              +e.target.style["left"].slice(0, -2) + x + "px";
          }
          if (+e.target.style["top"].slice(0, -2) + y < 0) {
            e.target.style["top"] = 0 + "px;";
          } else {
            e.target.style["top"] =
              +e.target.style["top"].slice(0, -2) + y + "px";
          }
          localStorage.setItem(
            players,
            JSON.stringify({
              x: e.target.style["left"],
              y: e.target.style["top"],
            })
          );
        }
      }}
      style={{
        width: "30px",
        background: color,
        height: "30px",
        position: "absolute",
        border: "5px solid orange",
        borderRadius: "50%",
        zIndex: 2,
        left: `${Math.floor(playersXY?.x?.slice(0, -2) * kWidth)}px`,
        top: `${Math.floor(playersXY?.y?.slice(0, -2) * kHeight)}px`,
        display: open ? "block" : "none",
      }}
    ></div>
  );
};

export default PlayersMarkerMap;
