import type { CharacterStock } from "../types";

type Props = {
  character: CharacterStock;
  onBuy?: (charName: string) => void;
  onSell?: (charName: string) => void;
};

export default function CharacterCard({ character, onBuy, onSell }: Props) {
  const changeColor = character.dailyChange >= 0 ? "text-success" : "text-danger";
  const changeSign = character.dailyChange >= 0 ? "+" : "";

  return (
    <div className="card shadow-sm bg-dark text-white">
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Stock Token</h6>
        <h3 className="card-text fw-bold">
          ₿{character.tokenPrice.toLocaleString()}
        </h3>
        <p className={`${changeColor}`}>
          {changeSign}{character.dailyChange.toFixed(2)}%
        </p>
        <div className="d-flex justify-content-between">
          <small>Market Cap: ₿{character.marketCap.toLocaleString()}</small>
          <small>Volume: ₿{character.volume.toLocaleString()}</small>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button
            className="btn btn-success w-50"
            onClick={() => onBuy?.(character.name)}
          >
            Buy
          </button>
          <button
            className="btn btn-danger w-50"
            onClick={() => onSell?.(character.name)}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
