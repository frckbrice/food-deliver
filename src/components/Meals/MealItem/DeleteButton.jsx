import React from "react";
import PropTypes from "prop-types";
import classes from "./ShowCartDetail.module.css";
import { HiOutlineTrash } from "react-icons/hi";

const DeleteButton = ({ handleDeleteItem, item, children }) => {
  return (
    <button
      type="button"
      onClick={handleDeleteItem(item)}
      className={classes["remove-item"]}
    >
      <HiOutlineTrash size={50} />
    </button>
  );
};

DeleteButton.propTypes = {
  handleDeleteItem: PropTypes.func,
};

export default DeleteButton;
