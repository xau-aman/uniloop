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
  subtitle: string;
  desc: string;
  icon: string;
  logo: string;
  tags: string[];
  instagram: string;
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
  { id: 1, name: "Musicorum", subtitle: "Music Club", desc: "Eastern, Western, Classical and instrument sessions all year round.", icon: "music", logo: "/musicorium_club_logo.jpg", tags: ["Music", "Instruments"], instagram: "https://www.instagram.com/musicorum_adamas/" },
  { id: 2, name: "Robotics & AI Club", subtitle: "Robotics Club", desc: "Computer Vision, AI, PCB design, automation, and IoT projects.", icon: "cpu", logo: "/robotics_club_logo.jpg", tags: ["Robotics", "AI"], instagram: "https://www.instagram.com/adamas_robozoid/" },
  { id: 3, name: "Jhankar", subtitle: "Dance Club", desc: "Expressing creativity and cultural diversity through dance.", icon: "activity", logo: "/jhankar_club_logo.jpg", tags: ["Dance", "Cultural"], instagram: "https://www.instagram.com/adamasjhankarclub/" },
  { id: 4, name: "Kissewala", subtitle: "Film & Drama Club", desc: "Film-making, film appreciation, and theatrical performances.", icon: "camera", logo: "/kissewala_club_logo.jpg", tags: ["Film", "Drama"], instagram: "" },
  { id: 5, name: "Entrepreneurship Club", subtitle: "E-Cell", desc: "Startup incubation, pitch competitions, and business mentorship.", icon: "rocket", logo: "/entrepreneurship_club_logo.jpg", tags: ["Startup", "Business"], instagram: "https://www.instagram.com/eclubadamas/" },
  { id: 6, name: "Cy-Coders", subtitle: "Coding Club", desc: "Coding workshops, hackathons, and competitive programming.", icon: "code", logo: "/cycoders_club_logo.jpg", tags: ["Coding", "Tech"], instagram: "https://www.instagram.com/adamas_cycoders/" },
];

export const categories = ["all", "cultural"] as const;
export type Category = typeof categories[number];
