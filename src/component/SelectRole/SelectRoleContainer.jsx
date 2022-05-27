import React from "react";
import { connect } from "react-redux";
import { useDispatchData } from "../../help_func";
import SelectedRole from "./SelectRole";

const SelectRoleContainer = () => {
  return (
    <SelectedRole useDispatchData={useDispatchData} />
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(SelectRoleContainer);
