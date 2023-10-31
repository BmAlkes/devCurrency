import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./detail.module.css";

interface CoinProps {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  error?: string;
  numberDelta: number;
}

export const Detail = () => {
  const { cripto } = useParams();
  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://sujeitoprogramador.com/api-cripto/coin/?key=b4cd8f8fb3de94c6&symbol=${cripto}`
    )
      .then((response) => response.json())
      .then((data: CoinProps) => {
        if (data.error) {
          navigate("/");
        }
        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        const resultData = {
          ...data,
          formatedPrice: price.format(Number(data.price)),
          formatedMarket: price.format(Number(data.market_cap)),
          formatedLowPrice: price.format(Number(data.low_24h)),
          formatedHighPrice: price.format(Number(data.high_24h)),
          numberDelta: parseFloat(data.delta_24h.toString().replace(",", ".")),
        };
        setCoin(resultData);
        setLoading(false);
      });
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Loading information</h4>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <p className={styles.center}>{coin?.symbol}</p>

      <section className={styles.content}>
        <p>
          <strong>Price:</strong>
          {coin?.formatedPrice}
        </p>
        <p>
          <strong>High Price 24h:</strong>
          {coin?.formatedHighPrice}
        </p>
        <p>
          <strong>Low Price 24h:</strong>
          {coin?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta 24h:</strong>
          <span
            className={
              coin?.numberDelta && coin?.numberDelta >= 0
                ? styles.profit
                : styles.lost
            }
          >
            {coin?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Market Value:</strong>
          {coin?.formatedMarket}
        </p>
      </section>
    </div>
  );
};
