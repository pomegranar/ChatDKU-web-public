export type CoreMember = {
  name: string;
  classYear: string;
  team?: string;
  avatar?: string;
  role?: string;
  link?: string;
  showContribution?: boolean;
};


export const members: CoreMember[] = [
  {
    name: "Bing Luo",
    classYear: "PhD",
    team: "Project Advisor",
    avatar: "/avatars/Bing.jpg",
    link: "https://luobing1008.github.io/",
    showContribution: false,
  },
  {
    name: "Mingxi Li",
    classYear: "Research Assistant",
    team: "Project Leader",
    avatar: "/avatars/Mingxi.jpg",
    showContribution: false,
  },
  {
    name: "Temuulen Enkhtamir",
    classYear: "Class of 2027",
    team: "Product Manager · Evaluation Team Member / Databases Team Member / Agent Team Member",
    avatar: "/avatars/Temuulen.jpg",
    role: `- Developed core agent logic and algorithms.
                - Scaled and optimized the database.
                - Updated and enhanced the document ingestion pipeline.
                - Integrated a tool-calling mechanism into the agent system.
                `,
  },
  {
    name: "Anar Nyambayar",
    classYear: "Class of 2027",
    team: "Core Dev · Frontend Team Captian / Databases Team member / Agent Team Member",
    avatar: "/avatars/Anar.jpg",
    link: "https://www.anar-n.com",
    role: `- Lead engineer for the Next.JS web frontend, responsible for interface design and continuous integration.
                - Designed the SQL agent and the accompanying PostgreSQL database schema.
                - Developed a locally-run document ingestion solution for extracting structured information.
                `,
  },
  {
    name: "Munish Lohani",
    classYear: "Class of 2028",
    team: "Core Dev · Backend Team Captian / Evaluation Team Captian / Agent Team Member",
    avatar: "/avatars/Munish.jpg",
    role: `- Managed backend deployment, including the transition from Flask backend to Django with NetID-based authentication, unified PostgreSQL database and implemented task automation using Celery.
                - Developed and integrated speech-to-text functionality for frontend and backend.
                - Working on evaluation.
                `,
  },
  {
    name: "Zhiwei Li",
    classYear: "Class of 2028",
    team: "Core Dev · Databases Team Captain / Agent Team Member",
    avatar: "/avatars/Zhiwei.jpg",
    role: `- Implemented database monitoring and performance diagnostics to ensure system stability and enable iterative optimization.
                - Optimized data ingestion, filtering, and storage pipelines to improve reliability and stability of the ChatDKU database.
                - Enhanced agent intelligence by investigating and integrating new features and retrieval mechanisms.
                `,
  },
  {
    name: "Ruihan Yin",
    classYear: "Class of 2028",
    team: "Frontend / Agent Team Member",
    avatar: "/avatars/RuihanYin.jpg",
    showContribution: false,
  },
  {
    name: "Zeyu Yu",
    classYear: "Class of 2028",
    team: "Backend Team Member",
    avatar: "/avatars/Zeyu.jpg",
    showContribution: false,
  },
  {
    name: "Kurtis Kwan",
    classYear: "Class of 2027",
    team: "Agent Team Member",
    avatar: "/avatars/kurtis.jpeg",
    showContribution: false,
  },
  {
    name: "Binderiya Enkhtuvshin",
    classYear: "Class of 2028",
    team: "",
    showContribution: false,
  },
  {
    name: "Elina",
    classYear: "Class of 2028",
    team: "",
    showContribution: false,
  },
];

export const alumni: CoreMember[] = [
  {
    name: "Sean Allen Siegfreid R. Bugarin",
    classYear: "Class of 2026",
    avatar: "/avatars/Sean.jpg",
  },
  {
    name: "Yuxiang Lin",
    classYear: "Class of 2026",
    avatar: "/avatars/Yuxiang.jpeg",
  },
  {
    name: "Chenshuhao(Cody)Qin",
    classYear: "Class of 2025",
    avatar: "/avatars/Chenshuhao.jpg",
  },
  {
    name: "Ningyuan Yang",
    classYear: "Class of 2026",
    avatar: "/avatars/Ningyuan.jpg",
  },
];
