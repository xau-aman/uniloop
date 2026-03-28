export interface Event {
  id: number;
  title: string;
  desc: string;
  category: string;
  day: string;
  month: string;
  icon: string;
  image: string;
  badge: string;
  featured: boolean;
  location: string;
  spots: string;
  time: string;
}

export interface Club {
  id: number;
  name: string;
  desc: string;
  icon: string;
  members: number;
  tags: string[];
}

export interface Activity {
  id: number;
  text: string;
  icon: string;
  time: string;
  type: "announcement" | "result" | "event" | "update";
}

export const events: Event[] = [
  {
    id: 1,
    title: "Signifiya 2026",
    desc: "The flagship annual tech-cultural fest of Adamas University. Three days of innovation, creativity, competitions, performances, and unforgettable campus experiences.",
    category: "cultural",
    day: "15",
    month: "Mar",
    icon: "rocket",
    image: "/coverfinal.png",
    badge: "Featured",
    featured: true,
    location: "Adamas University Campus",
    spots: "2000+ spots",
    time: "10:00 AM",
  },
];

export const clubs: Club[] = [
  { id: 1, name: "Code Club", desc: "Competitive programming, open source contributions & hackathons", icon: "code", members: 180, tags: ["Coding", "Open Source"] },
  { id: 2, name: "Artistry", desc: "Painting, sketching, digital art & creative expression", icon: "palette", members: 95, tags: ["Art", "Design"] },
  { id: 3, name: "Robotics Society", desc: "Build bots, drones, IoT projects & compete nationally", icon: "cpu", members: 120, tags: ["Robotics", "IoT"] },
  { id: 4, name: "Drama Club", desc: "Theatre, improv, street plays & annual productions", icon: "theater", members: 75, tags: ["Theatre", "Acting"] },
  { id: 5, name: "Sports Council", desc: "All inter & intra college sports events & tournaments", icon: "trophy", members: 200, tags: ["Sports", "Fitness"] },
  { id: 6, name: "Music Society", desc: "Bands, solo acts, jam sessions & campus concerts", icon: "music", members: 110, tags: ["Music", "Bands"] },
  { id: 7, name: "E-Cell", desc: "Startups, pitch competitions, business mentorship", icon: "rocket", members: 150, tags: ["Startup", "Business"] },
  { id: 8, name: "Photography Club", desc: "Photo walks, editing workshops & exhibitions", icon: "camera", members: 85, tags: ["Photography", "Editing"] },
];

export const activities: Activity[] = [
  { id: 1, text: "Signifiya 2026 registrations are now live — grab your spot!", icon: "megaphone", time: "2 hours ago", type: "announcement" },
  { id: 2, text: "Code Club is hosting a pre-Signifiya hackathon warmup session", icon: "code", time: "5 hours ago", type: "event" },
  { id: 3, text: "Signifiya 2026 performance lineup announced — 20+ acts confirmed", icon: "music", time: "1 day ago", type: "update" },
  { id: 4, text: "Robotics Society will showcase drones at Signifiya tech expo", icon: "cpu", time: "1 day ago", type: "event" },
  { id: 5, text: "E-Cell startup pitch competition at Signifiya — apply now", icon: "rocket", time: "2 days ago", type: "event" },
  { id: 6, text: "Photography Club covering all Signifiya events — volunteers needed", icon: "camera", time: "3 days ago", type: "update" },
];

export const categories = ["all", "cultural"] as const;
export type Category = typeof categories[number];
