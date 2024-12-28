import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import WidgetIframe from "./WidgetIframe";
import { Theme, BuildType } from "../types";
import styles from "./OnboardingIframe.module.css";

// eslint-disable-next-line no-empty-pattern
const _PortfolioScreen = (
  {
    authToken,
    buildType,
    theme,
  }: {
    authToken: string | undefined;
    buildType: BuildType;
    theme: Theme;
  },
  ref: any,
) => {
  const [showScreen, setShowScreen] = useState(false);
  const modalData = useMemo(() => {
    return {
      authToken: authToken || "",
      environment: buildType as string,
      theme,
    };
  }, [authToken, buildType, theme]);

  const openModal = () => {
    setShowScreen(true);
  };

  const closeModal = () => {
    setShowScreen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  function handleClose() {
    closeModal();
  }

  return (
    <div
      className={`${styles.modalOverlay} ${showScreen ? "" : styles.hidden}`}
      onClick={handleClose}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.container}>
            {showScreen && (
              <WidgetIframe modalData={modalData} onClose={handleClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const PortfolioScreen = forwardRef(_PortfolioScreen);
