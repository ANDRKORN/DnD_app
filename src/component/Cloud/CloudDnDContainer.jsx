import React, { useEffect, useState } from "react";
import imgCloud from "../../static/egg.png";
import NewCloudDnD from "./CloudDnD";

const CloudDnDContainer = ({
  width,
  height,
  refs,
  fog_war_open,
  masterGame,
  url_img,
  open,
}) => {
  const [update, setUpdate] = useState(false);
  setTimeout(() => {
    setUpdate(!update);
  }, 2000);
  useEffect(() => {
    window.addEventListener("resize", () => setUpdate(!update));
  }, [window.innerWidth, update, open]);  

  const changeForg = (e) => {
    const index = localForg.forg.findIndex((el) => {
      if (masterGame) {
        e.target.style["background-color"] = "green";
        return (
          el.substr(0, e.target.attributes[0].value.length) ===
          e.target.attributes[0].value
        );
      } else {
        e.target.style["display"] = "none";
        return el.substr(0, e.target.alt.length) === e.target.alt;
      }
    });
    if (index >= 0) {
      localForg.forg[index] = `${localForg.forg[`${index}`].slice(0, -1)}0`;
      for (let value in localForgMaps) {
        if (value.name === localForg.name) {
            value = localForg; 
        }
      }
      localStorage.setItem("mapForgs", JSON.stringify(localForgMaps));
      window.dispatchEvent(new Event("storage"));
    }
  }; 
  
  const imgCloudNew = new Image();
  imgCloudNew.src = imgCloud;
  imgCloudNew.width = width;
  imgCloudNew.height = height;
  let heightForg = 0;
  let widthForg = 0;
  const mapHeight = refs.current.clientHeight;
  const mapWidth = refs.current.clientWidth;
  let localForg = false;
  let localForgMaps = JSON.parse(localStorage.getItem("mapForgs"));
  if (localForgMaps && localForgMaps.length !== 0 ) {
    localForg = localForgMaps.find(el => el.name === url_img)?.forg ? localForgMaps.find(el => el.name === url_img) : false;
    if (!localForg?.forg) {
      localForgMaps = localForgMaps.filter(el => el.name !== url_img);
      localStorage.setItem("mapForgs", JSON.stringify(localForgMaps))
    }
  }
  if (localForg && localForg?.forg?.length !== 0) {       
    const changeWidth = localForg.forg.filter((el) => {
      return el.slice(0, 1) === "0";
    }).length;
    const changeHieght =
      +`${Math.max(
        ...localForg.forg.map((el) => {
          return el.split(",")[0];
        })
      )}` + 1;
    let widthlocalForg = localForg.forg[0].split(',').slice(2,4)[0];
    let heightlocalForg = localForg.forg[0].split(',').slice(2,4)[1];
    if (
      Math.floor(mapWidth / changeWidth) !== widthlocalForg &&
      Math.floor(mapHeight / changeHieght) !== heightlocalForg
    ) {
      width = Math.floor((mapWidth / changeWidth / widthlocalForg) * widthlocalForg);
      height = Math.floor((mapHeight / changeHieght / heightlocalForg) * heightlocalForg);
      imgCloudNew.width = width;
      imgCloudNew.height = height;
    }
    heightForg = changeHieght;
    widthForg = changeWidth;
  } else {
    localForg = false;
    function calcParam (param, mapParam) {
      if (param > 0) {
        if (mapParam % param === 1) {
          return param;
        } else if (mapParam % param === 0) {
          return param;
        } else {
          return calcParam(param + 1, mapParam)
        }
      }
    }
    width = calcParam(width, mapWidth);
    height = calcParam(height, mapHeight);
    /*for (let i = width; i > 0; i++) {
      if (mapWidth % i === 1) {
        width = i;
        break;
      } else if (mapWidth % i === 0) {
        width = i;
        break;
      }
    }*/
    /*for (let i = height; i > 0; i++) {
      if (mapHeight % i === 1) {
        height = i;
        break;
      } else if (mapHeight % i === 0) {
        height = i;
        break;
      }
    }*/
    if (
      mapHeight * mapWidth !== 0 &&
      imgCloudNew.height * imgCloudNew.width !== 0
    ) {
      heightForg = Math.floor(mapHeight / height);
      widthForg = Math.floor(mapWidth / width);
    } else {
      alert("Обновите страницу");
    }
  }
  return (
    <NewCloudDnD
      width={width}
      height={height}
      mapHeight={mapHeight}
      mapWidth={mapWidth}
      heightCount={heightForg}
      widthCount={widthForg}
      fog_war_open={fog_war_open}
      masterGame={masterGame}
      changeForg={changeForg}
      localForg={localForg?.forg}
      url_img={url_img}
      localForgMaps={localForgMaps}
    />
  );
};
export default React.memo(CloudDnDContainer);
