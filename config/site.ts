export const siteConfig = {
  name: "Muhammad Mavia",
  title: "hi, i'm Mavia.",
  description: "i build things on the internet.",
  resume: {
    label: "Resume",
    url: "https://github.com/user-attachments/files/20147103/Mohammad-Mavia-CV.pdf",
  },
  skills: [
    // { name: "frontend", url: "#" },
    { name: "backend", url: "#" },
    { name: "ai", url: "#" },
    { name: "crypto", url: "#" },
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
      name: "Coin Terminal",
      description:
        "Coin Terminal is a leading crypto launchpad with a 15.95% average ROI, connecting over 0.5M investors to innovative projects",
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
        "The #1 Gamified NFT Marketplace and aggregator with 100% revenue sharing in ETH for the community.Focused on immersive gamification and rewards, Spaace boasts a unique, community-centric NFT trading experience where traders become players.",
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
      position: "Backend Engineer",
      duration: "2024 - Present",
      description: [
        "Excelled in delivering high-quality solutions on Launchpad, serving almost 500k users.",
        "Implemented MultiChain Account Abstraction in the wallet server.",
        "Try to introduce LLMs Model to Blockchain world",
        "Created a custom indexer for evm blockchains",
      ],
      url: "https://www.droxlabs.com/",
    },
    {
      company: "Artfi",
      position: "Backend Engineer",
      duration: "2023 - 2023",
      description: [
        "Designed and architected server infrastructure.",
        "Collaborated with other team members to design and implement new features.",
        "Refine existing programs and develop new web tools.",
        "Developed high-performance, user-friendly application",
        "Engaged in pair programming sessions to optimize code and enhance team collaboration",
      ],
      url: "https://www.artinals.com/",
    },
    {
      company: "BlockApex (Part-time)",
      position: "Backend Engineer",
      duration: "2023 - 2023",
      description: [
        "Worked on Decentralized Exchange Implementing partial and full using price-time priority algorithm",
      ],
      url: "https://blockapex.io/",
    },
    {
      company: "Xord",
      position: "Full Stack Engineer",
      duration: "2020 - 2023",
      description: [
        "Excel in implementing high-quality solutions across diverse projects, including NFTs, staking, Web3 Wallets, flash loans, bridges, and crypto lending/borrowing platforms.",
        "Gained experience working with several well-known blockchains, which include EVM, Solana, Near, and Concordium.",
        "Spans a wide tech stack, including JS, TS, Go, Rust, Java, and Solidity. I have worked with various frameworks like Nest.js, React.js, Spring Boot, Node.js, and Anchor.rs.",
        "Strong computer science fundamentals in system design, data structures, algorithms.",
        "Worked on Ethereum Mobile Wallet on Layer 2 and integrated zksync, a Layer 2 solution",
        "Worked on Food Delivery Mobile App which use binance smart chain and other payment delivery methods with MongoDB geospatial indexingu",
        "Experience working with various databases, including SQL, Postgre, Mongoose, and Pinata.",
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
