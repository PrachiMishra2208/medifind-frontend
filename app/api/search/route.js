export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const pharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      address: "MG Road",
      distance: 1.2,
      stock: 5,
      last_updated: "10 min ago",
    },
    {
      id: 2,
      name: "CarePlus Pharmacy",
      address: "Central Park",
      distance: 2.4,
      stock: 0,
      last_updated: "1 hour ago",
    },
    {
      id: 3,
      name: "HealthHub",
      address: "Station Road",
      distance: 3.1,
      stock: 12,
      last_updated: "2 min ago",
    },
  ];

  // For now, just return all sample pharmacies if query is not empty
  const results = q ? pharmacies : [];

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
