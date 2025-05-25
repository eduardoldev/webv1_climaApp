import { CloudRain, CloudSnow, MapPin, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { getWeather } from "./services/weatherapi_api";

function App() {
  const [cidade, setCidade] = useState("");
  const [temperatura, setTemperatura] = useState(26);
  const [descricao, setDescricao] = useState("Ensolarado");
  const [umidade, setUmidade] = useState(72);
  const [chuva, setChuva] = useState(15);
  const [uv, setUv] = useState("Alto");
  const [localizacao, setLocalizacao] = useState("Itajaí, SC");
  const [iconeClima, setIconeClima] = useState("☀️");

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
      )
      .join(" ");
  }

  function getWeatherIcon(icon: string) {
    const icons: { [key: string]: string } = {
      "01d": "☀️",
      "02d": "🌤️",
      "03d": "☁️",
      "04d": "☁️",
      "09d": "🌧️",
      "10d": "🌦️",
      "11d": "⛈️",
      "13d": "❄️",
      "50d": "🌫️",
      "01n": "🌙",
      "02n": "🌤️",
      "03n": "☁️",
      "04n": "☁️",
      "09n": "🌧️",
      "10n": "🌦️",
      "11n": "⛈️",
      "13n": "❄️",
      "50n": "🌫️",
    };
    return icons[icon] || "";
  }

  const handleSearch = async () => {
    try {
      const data = await getWeather(cidade);
      const { main, weather, wind, clouds, name, sys } = data;
      const { temp, humidity } = main;
      const { description, icon } = weather[0];
      const { speed } = wind;
      const { all } = clouds;

      setTemperatura(Math.round(temp));
      setDescricao(capitalizeWords(description));
      setUmidade(Math.round(humidity));
      setChuva(Math.round(all));
      setUv(speed < 5 ? "Baixo" : speed < 10 ? "Moderado" : "Alto");
      setIconeClima(getWeatherIcon(icon));
      setLocalizacao(`${name}, ${sys.country}`);
      setCidade("");
    } catch (error) {
      console.error("Erro ao buscar clima:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none" />
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-red-500" />
            <Input
              placeholder="Digite sua cidade..."
              className="flex-1"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>

          <div className="flex flex-col items-center text-center mb-6">
            <p className="text-lg">{descricao}</p>
            <span className="text-6xl">{iconeClima}</span>
            <h1 className="text-4xl font-bold">{temperatura}°C</h1>

            <p className="text-sm text-muted-foreground">{localizacao}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <CloudRain className="w-6 h-6 mb-1 text-blue-400" />
              <p className="text-sm">Chance de Chuva</p>
              <p className="text-sm">{chuva}%</p>
            </div>
            <div className="flex flex-col items-center">
              <CloudSnow className="w-6 h-6 mb-1 text-cyan-300" />
              <p className="text-sm">Umidade</p>
              <p className="text-sm">{umidade}%</p>
            </div>
            <div className="flex flex-col items-center">
              <Sun className="w-6 h-6 mb-1 text-yellow-400" />
              <p className="text-sm">UV</p>
              <p className="text-sm">{uv}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <span className="fixed bottom-4 right-6 text-2xl font-bold text-white drop-shadow-lg z-50">
        ClimaApp
      </span>
    </div>
  );
}

export default App;
