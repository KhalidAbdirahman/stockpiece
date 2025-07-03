import CharacterCard from "../components/CharacterCard";
import type { CharacterStock } from "../types";
import TrendsGraph from "../components/TrendsGraph";

const characters: CharacterStock[] = [
  {
    id: "zoro",
    name: "Roronoa Zoro",
    tokenPrice: 1320000,
    dailyChange: 2.75,
    marketCap: 13200000000,
    volume: 1900000,
  },
  {
    id: "sanji",
    name: "Sanji",
    tokenPrice: 980000,
    dailyChange: -1.12,
    marketCap: 9800000000,
    volume: 1200000,
  },
  {
    id: "nami",
    name: "Nami",
    tokenPrice: 760000,
    dailyChange: 0.85,
    marketCap: 7600000000,
    volume: 800000,
  },
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    tokenPrice: 2500000,
    dailyChange: 5.3,
    marketCap: 50000000000,
    volume: 5000000,
  },
  {
    id: "usopp",
    name: "Usopp",
    tokenPrice: 540000,
    dailyChange: -0.6,
    marketCap: 3000000000,
    volume: 420000,
  },
  {
    id: "robin",
    name: "Nico Robin",
    tokenPrice: 880000,
    dailyChange: 1.5,
    marketCap: 7500000000,
    volume: 910000,
  },
  {
    id: "brook",
    name: "Brook",
    tokenPrice: 450000,
    dailyChange: 0.2,
    marketCap: 2500000000,
    volume: 300000,
  },
  {
    id: "franky",
    name: "Franky",
    tokenPrice: 670000,
    dailyChange: -1.8,
    marketCap: 4200000000,
    volume: 680000,
  },
  {
    id: "jinbe",
    name: "Jinbe",
    tokenPrice: 1100000,
    dailyChange: 3.0,
    marketCap: 9500000000,
    volume: 1500000,
  },
  {
    id: "shanks",
    name: "Shanks",
    tokenPrice: 4000000,
    dailyChange: 8.0,
    marketCap: 90000000000,
    volume: 7000000,
  },
];

export default function HomePage() {
  function handleBuy(charName: string) {
    alert(`Buying ${charName}`);
  }

  function handleSell(charName: string) {
    alert(`Selling ${charName}`);
  }

  return (
    <div className="d-flex">
      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <h2 className="text-center mb-4">Stock Trends</h2>
        <TrendsGraph />

        <h2 className="text-center my-4">Characters</h2>
        <p className="text-center text-muted">
          Scroll right sidebar to view all characters
        </p>
      </div>

      {/* Character Cards Sidebar */}
      <div
        style={{
          width: "320px",
          height: "calc(100vh - 56px)",
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        {characters.map((char) => (
          <div className="mb-3" key={char.id}>
            <CharacterCard
              character={char}
              onBuy={handleBuy}
              onSell={handleSell}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
