import React, { useEffect } from "react";
import CloudSmall from "./CloudSmall/Cloud";

const CloudDnD = ({
  width,
  height,
  mapHeight,
  mapWidth,
  heightCount,
  widthCount,
  fog_war_open,
  masterGame,
  changeForg,
  localForg,
  url_img,
  localForgMaps,
}) => {
  useEffect(() => {}, [width, height]);
  const arrClouds = [];
  const newLocalForg = [];
  for (let i = 0; i < heightCount; i++) {
    const res = [];
    for (let g = 0; g < widthCount; g++) {
      res.push(
        <CloudSmall
          key={`${g}${i}`}
          height={height}
          width={width}
          countHeight={i}
          countWidth={g}
          changeForg={masterGame ? changeForg : () => {}}
          stateElem={
            localForg
              ? localForg
                  .find((el) => {
                    return el.slice(0, `${i},${g}`.length) === `${i},${g}`;
                  })
                  .slice(-1) > 0
                ? true
                : false
              : true
          }
          masterGame={masterGame}
        />
      );
      if (!localForg) {
        newLocalForg.push(`${i},${g},${width},${height},1`);
      }
    }
    arrClouds.push(
      <div style={{ height: `${height}px` }} key={`${i}`}>
        {res}
      </div>
    );
  }
  if (!localForg) {
    if (localForgMaps && localForgMaps.length > 0) {
      localForgMaps.push({name: url_img, forg: newLocalForg});
    }    
    const res = localForgMaps && localForgMaps.length > 0 ? localForgMaps : [{name: url_img, forg: newLocalForg}]
    console.log(res)
    localStorage.setItem("mapForgs", JSON.stringify(res));
  }
  return (
    <>
      <div
        style={{
          width: 'max-content',
          maxHeight: mapHeight,
          position: "relative",
          top: "-" + mapHeight + "px",
          display: fog_war_open ? "block" : "none",
        }}
      >
        {arrClouds}
      </div>
    </>
  );
};
export default React.memo(CloudDnD);
