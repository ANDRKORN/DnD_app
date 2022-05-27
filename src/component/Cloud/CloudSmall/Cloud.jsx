import React, { useEffect } from "react";
import imgCloud from "../../../static/egg.png";
import s from "./style.module.css"
const CloudSmall = ({
  height,
  width,
  countHeight,
  countWidth,
  changeForg,
  stateElem,
  masterGame
}) => {
  useEffect(()=>{},[width, height])
  return (
  <span
    value={`${countHeight},${countWidth}`}
    key={`${countHeight}${countWidth}${countWidth - 1}${countHeight - 1}${
      (countHeight + 1) / 2
    }`}
    style={masterGame ? {
      border: "1px solid black",
      display: "inline-block",
      minHeight: height + "px",
      width: width + "px",
      backgroundColor: stateElem ? "red" : "green",
      opacity: 0.3,
    } : {
      display: "inline-block",
      minHeight: height + "px",
      width: width + "px",
    }}
    onClick={(e) => changeForg(e)}
  >
    <img
      className={s.cloud}
      src={imgCloud}
      useMap="dnd_map"
      alt={`${countHeight},${countWidth}`}
      height={`${height}px`}
      width={`${width}px`}
      onClick={(e) => changeForg(e)}
      style={{
        display: masterGame ? "none" : stateElem ? "inline" : "none" ,
      }}
    />
  </span>
);
}
export default React.memo(CloudSmall);
