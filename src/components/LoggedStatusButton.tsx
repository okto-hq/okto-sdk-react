import React, { forwardRef, useContext } from "react";
import styles from "./LoggedStatusButton.module.css";
import { OktoContext } from "../OktoProvider";

const LoggedStatusButton: React.FC<{}> = forwardRef((_) => {
  const context = useContext(OktoContext);
  if (!context) {
    return null;
  }
  const { isLoggedIn } = context;

  return (
    <div className={styles.buttonContainer}>
      <div
        className={`${styles.statusIndicator} ${
          isLoggedIn ? styles.online : styles.offline
        }`}
      ></div>
      <span className={styles.statusText}>
        Status: {isLoggedIn ? "Logged In" : "Not Logged In"}
      </span>
    </div>
  );
});

export default LoggedStatusButton;
