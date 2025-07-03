import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  const dummyData = [
    { chapter: "1140", Zoro: 100, Sanji: 80, Luffy: 40 },
    { chapter: "1141", Zoro: 300, Sanji: 200, Luffy: 100 },
    { chapter: "1142", Zoro: 500, Sanji: 300, Luffy: 200 },
    { chapter: "1143", Zoro: 350, Sanji: 150, Luffy: 220 },
    { chapter: "1144", Zoro: 700, Sanji: 400, Luffy: 350 },
    { chapter: "1145", Zoro: 800, Sanji: 600, Luffy: 400 },
  ];
  
  export default function TrendsGraph() {
    return (
      <div
        style={{
          backgroundImage: `url('/parchment_texture.png')`,
          backgroundSize: "cover",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dummyData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="chapter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Zoro"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Sanji"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Luffy"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  