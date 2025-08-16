import React, { useEffect, useState } from "react";

function Weather() {
    const [city, setCity] = useState("Ranchi");
    const [input, setInput] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [bgImage, setBgImage] = useState(""); 

    const fetchData = (cityName) => {
        setLoading(true);
        setError(null);

        fetch(
`https://api.weatherapi.com/v1/forecast.json?key=8eca5991536b4b78b4775609252407&q=${cityName}&days=3&aqi=no&alerts=no`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error.message);
                    setWeather(null);
                } else {
                    setWeather(data);
                    setCity(cityName);
                    changeBackground(data.current.condition.text);
          
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Something went wrong!");
                setLoading(false);
            });
    };


    const changeBackground = (condition) => {
        let lower = condition.toLowerCase();
        if (lower.includes("sunny") || lower.includes("clear")) {
            setBgImage(
                "https://images.unsplash.com/photo-1612863229236-60722f5ef8c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            );
        } else if (lower.includes("cloud")) {
            setBgImage(
                "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            );
        } else if (lower.includes("rain")) {
            setBgImage(
                "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            );
        } else if (lower.includes("snow")) {
            setBgImage(
                "https://images.unsplash.com/photo-1458639010157-4e9732b494d6?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            );
        } else {
            setBgImage(
                "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            );
        }
    };

    useEffect(() => {
        
            fetchData(city);
        
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center p-5 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="backdrop-blur-md bg-black/30 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-white/20 text-white">
                <h1 className="text-3xl font-bold mb-6">🌦 Weather Forecast</h1>

                <div className="flex space-x-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow px-4 py-2 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                    <button
                        onClick={() => fetchData(input)}
                        className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
                    >
                        Search
                    </button>
                </div>

                {loading ? (
                    <p className="animate-pulse">Loading...</p>
                ) : error ? (
                    <p className="text-red-300">{error}</p>
                ) : weather ? (
                    <>
                        <img
                            src={weather.current.condition.icon}
                            alt="Weather icon"
                            className="mx-auto w-20 mb-3"
                        />
                        <p className="text-4xl font-bold">{weather.location.name}</p>
                        <p className="text-lg">{weather.location.country}</p>
                        <p className="text-2xl font-semibold mt-2">
                            {weather.current.temp_c}°C
                        </p>
                        <p className="text-lg italic">{weather.current.condition.text}</p>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div className="bg-white/20 rounded-lg p-3">
                                💧 Humidity
                                <p className="text-lg">{weather.current.humidity}%</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-3">
                                💨 Wind
                                <p className="text-lg">{weather.current.wind_kph} kph</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-3 col-span-2">
                                🕒 Local Time
                                <p className="text-lg">{weather.location.localtime}</p>
                            </div>
                        </div>

                  
                        <h2 className="text-2xl font-bold mt-6">Next 3 Days</h2>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            {weather.forecast.forecastday.map((day, index) => (
                                <div key={index} className="bg-white/20 rounded-lg p-3 flex flex-col items-center">
                                    <p className="font-semibold">
                                        {new Date(day.date).toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })}
                                    </p>
                                    <img
                                        src={day.day.condition.icon}
                                        alt="Forecast icon"
                                        className="w-12"
                                    />
                                    <p>{day.day.avgtemp_c}°C</p>
                                    <p className="text-sm">{day.day.condition.text}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default Weather;

