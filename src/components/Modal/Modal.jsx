import axios from "axios";
import React, { useContext, useState } from "react";
import styles from "./modal.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Modal = ({
  modal,
  setModal,
  Header,
  text,
  actionText,
  actionMethod,
}) => {
  const [disabled, setDisabled] = useState(false);
  const handleDelete = async () => {
    setDisabled(true);
    actionMethod();
    setDisabled(false);
  };
  return (
    <div className={!modal ? styles.DeleteTask_close : styles.Delete_wrapper}>
      <ToastContainer />
      <div className={styles.Delete_box}>
        <h1 className={styles.Delete_head}>{Header}</h1>
        <p className={styles.Delete_text}>
          Are you sure you want to {text}?
        </p>
        <div className={styles.Delete_buttons}>
          <button
            onClick={() => setModal(!modal)}
            className={styles.Delete_button1}
          >
            No, Thanks
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className={styles.Delete_button2}
            disabled={disabled}
          >
            Yes, {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
