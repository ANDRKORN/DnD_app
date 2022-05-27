import React, { useEffect, useState } from "react";
import map from "../../static/map2.jpg";
import { connect } from "react-redux";
import { useDispatchData } from "../../help_func";
import MapDnD from "./MapDnD";
const MapContainer = ({ open, fog_war, map, masterGame, selectMap, showMapPlayers}) => {
  useEffect(() => {}, [open, fog_war, map.url_img]);
  const mapNew = new Image();
  mapNew.src = map.url;
  return (
    <MapDnD
      open={open}
      fog_war={fog_war.fog}
      fog_war_open={fog_war?.open}
      map={mapNew}
      useDispatchData={useDispatchData}
      masterGame={masterGame}
      selectMap={selectMap}
      url_img={map.url}
      showMapPlayers={showMapPlayers}
    />
  );
};
const mapStateToProps = (state) => ({
  open: state.map.open,
  fog_war: state.map.fog_war,
  map: state.map.map_img,
  selectMap: state.map.select_maps,
  masterGame: state.master.masterGame,
  showMapPlayers: state.master.showMapPlayers,
});
export default React.memo(connect(mapStateToProps)(MapContainer));
