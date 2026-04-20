import { siteConfig } from "@/site-config";

import {
  Droplets,
  HouseIcon,
  Mail,
  MapPin,
  Phone,
  School2Icon,
  CalendarDays,
  MapIcon,
  Users,
  SettingsIcon,
  TagIcon,
  Clock,
  ToolCase,
  Contact,
} from "lucide-react";

export const NAVLINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Leadership",
    href: "/leadership",

    subLinks: [
      {
        title: "Executive Council",
        href: "/leadership",
      },
      // {
      //   title: "Legislative Council",
      //   href: "/leadership/exec",
      // },
      {
        title: "Legislative Council",
        href: "/leadership/councilors",
      },
      {
        title: "Past Leaders",
        href: "/leadership/past-leaders",
      },
    ],
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Portals",
    href: "/portals",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const categories = [
  "General",
  "Sport",
  "Events",
  "Empowerment",
  "Employment",
  "Infrastructure",
];

export const landmarks = [
  {
    imageUrl: "/images/fcet.jpeg",
    title: "Federal College of Education Technical, Omoku",
    icons: School2Icon,
    description:
      "A premier tertiary institution and major educational hub in Rivers State, offering technical and vocational training to students from across Nigeria. Established to advance skill development and technical education in the Niger Delta region.",
  },
  {
    imageUrl: "/images/sec.jpeg",
    title: "Omoku Main Market",
    icons: TagIcon,
    description:
      "The vibrant commercial heartbeat of ONELGA, where traders and customers converge daily for fresh produce, textiles, household goods, and local crafts. A bustling center of economic activity that showcases the region's entrepreneurial spirit and community commerce.",
  },
  {
    imageUrl: "/images/pofoba.jpeg",
    title: "Traditional Palaces",
    icons: HouseIcon,
    description:
      "Historic royal seats representing the rich cultural heritage of ONELGA's constituent kingdoms: the palace of the Oba of Ogbaland in Omoku, the Nze-Obi of Egbema Kingdom, and the Eze Egi of Egi Kingdom. These architectural landmarks serve as centers of traditional governance and cultural preservation.",
  },
  {
    imageUrl: "/images/obob.jpeg",
    title: "Oil & Gas Infrastructure",
    icons: SettingsIcon,
    description:
      "Critical industrial complexes and installations operated by major energy companies including TotalEnergies, Nigerian Agip Oil Company (NAOC), and Shell Petroleum Development Company (SPDC). These facilities represent ONELGA's strategic role in Nigeria's petroleum industry and economic development.",
  },
  {
    imageUrl: "/images/river-niger.png",
    title: "River Niger (Ndoni Axis)",
    icons: Droplets,
    description:
      "The majestic western flank of Nigeria's greatest river flowing through Ndoni, serving as a vital transportation corridor and agricultural lifeline. This waterway facilitates trade, fishing, and connectivity to major commercial centers like Onitsha, while supporting local farming communities along its fertile banks.",
  },
  {
    imageUrl: "/images/culture.png",
    title: "Cultural Sites",
    icons: MapPin,
    description:
      "Sacred grounds and community spaces that host ONELGA's most celebrated traditional festivals, including the annual Nchaka festival and the vibrant Okuroso masquerade ceremonies in Omoku. These sites preserve ancient customs and bring communities together in colorful displays of cultural heritage.",
  },
  // Uncomment if needed:
  // {
  //   imageUrl: "/images/sec.jpeg",
  //   title: "Natural Resources & Forest Reserves",
  //   icons: Droplets,
  //   description:
  //     "Expansive tropical rainforests and ecological preserves that sustain diverse wildlife while providing valuable timber resources. These natural assets characterize the region's lush geography and contribute to both local livelihoods and environmental conservation efforts.",
  // },
];

export const services = [
  {
    Icon: ToolCase,
    title: "Digital Revenue Portal",
    color: "text-white",
    href: "/portals",
  },
  {
    Icon: MapPin,
    title: "Visit ONELGA",
    color: "text-white",
    href: "/contact",
  },
  {
    Icon: Clock,
    title: "Appointment",
    color: "text-white",
    href: "/contact",
  },
  {
    Icon: Contact,
    title: "Contact Us",
    color: "text-white",
    href: `/contact`,
  },
  // {
  //   Icon: Mail,
  //   title: "Stay Updated",
  //   color: "text-app-green",
  //   href: `#news-letter`,
  // },
];

export const stats = [
  {
    Icon: MapIcon,
    value: "~1,621 km²",
    title: "Area size",
    description: "Total Land Area",
  },
  {
    Icon: Users,
    value: "407,400+",
    title: "Population",
    description: "Estimated residents",
  },
  {
    Icon: CalendarDays,
    value: "1991",
    title: "Established",
    description: "Year of Establishment",
  },
  {
    Icon: MapPin,
    value: "5.3119° N, 6.6531° E",
    title: "Coordinates",
    description: "Local Government HQ location",
  },
];

export const OTHER_CONTACT = [
  {
    title: "Call",
    description: "You can call us on:",
    contact: siteConfig.phone,
    Icon: Phone,
    bg: "bg-app-blue",
  },
  {
    title: "Mail",
    description: "send an email to:",
    contact: siteConfig.email,
    Icon: Mail,
    bg: "bg-app-green",
  },
  {
    title: "Office",
    description: "or visit us:",
    contact: siteConfig.address,
    Icon: MapPin,
    bg: "bg-app-red",
  },
];

export const STATES = [
  { id: "1", value: "Abia State" },
  { id: "2", value: "Adamawa State" },
  { id: "3", value: "Akwa Ibom State" },
  { id: "4", value: "Anambra State" },
  { id: "5", value: "Bauchi State" },
  { id: "6", value: "Bayelsa State" },
  { id: "7", value: "Benue State" },
  { id: "8", value: "Borno State" },
  { id: "9", value: "Cross River State" },
  { id: "10", value: "Delta State" },
  { id: "11", value: "Ebonyi State" },
  { id: "12", value: "Edo State" },
  { id: "13", value: "Ekiti State" },
  { id: "14", value: "Enugu State" },
  { id: "15", value: "Gombe State" },
  { id: "16", value: "Imo State" },
  { id: "17", value: "Jigawa State" },
  { id: "18", value: "Kaduna State" },
  { id: "19", value: "Kano State" },
  { id: "20", value: "Katsina State" },
  { id: "21", value: "Kebbi State" },
  { id: "22", value: "Kogi State" },
  { id: "23", value: "Kwara State" },
  { id: "24", value: "Lagos State" },
  { id: "25", value: "Nasarawa State" },
  { id: "26", value: "Niger State" },
  { id: "27", value: "Ogun State" },
  { id: "28", value: "Ondo State" },
  { id: "29", value: "Osun State" },
  { id: "30", value: "Oyo State" },
  { id: "31", value: "Plateau State" },
  { id: "32", value: "Rivers State" },
  { id: "33", value: "Sokoto State" },
  { id: "34", value: "Taraba State" },
  { id: "35", value: "Yobe State" },
  { id: "36", value: "Zamfara State" },
];

export const TIME = [
  "8:00 a.m.",
  "9:00 a.m.",
  "10:00 a.m.",
  "11:00 a.m.",
  "12:00 p.m.",
  "1:00 p.m.",
  "2:00 p.m.",
  "3:00 p.m.",
  "4:00 p.m.",
  "5:00 p.m.",
];

export const OGBA: string[] = [
  "Omoku",
  "Obirikom",
  "Erema",
  "Akabuka",
  "Obagi",
  "Kreigani",
  "Obiebe",
  "Ogbogwu",
  "Odugiri",
  "Okposi",
];

export const EGBEMA: string[] = [
  "Mgbede",
  "Aggah",
  "Okwuzi",
  "Ebocha",
  "Abacheke",
  "Obiakpu",
  "Mmahu",
];
export const NDONI: string[] = ["Ndoni Town", "Onikwu", "Ase-Azaga", "Isukwa"];

export const WARDS: Record<number, string> = {
  1: "Omoku Town I",
  2: "Omoku Town II",
  3: "Omoku Town III (Obieti)",
  4: "Omoku Town IV (Usomini)",
  5: "Obirikom (Usomini North)",
  6: "Usomini South (Kreigani)",
  7: "Igburu",
  8: "Egi I",
  9: "Egi II",
  10: "Egi III (Erema)",
  11: "Egbema I",
  12: "Egbema II",
  13: " Ndoni I",
  14: "Ndoni II",
  15: "Ndoni III",
  16: "Omoku Town V",
  17: "Egi IV ",
};
