import { HeritageStory } from "@/types";

// Panel "image" values are art-keys consumed by <ComicArt/>, which renders
// hand-built SVG illustrations. This keeps Story Mode fully self-contained
// (no broken external image links) and fits a comic's illustrated style
// better than stock photography.
export const hampiStory: HeritageStory = {
  slug: "hampi",
  name: "Hampi",
  location: "Karnataka, India — banks of the Tungabhadra River",
  heroImage: "hampi-hero",
  importance:
    "Hampi is the ruined capital of the Vijayanagara Empire, one of the largest and richest Hindu empires in Indian history. Its temples, bazaars and royal structures are a UNESCO World Heritage Site, and its boulder-strewn landscape has been sacred long before the empire existed.",
  panels: [
    {
      id: "panel-1",
      image: "myth",
      caption: "Sacred ground, long before the empire",
      narration:
        "Way before any king ruled here, this land already had main-character energy. The Tungabhadra river cuts through giant boulders that locals believed were the mythical kingdom of Kishkindha from the Ramayana — home of Hanuman himself. So when a new empire needed a capital, this spot already came pre-loaded with legend.",
    },
    {
      id: "panel-2",
      image: "founding",
      caption: "1336 CE — an empire rises",
      narration:
        "Two brothers, Harihara and Bukka, founded the Vijayanagara Empire right here — partly as a power move against the Sultanates pushing in from the north. Within a few generations, this dusty riverside town exploded into one of the richest capitals on the planet. Not exaggerating — visiting Persian and Portuguese traders straight up compared it to Rome.",
    },
    {
      id: "panel-3",
      image: "golden-age",
      caption: "The golden age — temples, gems and gossip",
      narration:
        "At its peak, Hampi's markets sold diamonds by the roadside like fruit. The Virupaksha Temple — still active today, still running services — anchored the whole city spiritually, while the royal quarters hosted elephants, wrestling matches and a genuinely wild amount of gold.",
    },
    {
      id: "panel-4",
      image: "trade",
      caption: "The stone chariot and the trade roads",
      narration:
        "The Vittala Temple's stone chariot isn't going anywhere — it's carved from a single block of granite, wheels and all. It's basically Hampi's mascot now, and it symbolizes how central this city was to trade routes stretching from the Deccan plateau all the way to Persia and Europe.",
    },
    {
      id: "panel-5",
      image: "fall",
      caption: "1565 — the Battle of Talikota",
      narration:
        "Empires don't last forever, and Vijayanagara's ending was brutal. A coalition of Deccan Sultanates defeated the empire's army at Talikota, and the victors spent months looting and burning the capital. A city that took two centuries to build was left in ruins in a matter of months.",
    },
    {
      id: "panel-6",
      image: "rediscovery",
      caption: "Today — ruins that still speak",
      narration:
        "Hampi never got rebuilt, and honestly, that's why it hits different today. You can walk through an entire abandoned medieval capital — temples, market streets, elephant stables — mostly intact in outline. UNESCO listed it as a World Heritage Site in 1986, and archaeologists are still uncovering more of it.",
    },
  ],
};

export const heritageStories: HeritageStory[] = [hampiStory];
