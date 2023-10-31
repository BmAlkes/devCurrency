import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { FormEvent, useEffect, useState } from "react";

// https://coinlib.io/api/v1/coinlist?key=9142109afd1d8501
export interface CoinsProps {
  name: string;
  price: string;
  delta_24h: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  numberDelta: number;
}

export interface DataProps {
  coins: CoinsProps[];
}
export const Home = () => {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      await fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          });
          const coinsData = data.coins.slice(0, 22);
          const formatResult = coinsData.map((item) => {
            console.log(item);
            const formatted = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              numberDelta: parseFloat(
                item.delta_24h.toString().replace(",", ".")
              ),
            };
            return formatted;
          });
          setCoins(formatResult);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    getData();
  }, []);
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue === " ") return;
    navigate(`/detail/${inputValue} `);
  };
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder=" Search the symbol of coin: BTC"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
          {coins.map((coin) => {
            return (
              <tr className={styles.tr} key={coin.name}>
                <td className={styles.tdLabel} data-label="coins">
                  <Link to={`/detail/${coin.symbol}`} className={styles.link}>
                    <span>{coin.name}</span> | {coin.symbol}
                  </Link>
                </td>
                <td className={styles.tdLabel} data-label="Market Value">
                  {coin.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label="price">
                  {coin.formatedPrice}
                </td>
                <td
                  className={
                    coin.numberDelta && coin.numberDelta >= 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-label="volume"
                >
                  <span>{coin.delta_24h}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
