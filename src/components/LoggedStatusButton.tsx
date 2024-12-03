import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./LoggedStatusButton.module.css";

interface StatusButtonRef {
  toggleStatus: () => void;
}

const LoggedStatusButton: React.FC<{}> = forwardRef((_, ref) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleStatus = () => {
    setIsLoggedIn((prevStatus) => !prevStatus);
  };

  useImperativeHandle(ref, () => ({
    toggleStatus,
  }));

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
