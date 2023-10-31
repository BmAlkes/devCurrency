import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
export const Home = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder=" Search the symbol of coin: BTC" />
        <button type="submit">
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Coins </th>
            <th scope="col">Market Value </th>
            <th scope="col">Price </th>
            <th scope="col">Volume </th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="coins">
              <Link to="/detail/btc" className={styles.link}>
                <span>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Market Value">
              $122
            </td>
            <td className={styles.tdLabel} data-label="price">
              $122
            </td>
            <td className={styles.tdLoss} data-label="volume">
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
