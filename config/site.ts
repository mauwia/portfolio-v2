export const siteConfig = {
  name: "Muhammad Mavia",
  title: "Hi, I'm Mavia.",
  description: "i build backend systems for products that move money.",
  resume: {
    label: "Resume",
    url: "/Muhammad_Mavia_CV.pdf",
  },
  skills: [
    // { name: "frontend", url: "#" },
    { name: "backend", url: "#" },
    { name: "ai", url: "#" },
    { name: "crypto", url: "#" },
    { name: "security", url: "#" },
  ],
  experience: [
    {
      title: "github octern",
      url: "https://github.com",
      isActive: false,
    },
    {
      title: "appwrite",
      url: "https://appwrite.io",
      position: "devrel",
      isActive: false,
    },
    {
      title: "encode bootcamp",
      url: "https://www.encode.club",
      position: "vibed with devs",
      isActive: false,
    },
  ],
  specialties: [
    "complex protocols architecture & design.",
    "and making apps/protocols look like someone cared.",
  ],
  hobbies: [
    {
      text: "cricket",
      url: "#",
    },
  ],
  musicRecommendations: [
    {
      title: "you and i",
      artist: "naryquokka",
      url: "#",
    },
    {
      title: "blue",
      artist: "yong kai",
      url: "#",
    },
  ],
  socialLinks: [
    {
      name: "X",
      url: "https://x.com/maviadoteth_",
    },
    {
      name: "GitHub",
      url: "https://github.com/mauwia",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-mavia-bba2811b6",
    },
    {
      name: "Blog",
      url: "https://medium.com/@mauwia.atif",
    },
  ],
  projects: [
    {
      name: "shiftleft-arc",
      description:
        "Security architecture review as code. Describe a system in YAML and get a STRIDE threat model, risk scores on a likelihood/impact matrix, a security concept report and a CI/CD policy gate.",
      longDescription: [
        "26 architecture control checks, each mapped to CWE and the OWASP Top 10.",
        "Formal risk acceptance with a named approver and an expiry date, after which the finding is enforced again.",
        "Python, one runtime dependency, 157 tests.",
      ],
      url: "https://github.com/mauwia/shiftleft-arc",
      icon: "S",
      color: "",
    },
    {
      name: "Jaint",
      description:
        "Static taint analyzer for Java bytecode. Finds SQL injection, command injection and path traversal directly in a .jar through Soot dataflow analysis.",
      longDescription: [
        "Forward taint analysis over Soot's Jimple IR with fixed-point convergence on control-flow graphs.",
        "Runs as a Spring Boot REST API or a CLI, with JSON and SARIF output.",
      ],
      url: "https://github.com/mauwia/Jaint",
      icon: "J",
      color: "",
    },
    {
      name: "harmonia-iam",
      description:
        "Multi-tenant OAuth2/OIDC platform: one identity service issuing tenant-scoped JWTs, and a resource server on top of it.",
      longDescription: [
        "Kotlin, Spring Boot 3 and Spring Authorization Server, with PostgreSQL, Flyway and Testcontainers.",
        "Every request is scoped to the tenant in the validated token; a missing tenant claim is refused.",
      ],
      url: "https://github.com/mauwia/harmonia-iam",
      icon: "H",
      color: "",
    },
    {
      name: "SolarCraft AI",
      description:
        "Planning tool for solar PV and heat-pump installers, from a customer address to a priced proposal in one workflow.",
      longDescription: [
        "Satellite roof scanner, 12-month yield simulation and an automated bill-of-materials and quote builder.",
        "AI copilot for German feed-in tariffs, VAT rules and 25-year ROI.",
      ],
      url: "https://github.com/mauwia/solarcraft-ai",
      icon: "☀",
      color: "",
    },
    {
      name: "Cooking-Ai-Journal",
      description:
        "An AI-powered crypto trading terminal integrated with Hyperliquid that provides smart pre-trade and post-trade analysis. Built for traders who want actionable market insights alongside fast, seamless trade execution.",
      longDescription: [
        "Engineered core data ingestion pipelines tracking perpetual market data from dYdX and HyperLiquid APIs for AI training models.",
        "Optimized database queries to efficiently calculate trader net positions and historical PnL.",
        "Expanded API endpoints to dynamically support multi-coin queries and complex date window filtering.",
      ],
      url: "https://cooking.gg/",
      icon: "cooking.jpg",
      color: "",
    },
    {
      name: "Tars",
      description:
        "A Solana-based platform for deploying and monetizing AI agents, built on industry-standard and proprietary frameworks for scalability and performance.",
      longDescription: [
        "Built an autonomous AI agent that deploys and manages tokens on pump.fun with minimal human intervention.",
        "Integrated Discord and Twitter automation to handle community building, engagement, and moderation at scale.",
        "Deployed the agent on Tars AI Market, combining on-chain token operations with social media management into a single workflow.",
      ],
      url: "https://tars.pro/",
      icon: "tars.svg",
      color: "",
    },
    {
      name: "Coin Terminal",
      description:
        "Coin Terminal is a leading crypto launchpad with a 15.95% average ROI, connecting over 0.5M investors to innovative projects.",
      longDescription: [
        `Design and create architecture and database to handle high-volume user transactions during investment periods.`,
        `Integrate Merkle root to determine the winner of the IDO.`,
        "Implement Redis caching to efficiently provide user IDO data.",
      ],
      // technologies: ["React", "TypeScript", "CSS Modules", "Storybook"],
      // status: "Active Development",
      // timeline: "2023 - 2024",
      url: "https://www.cointerminal.com/app",
      icon: "cointerminal.jpg",
      color: "blue",
      // featured: true,
    },
    {
      name: "Spaace Marketplace",
      description:
        "The #1 Gamified NFT Marketplace and aggregator with 100% revenue sharing in ETH for the community. Focused on immersive gamification and rewards, Spaace boasts a unique, community-centric NFT trading experience where traders become players.",
      longDescription: [
        "Convert Google Pub/Sub service to RabbitMQ for better performance.",
        "Use Reservoir Sync Node to sync data between the reservoir and the database.",
        "Implement Quest System for users to earn rewards by completing tasks.",
      ],
      // technologies: ["Next.js", "IndexedDB", "TailwindCSS", "marked"],
      status: "Completed",
      // timeline: "2024 - 2024",
      url: "http://spaace.io/",
      icon: "spaace.jpg",
      // color: "gray",
      // featured: true,
    },
    {
      name: "Stashed Wallet",
      description:
        "The next-gen wallet takes crypto management to the next level. It integrates cutting-edge features like multi-chain support, Account Abstraction (ERC-4337), MultiChain Gas Abstraction, advanced analytics, and an NFT marketplace, all wrapped in a user-friendly interface",
      longDescription: [
        "Integrate Account Abstraction (ERC-4337)",
        "Implement MultiChain Gas Abstraction",
        "Integrate NFT Aggregator for Comprehensive NFT Discovery",
        "Build SDK for Seamless Platform Integration",
      ],
      // technologies: ["TypeScript", "VS Code API", "Canvas API", "WebGL"],
      // status: "Maintenance",
      // timeline: "2022 - Present",
      url: "#",
      icon: "stashed.jpeg",
      color: "green",
      // featured: false,
    },
    {
      name: "Artfi",
      description:
        "Artfi is a decentralized marketplace for fractional artwork purchases. It allows users to buy and sell fractional shares of artwork, enabling art enthusiasts to invest in high-value art pieces. Users can purchase shares of artwork using cryptocurrency and receive dividends based on the value of the artwork.",
      longDescription: [
        "Develop Marketplace Server for Fractional Artwork Purchases",
        "Integrate Paper Wallet Functionality for Web2 User Experience with Social Logins",
        "Integrate AWS Media Converter SDK for Video Streaming Conversion",
      ],
      // technologies: ["TypeScript", "VS Code API", "Canvas API", "WebGL"],
      // status: "Maintenance",
      // timeline: "2023 - 2023",
      url: "https://artfi.world",
      icon: "artfi.jpg",
      color: "green",
      // featured: false,
    },
  ],
  work: [
    {
      company: "Drox",
      position: "Backend & AI Engineer",
      duration: "January 2024 - Present",
      description: [
        "Build perpetuals trading data for dYdX v4 and HyperLiquid: ingestion of trades, fills, funding and candles, position reconstruction and per-user PnL.",
        "Wrote the WebSocket gateway that streams long-running AI trader-profile jobs to the client as progress events.",
        "Own the LLM layer of a market-intelligence product: Claude as primary model, GPT-4o as fallback, a circuit breaker per provider and versioned prompts.",
        "Implemented multi-chain account abstraction in the wallet server, so users can transact without holding gas on every chain.",
        "Created a custom indexer for EVM blockchains.",
      ],
      url: "https://www.droxlabs.com/",
    },
    {
      company: "Auto Compound (Contract)",
      position: "Web3 & AI Engineer",
      duration: "June 2025 - August 2025",
      description: [
        "Wrote the investment plugin that lets an elizaOS-based AI agent zap in and out of liquidity positions from a plain-language request.",
        "Added QuickSwap and subgraph plugins, plus the principal and APR maths across Polygon and BNB Chain pools.",
      ],
      url: "#",
    },
    {
      company: "Artfi",
      position: "Backend Engineer",
      duration: "May 2023 - November 2023",
      description: [
        "Worked on-site with the client in Dubai and designed the server infrastructure from scratch.",
        "Collaborated with other team members to design and implement new features.",
        "Refine existing programs and develop new web tools.",
        "Developed a high-performance, user-friendly application.",
        "Engaged in pair programming sessions to optimize code and enhance team collaboration.",
      ],
      url: "https://www.artinals.com/",
    },
    {
      company: "BlockApex (Part-time)",
      position: "Backend Engineer",
      duration: "May 2023 - December 2023",
      description: [
        "Worked on a decentralized exchange, implementing partial and full order matching with a price-time priority algorithm.",
      ],
      url: "https://blockapex.io/",
    },
    {
      company: "Xord",
      position: "Full Stack Engineer → Team Lead",
      duration: "October 2020 - April 2023",
      description: [
        "Promoted twice, ending as lead of a team of five engineers.",
        "Architected the backend for the Coin Terminal launchpad (0.5M+ registered investors), using Merkle-root allowlists and Redis caching for sale-opening traffic.",
        "Excel in implementing high-quality solutions across diverse projects, including NFTs, staking, Web3 Wallets, flash loans, bridges, and crypto lending/borrowing platforms.",
        "Gained experience working with several well-known blockchains, which include EVM, Solana, Near, and Concordium.",
        "Spans a wide tech stack, including JS, TS, Go, Rust, Java, and Solidity. I have worked with various frameworks like Nest.js, React.js, Spring Boot, Node.js, and Anchor.rs.",
        "Strong computer science fundamentals in system design, data structures and algorithms.",
        "Worked on an Ethereum Layer 2 mobile wallet and integrated zkSync.",
        "Worked on Food Delivery Mobile App which use binance smart chain and other payment delivery methods with MongoDB geospatial indexing.",
        "Experience working with various databases, including SQL, PostgreSQL, MongoDB (Mongoose) and Pinata.",
        "Experience with writing and maintaining unit tests with Jest, Enzyme, and Hardhat using TDD.",
      ],
      url: "https://xord.com/",
    },
  ],
  newsletter: {
    title: "Want to stay updated?",
    description:
      "Subscribe to my newsletter for the latest updates on my projects and thoughts.",
    buttonText: "Subscribe",
  },
};
