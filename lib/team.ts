export type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  email?: string;
  whatsapp?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Lema Aaron",
    role: "Software Engineer",
    image: "/images/Lema.jpeg",
    alt: "Lema Aaron portrait",
    bio: "Technical lead at SlimCyberTech. Software, web, mobile, networking, and the systems those sit on.",
    email: "info@slimcybertech.com",
    whatsapp: "https://wa.me/256772581510",
  },
  {
    name: "Sebabe Swaleh",
    role: "Senior Software Engineer",
    image: "/images/Sebabe.jpeg",
    alt: "Sebabe Swaleh",
    bio: "Software engineering student at Makerere University. Flutter, Android, and data work.",
    email: "swale.sebabeabdu@students.mak.ac.ug",
    whatsapp: "https://wa.me/256778544744",
  },
  {
    name: "Awongo Fahadi Rashid",
    role: "Senior Software Engineer",
    image: "/images/Awongo Fahadi Rashid.jpeg",
    alt: "Awongo Fahadi Rashid portrait",
    bio: "Software engineering student at Makerere University. Full stack, from the interface to the server.",
    email: "fahadirashidawongo@gmail.com",
    whatsapp: "https://wa.me/256764922070",
  },
  {
    name: "Uhuru Diana",
    role: "Senior Front-end Developer",
    image: "/images/Diana.jpg",
    alt: "Uhuru Diana portrait",
    bio: "Information technology student at Muni University. Front-end work, networking, and software people can actually use.",
    email: "dianauhuru9@gmail.com",
    whatsapp: "https://wa.me/256791906404",
  },
  {
    name: "Aguta Kennedy",
    role: "Web Developer, Graphic Designer",
    image: "/images/Keno.jpeg",
    alt: "Aguta Kennedy",
    bio: "Web developer and graphic designer. He builds sites and the visuals that go with them.",
    whatsapp: "https://wa.me/256780814373",
  },
  {
    name: "Akuma Dalil",
    role: "IT Operations & Support Specialist",
    image: "/images/Akuma Dalil.jpg",
    alt: "Akuma Dalil portrait",
    bio: "Looks after systems and support. Keeps services running.",
    email: "akumadalil1@gmail.com",
    whatsapp: "https://wa.me/256762099651",
  },
  {
    name: "Hussen Yang Salim",
    role: "Graphic Designer",
    image: "/images/Hussen Yang Salim.jpeg",
    alt: "Hussen Yang Salim portrait",
    bio: "Graphic designer. Brand work, print, and visuals for businesses.",
    email: "husseinyangs@gmail.com",
    whatsapp: "https://wa.me/256787322539",
  },
  {
    name: "Ogole Fadil Hussen",
    role: "Full Stack Developer & IT Operations Specialist",
    image: "/images/fadil.jpg",
    alt: "Ogole Fadil Hussen",
    bio: "Full stack and operations. Builds products and looks after the machines they run on.",
    email: "ogolefadilhussen@outlook.com",
    whatsapp: "https://wa.me/256789416409",
  },
];
