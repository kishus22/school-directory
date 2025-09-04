"use client";

import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/schools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Schools</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {schools.map((s) => (
          <div key={s.id} className="rounded-2xl border p-4 shadow-sm">
            <img
              src={s.image || "/placeholder.png"}
              alt={s.name}
              className="w-full h-40 object-cover rounded-xl"
            />
            <div className="mt-3 space-y-1">
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">{s.address}</div>
              <div className="text-sm">{s.city}</div>
            </div>
          </div>
        ))}

        {schools.length === 0 && (
          <div className="text-gray-600">
            No schools yet. Add one from the{" "}
            <a className="underline" href="/addSchool">
              form
            </a>
            .
          </div>
        )}
      </div>
    </main>
  );
}
