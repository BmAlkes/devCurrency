import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 Page Not Found</h1>
      <Link to="/">Acess Cripto Coins</Link>
    </div>
  );
};
