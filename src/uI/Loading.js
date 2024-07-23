import React from "react";
import ContentLoader from "react-content-loader";
import styles from "../components/Cards/Card.module.scss";
const MyLoader = () => (
  <div className={styles.card}>
    <ContentLoader 
    speed={2}
    width={175}
    height={260}
    viewBox="0 0 175 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="123" rx="5" ry="5" width="100%" height="15" /> 
    <rect x="142" y="168" rx="5" ry="5" width="32" height="32" /> 
    <rect x="0" y="167" rx="3" ry="3" width="35" height="13" /> 
    <rect x="0" y="144" rx="5" ry="5" width="100" height="15" /> 
    <rect x="0" y="183" rx="3" ry="3" width="80" height="17" /> 
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="112" />
  </ContentLoader>
  </div>
);

export default MyLoader;
