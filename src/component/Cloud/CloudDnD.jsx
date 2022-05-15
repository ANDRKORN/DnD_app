import React, { useEffect, useState } from "react";
import imgCloud from "../../static/egg.png";
import s from "./style.module.css";

const Cloud = ({ width, height, refs }) => {
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const resize = () => setUpdate(!update);
    window.addEventListener("resize", resize);
  }, [update]);
  let arrClouds = [];
  const imgCloudNew = new Image();
  imgCloudNew.src = imgCloud;
  imgCloudNew.width = width;
  imgCloudNew.height = height;
  let heightForg = 0;
  let widthForg = 0;
  if (
    refs.current.clientHeight * refs.current.clientWidth !== 0 &&
    imgCloudNew.height * imgCloudNew.width !== 0
  ) {
    heightForg = Math.floor(
      Math.floor(refs.current.clientHeight) / imgCloudNew.height
    );
    widthForg = Math.floor(
      Math.floor(refs.current.clientWidth) / imgCloudNew.width
    );
  } else {
    alert("Обновите страницу");
  }

  const forMaster = [];
  const changeForg = (e) => {
    const index = forMaster.findIndex(
      (el) => el.substr(0, e.target.alt.length) === e.target.alt
    );
    if (index >= 0) {
      forMaster[index] = `${forMaster[`${index}`].slice(0, -1)}0`;
      localStorage.setItem("forg", JSON.stringify(forMaster));
    }
    e.target.style.opacity = 0;
  };
  const localForg = JSON.parse(localStorage.getItem("forg"));
  if (localForg) {
    arrClouds = [];
    for (let i = 0, j = 0; i < heightForg - 1; i++, j++) {
      const res = [];
      for (let g = 0; g < widthForg - 1; g++, j++) {
        res.push(
          <img
            src={imgCloud}
            useMap="dnd_map"
            alt={`${i}${g}`}
            key={`${i}${g}${g - 1}${i - 1}${(i + 1) / 2}`}
            className={
              s.cloud + " " + (i % 2 === 0 ? s.alternate : s.alternate_reverse)
            }
            height={`${height}px`}
            width={`${width}px`}
            onClick={(e) => changeForg(e)}
            style={{
              opacity:
                localForg
                  .find((el) => el.slice(0, `${i}${g}`.length) === `${i}${g}`)
                  .slice(-1) > 0
                  ? 1
                  : 0,
            }}
          />
        );
        forMaster.push(
          `${i}${g},${width},${height},${
            +localForg
              .find((el) => el.slice(0, `${i}${g}`.length) === `${i}${g}`)
              .slice(-1) > 0
              ? 1
              : 0
          }`
        );
      }
      arrClouds.push(<div key={`${i}`}>{res}</div>);
    }
  } else {
    for (let i = 0; i < heightForg - 1; i++) {
      const res = [];
      for (let g = 0; g < widthForg - 1; g++) {
        res.push(
          <img
            src={imgCloud}
            useMap="dnd_map"
            alt={`${i}${g}`}
            key={`${i}${g}${g - 1}${i - 1}${(i + 1) / 2}`}
            className={`${s.cloud} ${(i % 2 === 0 ? s.alternate : s.alternate_reverse)}`}
            height={`${height}px`}
            width={`${width}px`}
            onClick={(e) => changeForg(e)}
          />
        );
        forMaster.push(`${i}${g},${width},${height},${1}`);
      }
      arrClouds.push(<div key={`${i}`}>{res}</div>);
    }
    const data = JSON.stringify(forMaster);
    localStorage.setItem("forg", data);
  }

  return (
    <div
      style={{
        position: "relative",
        top: -refs.current.clientHeight,
        width: refs.current.clientWidth,
        maxHeight: refs.current.clientHeight,
      }}
    >
      {arrClouds}
    </div>
  );
};
export default Cloud;
