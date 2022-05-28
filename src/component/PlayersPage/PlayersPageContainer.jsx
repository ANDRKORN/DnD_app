import React from "react";
import { connect, useDispatch } from "react-redux";
import { useDispatchData } from "../../help_func";
import { CLASS_FETCH_REQUESTED } from "../../redux/compactDnd/actions";
import PlayersPage from "./PlayersPage";

const PlayersPageContainer = ({classes}) => {
  const dispatch = useDispatch();
  useDispatchData({type: CLASS_FETCH_REQUESTED}, dispatch)
  return (
    <PlayersPage />
  );
};
const mapStateToProps = (state) => ({
  classes: state.compactDnd.class,
});
export default connect(mapStateToProps)(PlayersPageContainer);
