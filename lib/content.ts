export type Project = {
  num: string;
  title: string;
  category: string;
  description: string;
  year: string;
  stack: string;
  status: string;
  overview: string;
  role: string;
  skills: string[];
  resources: string[];
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
    overview:
      "W@V3 encrypts a file with AES-256 and hides the ciphertext inside an ordinary WAV audio file, so the protected data travels as something that looks and plays like normal audio. A Tkinter desktop interface handles the encrypt-and-embed and extract-and-decrypt workflows.",
    role: "Sole developer: I designed the embedding format, implemented the encryption and audio handling, and built the desktop interface.",
    skills: [
      "Applied symmetric cryptography (AES-256, key derivation, IV handling)",
      "Binary file formats and the WAV/RIFF container structure",
      "Steganography trade-offs between capacity and detectability",
      "Desktop GUI design with Tkinter",
    ],
    resources: [
      "Python standard library (wave, struct) and a Python cryptography library",
      "RIFF/WAV format specification",
      "NIST guidance on AES modes of operation",
    ],
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
    overview:
      "NOCstock tracks network equipment from receiving dock to rack. Technicians scan a barcode to intake a device, the backend enriches it with vendor data (model, warranty, lifecycle), and every change is recorded in an audit log. Role-based access control separates who can view, edit, and retire assets.",
    role: "Sole developer: I designed the database schema and the Spring Boot REST API, built the React front end, and implemented authentication, RBAC, and audit logging.",
    skills: [
      "Full-stack architecture with Spring Boot and React",
      "Relational schema design in MariaDB",
      "Integrating third-party vendor APIs",
      "Access control and audit trails as security requirements",
    ],
    resources: [
      "Spring Boot and Spring Security documentation",
      "MariaDB documentation",
      "React documentation",
      "Vendor product/warranty APIs",
    ],
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
    overview:
      "Knext takes the results of an Nmap scan, builds a topology map of the hosts it found, and matches each exposed service and version against published CVE data, so a defender can see which machines are exposed and how badly in one view instead of reading raw scan output.",
    role: "Sole developer: I wrote the scan parser, the CVE correlation logic, and the topology visualization.",
    skills: [
      "Network reconnaissance and service fingerprinting with Nmap",
      "Vulnerability assessment and CVE/CPE matching",
      "Parsing structured tool output (Nmap XML)",
      "Presenting security data so it is actionable",
    ],
    resources: [
      "Nmap reference guide and XML output format",
      "NIST National Vulnerability Database (NVD) CVE data",
      "Security coursework on penetration testing",
    ],
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
    overview:
      "Nerd Market treats collectible cards like equities: it pulls live market prices, stores price history, charts trends, and lets a user track a portfolio's value over time.",
    role: "Sole developer: I own the data model, market API integration, and portfolio logic.",
    skills: [
      "REST API consumption, rate limits, and caching",
      "Time-series data storage and modeling",
      "Designing a domain model for portfolios and transactions",
    ],
    resources: ["Public card-market pricing APIs", "Java and database documentation"],
  },
  {
    num: "05",
    title: "RISC-V Processor",
    category: "Computer Architecture",
    description:
      "I designed a custom processor implementation, exploring instruction execution, datapaths, control logic, registers, and memory.",
    year: "2025",
    stack: "Verilog · RV32I · Single-cycle & pipelined · ModelSim",
    status: "Shipped",
    overview:
      "A processor implementing the RV32I instruction set, built first as a single-cycle design and then as a five-stage pipeline with hazard detection and forwarding, verified in ModelSim against test programs.",
    role: "Computer Organization coursework: I designed and debugged the datapath and control logic, first as a single-cycle design and then as a five-stage pipeline.",
    skills: [
      "Hardware description in Verilog",
      "Datapath and control design",
      "Pipelining, data/control hazards, and forwarding",
      "Planning before building: skipping design work only moves the time into debugging",
    ],
    resources: [
      "RISC-V ISA specification (RV32I)",
      "Patterson & Hennessy, Computer Organization and Design (RISC-V edition)",
      "ModelSim simulator",
    ],
  },
];

export const seniorDesign = {
  title: "Cicada",
  subtitle: "Wildfire detection mesh — ECpE Senior Design (491/492)",
  year: "2026 — 2027",
  description:
    "Cicada is a mesh of solar-powered sensor nodes that measure fire-related conditions (air moisture, wind, temperature, pressure, and particulates) across rural acreage and report them over LoRa to a base station. The base station feeds a live dashboard showing node locations, readings, and threshold alerts, so first responders and landowners can see where a fire is starting and how conditions are moving. The first-semester deliverable is one node, a base station, and a live dashboard working end to end with real sensor data.",
  role: "I proposed the project and organized the team into hardware, software, and cyber sub-teams with explicit handoffs, starting with a packet format all three teams agree on before anyone writes code. As a Cyber Security Engineering student I work the cyber track: the threat model (spoofed sensor readings, jamming and denial of service), a protocol security review of the packet format, and a shared-key/HMAC authentication design for the nodes.",
  skills: [
    "Scoping a multi-discipline project and managing cross-team dependencies",
    "LoRa radio links, gateway placement, and coverage planning",
    "Threat modeling for low-power IoT (spoofing, jamming, key storage on constrained devices)",
    "Message authentication (HMAC) design within microcontroller memory limits",
    "Designing for reliability when people may depend on the system in an emergency",
  ],
  bigPicture:
    "Satellites miss small fires and ground crews can't watch every field. A cheap, solar-powered ground network that sees conditions change in real time buys first responders time, and time is what decides how big a wildfire gets. Building it secure from the start matters because a sensor network that can be spoofed or jammed is worse than none: people would trust a false all-clear.",
  teamSite: "https://sdmay27-34.sd.ece.iastate.edu/",
  docs: [
    { label: "Team site · sdmay27-34", href: "https://sdmay27-34.sd.ece.iastate.edu/" },
    { label: "Project scope & team plan", href: "/photos/cicada/scope.png" },
    { label: "Coverage plan", href: "/photos/cicada/coverage.jpg" },
  ],
};

export const careerObjective = [
  "I want to be an engineer in cybersecurity, infrastructure, or networking: designing, building, and defending the systems organizations run on. The work I've enjoyed most so far, like hardening firewalls at RSM, catching a live attack, and building disaster-recovery paths at Cambridge, all sits where those three overlap.",
  "Right now that means going deeper on the fundamentals: I'm working toward my CCNA and through the SC-500 series.",
  "The dream is to build and lead a team of engineers, and be the one out front for it, delivering something meaningful.",
];

export type DocItem = {
  kind: "Résumé" | "Reflection" | "Paper";
  title: string;
  summary: string;
  meta?: string[];
  href: string | null;
};

// Papers and the résumé: rendered as small chips whose
// summary pops on hover/focus. href: null renders a "pending" chip.
export const documents: DocItem[] = [
  {
    kind: "Résumé",
    title: "Résumé",
    summary:
      "B.S. Cyber Security Engineering, Iowa State University, expected May 2027 (transferred from Hawkeye Community College, 2023).",
    meta: [
      "CCNA and SC-500 series in progress",
      "Promoted to Team Lead, ISU IT Solution Center (2026)",
      "FIRST Tech Challenge robotics mentor",
    ],
    href: "/uploads/Cooper_Hoy_Resume.pdf",
  },
  {
    kind: "Reflection",
    title: "Cumulative Reflection",
    summary:
      "Changing majors, what my ethics and gen-ed courses taught me about the people behind the technology, three internships, leading the IT Solution Center, and recovering from rough semesters.",
    href: "/docs/cumulative-reflection.pdf",
  },
  {
    kind: "Reflection",
    title: "Gen Ed Reflection",
    summary:
      "How communication, psychology, economics, Russia Today, and leadership courses connect to security problems facing society: AI-powered social engineering, the ransomware economy, and state-sponsored attacks on critical infrastructure.",
    href: "/docs/gen-ed-reflection.pdf",
  },
  {
    kind: "Paper",
    title: "Ethics Paper",
    summary:
      "Cyber Ethical Dilemmas, CYB E 234 (Spring 2025). Government facial recognition through Kantian, utilitarian, and virtue ethics; I argue virtue ethics best guides the engineers who build these systems.",
    href: "/docs/ethics-paper.pdf",
  },

];

export type ExperienceRow = {
  year: string;
  org: string;
  role: string;
  body: string;
  duties?: string[];
  technical?: string[];
  soft?: string[];
};

export const experience: ExperienceRow[] = [
  {
    year: "AUG 2026 — PRESENT",
    org: "QCI",
    role: "Infrastructure Engineering Intern — West Des Moines, IA",
    body: "I virtualize servers across VMware and Nutanix, run Cisco IOS and Meraki networking, and manage Azure identity, including the PIM policies that gate elevated access.",
    duties: [
      "Virtualize and maintain client servers on VMware and Nutanix",
      "Configure Cisco IOS and Meraki networking for client sites",
      "Administer Azure identity and PIM elevated-access policies",
      "Write PowerShell and Microsoft Graph automation for provisioning and identity workflows",
    ],
    technical: ["VMware", "Nutanix", "Cisco IOS", "Meraki", "Azure / Entra ID", "PIM", "PowerShell", "Microsoft Graph"],
    soft: ["Juggling several client environments", "Balancing school with production work"],
  },
  {
    year: "MAY 2026 — AUG 2026",
    org: "RSM US LLP",
    role: "IT Infrastructure Consultant, Network Optimization — Des Moines, IA",
    body: "Multi-site Layer 2/3 design and hardened Palo Alto HA firewalls for clients. I caught an active FortiGate SSL VPN credential-spray attack and automated the response.",
    duties: [
      "Designed multi-site Layer 2/3 infrastructure: VLANs, 802.1Q trunking, inter-VLAN routing, subnetting",
      "Built and hardened Palo Alto HA firewall clusters with NAT, virtual routers, and GlobalProtect",
      "Detected a live credential-spray attack and built a FortiOS automation that bans attackers without locking out real users",
      "Ran SD-WAN edge cutovers and ISP migrations with zero unplanned downtime",
      "Delivered network diagrams, firewall rule audits, and implementation docs to clients",
    ],
    technical: ["Palo Alto", "FortiGate", "GlobalProtect", "Meraki", "SD-WAN", "VLAN / 802.1Q", "Incident response"],
    soft: ["Client communication", "Diagnose before you fix", "Coordinating carriers and client staff"],
  },
  {
    year: "2023 — SEPT 2026",
    org: "Iowa State University",
    role: "Team Lead, IT Solution Center — Ames, IA",
    body: "Promoted to Team Lead in 2026. I lead up to 15 technicians across campus network, endpoint, and identity services, and built an onboarding program that cut ramp-up from six weeks to two.",
  },
  {
    year: "2024 — 2025",
    org: "Cambridge Investment Research",
    role: "IT Infrastructure Engineer, Hyper-Converged Infrastructure — Fairfield, IA",
    body: "Windows Server 2025 on VMware, a DMZ domain-controller clone for disaster recovery, and the hardening GPOs that became the enterprise endpoint baseline.",
    duties: [
      "Deployed Windows Server 2025 on VMware for Active Directory, DNS, and file services",
      "Designed a DMZ segment hosting a domain-controller clone for disaster-recovery failover",
      "Wrote hardening GPOs that became the enterprise endpoint security baseline",
      "Maintained 99.9% Exchange availability and led root cause analysis on outages",
    ],
    technical: ["Windows Server", "Active Directory", "DNS", "VMware", "HCI", "Group Policy", "Exchange"],
    soft: ["Root cause analysis & write-ups", "Working within change control"],
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
  { label: "Phone", value: "319-240-3504", href: "tel:+13192403504" },
  { label: "GitHub", value: "34coopatroopa ↗", href: "https://github.com/34coopatroopa" },
];

export const photos = {
  ridgelines: "/photos/ridgelines.jpg",
  overcast: "/photos/overcast.jpg",
  bunion: "/photos/bunion.jpg",
  ridgeNight: "/photos/ridge-night.jpg",
} as const;

export const photoPool = [photos.ridgelines, photos.overcast, photos.bunion, photos.ridgeNight];
