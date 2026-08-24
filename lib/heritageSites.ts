import { HeritageSite } from "@/types";

// Real coordinates for well-known Indian heritage sites. Add more entries
// here to expand the Heritage Hunt — the map page needs no other changes.
export const heritageSites: HeritageSite[] = [
  {
    id: "hampi",
    name: "Hampi",
    hint: "A ruined empire's capital, scattered across giant boulders on the Tungabhadra river.",
    lat: 15.335,
    lng: 76.46,
    xp: 80,
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    hint: "A white-marble mausoleum built by a grieving emperor for his queen.",
    lat: 27.1751,
    lng: 78.0421,
    xp: 60,
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    hint: "The tallest brick minaret in the world, rising over Delhi.",
    lat: 28.5245,
    lng: 77.1855,
    xp: 60,
  },
  {
    id: "konark",
    name: "Konark Sun Temple",
    hint: "A temple shaped like a colossal stone chariot for the sun god.",
    lat: 19.8876,
    lng: 86.0945,
    xp: 70,
  },
  {
    id: "ajanta",
    name: "Ajanta Caves",
    hint: "Rock-cut Buddhist caves famous for centuries-old painted murals.",
    lat: 20.5519,
    lng: 75.7033,
    xp: 75,
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Shore Temple",
    hint: "A weathered stone temple standing right at the edge of the Bay of Bengal.",
    lat: 12.6169,
    lng: 80.1926,
    xp: 70,
  },
];

export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
