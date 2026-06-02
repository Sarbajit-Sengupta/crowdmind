"use client";

import { useEffect, useState } from "react";


export default function WeatherCard() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    async function loadWeather() {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setTemp(data.current?.temperature_2m ?? null);
    }

    loadWeather();
  }, []);

  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Live Weather Context</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">Planned Condition</p>
          <h3 className="mt-2 text-3xl font-bold text-cyan-300">Live API</h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">Live Temperature</p>
          <h3 className="mt-2 text-3xl font-bold text-cyan-300">
            {temp === null ? "Loading..." : `${temp}°C`}
          </h3>
        </div>
      </div>
    </section>
  );
}