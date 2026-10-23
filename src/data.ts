export const profile = {
  name: "Phi Nguyen",
  fullName: "Nguyen Dinh Phi",
  title: "Senior DevOps & Platform Engineer",
  email: "fizz.uet@gmail.com",
  github: "https://github.com/wisphill",
  linkedin: "https://www.linkedin.com/in/wisphill",
  cv: "/Phi-Nguyen-CV.pdf",
};

export const experience = [
  {
    company: "Independent",
    role: "Freelance Engineer",
    period: "JUL 2026 — PRESENT",
    chapter: "III",
    description:
      "Bringing a multiplayer world to life. Building infrastructure and gameplay for a 3D Unity game, from cloud services to character movement.",
    tags: ["Unity & C#", "Kubernetes", "Golang"],
  },
  {
    company: "Collaboration Better The World",
    role: "Senior Platform Engineer",
    period: "JUL 2024 — JUN 2026",
    chapter: "II",
    description:
      "A hybrid role spanning cloud infrastructure and Golang backend development. Collaborated with Deputy in Australia to improve developer workflows and build dependable enterprise platforms.",
    tags: ["AWS", "Developer experience", "Golang"],
  },
  {
    company: "Sotatek JSC",
    role: "Senior DevOps Engineer / Team Lead",
    period: "SEP 2017 — JUL 2024",
    chapter: "I",
    description:
      "Grew from a graduate engineer into a senior engineer and team lead. Delivered systems across fintech, blockchain, and cloud platforms for clients in Singapore, Malaysia, and Australia.",
    tags: [
      "Platform engineering",
      "Technical leadership",
      "Cloud architecture",
    ],
  },
];

export type ProjectCategory =
  "Platform" | "Fintech" | "Games" | "Blockchain" | "Software";
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  category: ProjectCategory;
  icon: "orbit" | "diamond" | "world" | "leaf" | "hex" | "star" | "grid";
  summary: string;
  responsibilities: string[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    id: "deputy",
    title: "Deputy",
    subtitle: "THE CONNECTED PLATFORM",
    period: "JUL 2024 — JAN 2026",
    role: "Senior Platform Engineer · CBTW × Deputy",
    category: "Platform",
    icon: "orbit",
    summary:
      "The infrastructure and developer tooling behind cloud-based workforce management.",
    responsibilities: [
      "Developed and maintained utility tools that streamlined daily developer workflows, with technical guidance for their use.",
      "Migrated bastion host scripts to a microservice architecture.",
      "Architected an event-driven migration of existing workflows to AWS MSK.",
      "Built a production data sandbox from scratch for vendor testing and development.",
      "Collaborated with engineering leaders on feature delivery, production incidents, and networking issues.",
    ],
    technologies: [
      "AWS",
      "Golang",
      "MSK",
      "ECS",
      "EC2",
      "MySQL",
      "Datadog",
      "Jenkins",
    ],
  },
  {
    id: "petronas",
    title: "PETRONAS eWallet",
    subtitle: "THE TRUSTED EXCHANGE",
    period: "JAN 2020 — JUL 2024",
    role: "Team Lead / Senior Platform Engineer · Sotatek × Setel",
    category: "Fintech",
    icon: "diamond",
    summary:
      "Secure payment services, resilient microservices, and the team that brought them together.",
    responsibilities: [
      "Partnered with the SRE team to maintain the performance and reliability of production wallet services.",
      "Led and mentored a cross-functional team against technical and business goals.",
      "Reviewed and improved service security, compliance, and performance bottlenecks.",
      "Orchestrated and scaled microservices with Kubernetes.",
      "Designed core wallet, payments, and on-street parking microservices and SDKs.",
      "Implemented admin portal features with ReactJS and AngularJS.",
    ],
    technologies: [
      "Kubernetes",
      "NestJS",
      "ArgoCD",
      "Kafka",
      "MongoDB",
      "Redis",
      "Grafana",
      "Loki",
      "New Relic",
      "RabbitMQ",
    ],
  },
  {
    id: "farmville",
    title: "Farmville",
    subtitle: "THE LIVING WORLD",
    period: "FEB 2026 — PRESENT",
    role: "Senior Platform Engineer",
    category: "Games",
    icon: "world",
    summary:
      "From a Kubernetes foundation to a shared world of farms, cities, and multiplayer gameplay.",
    responsibilities: [
      "Designed and implemented social and reward microservices for player interactions and progression.",
      "Built and configured a Kubernetes cluster from scratch for game services.",
      "Implemented observability for service health, performance, and operational reliability.",
      "Designed CI/CD pipelines for microservice build, test, and deployment workflows.",
      "Contributed to multiplayer networking, player camera handling, and character movement.",
      "Contributed to player base models and farm map assets.",
    ],
    technologies: ["Unity", "C#", "Golang", "gRPC", "Kubernetes", "Blender"],
  },
  {
    id: "carbon",
    title: "Carbon Offset",
    subtitle: "THE BALANCED SYSTEM",
    period: "MAY 2022 — NOV 2023",
    role: "Senior DevOps Engineer · Sotatek",
    category: "Platform",
    icon: "leaf",
    summary:
      "Multi-tenant cloud infrastructure for tracking and mitigating industrial carbon emissions.",
    responsibilities: [
      "Evaluated technical approaches and costs, and designed scalable multi-tenant infrastructure.",
      "Maintained AWS ECS infrastructure and migrated domains and load balancer routing.",
      "Established monitoring and alerting and served as the primary on-call engineer.",
      "Managed releases and analyzed architecture to reduce operational overhead and cloud expenditure.",
      "Provided technical guidance to associate developers and DevOps engineers.",
    ],
    technologies: [
      "AWS",
      "Terraform",
      "Bash",
      "Python",
      "Buildkite",
      "Kafka",
      "NodeJS",
      "Clojure",
    ],
  },
  {
    id: "isola",
    title: "ISOLA DEX",
    subtitle: "THE DECENTRALIZED REALM",
    period: "JAN 2021 — JUN 2021",
    role: "Team Lead / Senior DevOps Engineer · Sotatek",
    category: "Blockchain",
    icon: "hex",
    summary:
      "A decentralized exchange built on Solana, from smart contracts to automated delivery.",
    responsibilities: [
      "Led a technical team building and deploying a DEX for a UK-based client.",
      "Architected CI/CD pipelines with GitHub Actions.",
      "Engineered core smart contracts in Rust on Solana.",
      "Built administrative and user-facing features with ReactJS and NextJS.",
    ],
    technologies: [
      "Rust",
      "Solana",
      "GitHub Actions",
      "AWS EC2",
      "NodeJS",
      "NextJS",
      "Bash",
    ],
  },
  {
    id: "bunicorn",
    title: "Bunicorn",
    subtitle: "THE ORCHESTRATED WORLD",
    period: "DEC 2020 — MAR 2021",
    role: "DevOps Engineer · Sotatek",
    category: "Games",
    icon: "star",
    summary:
      "The AWS foundation and GitOps delivery system for a blockchain gaming platform.",
    responsibilities: [
      "Architected and deployed Amazon EKS across development, staging, and production.",
      "Established continuous integration with CircleCI and GitOps deployment with ArgoCD.",
      "Provisioned AWS resources through Terraform, including auto scaling, load balancers, and Route 53.",
      "Monitored, maintained, and optimized system performance and availability.",
    ],
    technologies: [
      "AWS EKS",
      "Terraform",
      "ArgoCD",
      "CircleCI",
      "NodeJS",
      "Bash",
    ],
  },
  {
    id: "jira",
    title: "Jira Gantt Plugin",
    subtitle: "THE ORDERED TIMELINE",
    period: "MAY 2019 — DEC 2020",
    role: "DevOps Engineer · Sotatek",
    category: "Software",
    icon: "grid",
    summary:
      "A serverless backend and custom Gantt experience built for the Jira ecosystem.",
    responsibilities: [
      "Designed a serverless backend with AWS Lambda, DynamoDB, and API Gateway using the Serverless Framework.",
      "Developed Gantt chart functionality within Jira using Java.",
      "Improved the interface and features with ExtJS and JavaScript.",
    ],
    technologies: [
      "AWS Lambda",
      "DynamoDB",
      "API Gateway",
      "Java",
      "ExtJS",
      "JavaScript",
      "Grunt",
    ],
  },
];

export const skillGroups = [
  {
    title: "Cloud & infrastructure",
    symbol: "01",
    icon: "orbit" as const,
    description: "Foundations built to endure.",
    skills: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Containerization",
      "Linux / SysOps",
    ],
  },
  {
    title: "Delivery & observability",
    symbol: "02",
    icon: "diamond" as const,
    description: "Clarity in every moving part.",
    skills: [
      "ArgoCD / GitOps",
      "GitHub Actions",
      "Jenkins",
      "CircleCI",
      "Buildkite",
      "Grafana / Loki",
      "Datadog",
    ],
  },
  {
    title: "Languages & systems",
    symbol: "03",
    icon: "hex" as const,
    description: "The craft beneath the surface.",
    skills: [
      "Golang",
      "Rust",
      "Python",
      "TypeScript / NodeJS",
      "Java",
      "C#",
      "Bash",
      "Kafka",
      "gRPC",
    ],
  },
];
