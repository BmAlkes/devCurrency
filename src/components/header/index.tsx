import styles from "./header.module.css";
import logoimg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logoimg} alt="Logo Cripto" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
