export type Project = {
  num: string;
  title: string;
  category: string;
  description: string;
  year: string;
  stack: string;
  status: string;
  href: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "W@V3",
    category: "Cybersecurity / Cryptography",
    description:
      "I built privacy-focused encryption software that embeds encrypted files inside WAV audio containers.",
    year: "2025",
    stack: "Python · AES-256 · WAV steganography · Tkinter",
    status: "Shipped",
    href: "#work",
  },
  {
    num: "02",
    title: "NOCstock",
    category: "Infrastructure / Asset Management",
    description:
      "I built a full-stack network asset inventory platform with barcode intake, vendor API enrichment, role-based access control, and audit logging.",
    year: "2026",
    stack: "Java · Spring Boot · MariaDB · React",
    status: "Shipped",
    href: "#work",
  },
  {
    num: "03",
    title: "Knext",
    category: "Security / Vulnerability Management",
    description:
      "I built an automated network discovery and CVE mapper that ingests Nmap scan output to correlate exposed services against published CVE data.",
    year: "2026",
    stack: "Nmap · CVE correlation · Network topology mapping",
    status: "Shipped",
    href: "#work",
  },
  {
    num: "04",
    title: "Nerd Market",
    category: "Software / Trading Platform",
    description:
      "I'm building a stock-market-style trading platform for collectible cards, tracking price trends and portfolios through live market APIs and a persistent database.",
    year: "2026",
    stack: "Java · REST APIs · Database · Portfolio tracking",
    status: "In progress",
    href: "#work",
  },
  {
    num: "05",
    title: "Cicada",
    category: "IoT / AgTech",
    description:
      "I'm building a LoRa-based farm field manager that tracks soil moisture and fire risk across rural acreage for farmers.",
    year: "2026",
    stack: "LoRa · Soil moisture sensors · Fire detection · Embedded",
    status: "In progress",
    href: "#work",
  },
  {
    num: "06",
    title: "RISC-V Processor",
    category: "Computer Architecture",
    description:
      "I designed a custom processor implementation, exploring instruction execution, datapaths, control logic, registers, and memory.",
    year: "2025",
    stack: "Verilog · RV32I · Single-cycle & pipelined · ModelSim",
    status: "Shipped",
    href: "#work",
  },
];

export type ExperienceRow = {
  year: string;
  org: string;
  role: string;
  body: string;
};

export const experience: ExperienceRow[] = [
  {
    year: "AUG 2026 — PRESENT",
    org: "QCI",
    role: "Infrastructure Engineering Intern — West Des Moines, IA",
    body: "I virtualize servers across VMware and Nutanix, run Cisco IOS and Meraki networking, and manage Azure identity. I administer the PIM policies that gate elevated access, and I write the PowerShell and Microsoft Graph automation that keeps provisioning and identity workflows from being done by hand.",
  },
  {
    year: "MAY 2026 — AUG 2026",
    org: "RSM US LLP",
    role: "IT Infrastructure Consultant, Network Optimization — Des Moines, IA",
    body: "I designed multi-site Layer 2/3 infrastructure — VLAN segmentation, 802.1Q trunking, inter-VLAN routing, subnetting — and built hardened Palo Alto HA firewall clusters with NAT, virtual routers, and GlobalProtect. I caught an active FortiGate SSL VPN credential-spray attack in progress and engineered an automated FortiOS response to ban and release source IPs on authentication events.",
  },
  {
    year: "2023 — SEPT 2026",
    org: "Iowa State University",
    role: "Team Lead, IT Solution Center — Ames, IA",
    body: "I was promoted to Team Lead in 2026. I lead up to 15 technicians across campus network, endpoint, and identity services, and I built an onboarding program that cut new-technician ramp-up from six weeks to two. I also authored the knowledge base documentation the team now runs on.",
  },
  {
    year: "2024 — 2025",
    org: "Cambridge Investment Research",
    role: "IT Infrastructure Engineer, Hyper-Converged Infrastructure — Fairfield, IA",
    body: "I deployed Windows Server 2025 on VMware to support Active Directory, DNS, and file services, and designed a DMZ segment hosting a domain-controller clone for disaster-recovery failover. I wrote the hardening GPOs that became the enterprise endpoint baseline, and kept Exchange at 99.9% availability.",
  },
  {
    year: "2023 — PRESENT",
    org: "FIRST Tech Challenge",
    role: "Robotics Mentor — Grundy Center, IA",
    body: "I mentor 30+ students across three competitive robotics teams in mechanical design, Java programming, and engineering documentation.",
  },
];

export type SkillKind =
  | "switch"
  | "firewall"
  | "server"
  | "database"
  | "code"
  | "pc"
  | "security"
  | "cloud"
  | "hardware";

export type SkillNode = {
  id: string;
  label: string;
  kind: SkillKind;
  port: string;
  x: number;
  y: number;
  items: string[];
};

export const skillCore = {
  id: "core",
  label: "Cooper",
  x: 50,
  y: 50,
};

export const skillNodes: SkillNode[] = [
  {
    id: "switches",
    label: "Switches",
    kind: "switch",
    port: "Gi0/1",
    x: 50,
    y: 16,
    items: [
      "Cisco Catalyst switching",
      "Cisco Meraki",
      "VLAN segmentation & 802.1Q trunking",
      "Inter-VLAN routing",
      "OSPF · STP · EtherChannel",
      "SD-WAN edge cutovers",
    ],
  },
  {
    id: "firewalls",
    label: "Firewalls",
    kind: "firewall",
    port: "Gi0/2",
    x: 71.9,
    y: 24,
    items: ["Palo Alto Networks", "FortiGate", "SonicWall", "GlobalProtect VPN", "NAT & ACL policy", "IPS / IDS"],
  },
  {
    id: "servers",
    label: "Servers",
    kind: "server",
    port: "Gi0/3",
    x: 83.5,
    y: 44.1,
    items: [
      "Windows Server 2025",
      "VMware · Nutanix · Hyper-V",
      "Active Directory · DNS · DHCP",
      "Hyper-converged infrastructure",
      "Docker & virtualization",
      "DMZ design & disaster recovery",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    kind: "database",
    port: "Gi0/4",
    x: 79.4,
    y: 67,
    items: [
      "MariaDB",
      "LDAP directory services",
      "Role-based access control",
      "Audit logging",
      "Schema design for asset tracking",
    ],
  },
  {
    id: "code",
    label: "Code",
    kind: "code",
    port: "Gi0/5",
    x: 61.6,
    y: 82,
    items: [
      "Python · Java · C · C++",
      "JavaScript · TypeScript",
      "Spring Boot · REST APIs",
      "Concurrency & distributed systems",
      "Git · GitHub · GitLab · Linux CLI",
    ],
  },
  {
    id: "endpoints",
    label: "PCs",
    kind: "pc",
    port: "Gi0/6",
    x: 38.4,
    y: 82,
    items: [
      "Windows & Linux administration",
      "Group Policy hardening",
      "RADIUS · MFA",
      "Endpoint security baselines",
      "Self-hosting & storage",
    ],
  },
  {
    id: "security",
    label: "Security",
    kind: "security",
    port: "Gi0/7",
    x: 20.6,
    y: 67,
    items: [
      "Encryption · TLS",
      "Secure architecture & privacy engineering",
      "Nmap · Wireshark",
      "Penetration testing",
      "Vulnerability assessment",
      "Incident response",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Identity",
    kind: "cloud",
    port: "Gi0/8",
    x: 16.5,
    y: 44.1,
    items: ["Azure identity", "PIM elevated-access policies", "Microsoft Graph automation", "PowerShell automation"],
  },
  {
    id: "hardware",
    label: "Hardware",
    kind: "hardware",
    port: "Gi0/9",
    x: 28.1,
    y: 24,
    items: ["RISC-V · computer architecture", "Raspberry Pi", "Embedded systems", "LoRa"],
  },
];

export const contactLinks = [
  { label: "Email", value: "cjhoy@iastate.edu ↗", href: "mailto:cjhoy@iastate.edu" },
  { label: "GitHub", value: "34coopatroopa ↗", href: "https://github.com/34coopatroopa" },
  { label: "Résumé", value: "Download PDF ↗", href: "/uploads/Cooper_Hoy_Resume.pdf" },
];

export const photos = {
  ridgelines: "/photos/ridgelines.jpg",
  overcast: "/photos/overcast.jpg",
  bunion: "/photos/bunion.jpg",
  ridgeNight: "/photos/ridge-night.jpg",
} as const;

export const photoPool = [photos.ridgelines, photos.overcast, photos.bunion, photos.ridgeNight];
