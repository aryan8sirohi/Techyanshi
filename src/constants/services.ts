import type { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'data-analytics',
    name: 'Data Analytics',
    icon: 'BarChart3',
    shortDesc: 'Clean, analyze, and visualize data to uncover hidden patterns and opportunities.',
    longDesc:
      'Transform raw, unstructured data into clear, actionable intelligence. We handle everything from data cleaning and exploratory analysis to advanced visualization — helping your team make confident, data-driven decisions every day.',
    features: [
      'Data Cleaning & Exploratory Data Analysis (EDA)',
      'Statistical Analysis & Pattern Recognition',
      'Python, SQL & Excel-based Analytics',
      'Business Insights & Custom Visualization',
      'Automated Reporting Pipelines',
      'Predictive Analytics & Forecasting',
    ],
    benefits: [
      'Make decisions 5x faster with clean, reliable data',
      'Eliminate manual spreadsheet work forever',
      'Uncover hidden revenue opportunities in your data',
      'Reduce operational errors by up to 70%',
      'Get actionable insights in hours, not weeks',
    ],
    technologies: ['Python', 'SQL', 'Excel', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    faq: [
      {
        question: 'What types of data can you work with?',
        answer:
          'We work with all types of structured and unstructured data including CSV files, databases, Excel spreadsheets, APIs, and cloud data sources. If your data exists, we can analyze it.',
      },
      {
        question: 'How long does a typical data analytics project take?',
        answer:
          'A standard analytics engagement takes 2–4 weeks depending on data complexity and scope. We provide weekly progress updates and interim deliverables throughout.',
      },
      {
        question: 'Do you provide ongoing analytics support?',
        answer:
          'Yes. We offer monthly retainer packages for continuous analytics support, including report updates, new analyses, and dashboard maintenance.',
      },
    ],
  },
  {
    id: '2',
    slug: 'dashboard-development',
    name: 'Dashboard Development',
    icon: 'Monitor',
    shortDesc: 'Real-time executive dashboards built in Power BI and Tableau for instant visibility.',
    longDesc:
      'Stop flying blind. Our interactive dashboards give your leadership team real-time visibility into every metric that matters — from sales and revenue to operations and HR. Built on Power BI and Tableau, our dashboards connect directly to your data sources for live, automated updates.',
    features: [
      'Power BI & Tableau Dashboard Design',
      'Real-time Data Connections & Auto-refresh',
      'Sales, Finance, HR & Inventory Dashboards',
      'KPI Tracking & Performance Monitoring',
      'Executive-level Summary Views',
      'Mobile-responsive Dashboard Design',
    ],
    benefits: [
      'Real-time visibility into all business KPIs',
      '40% higher operational efficiency within first year',
      'Eliminate manual reporting completely',
      'Single source of truth for all departments',
      'Board-ready reports generated automatically',
    ],
    technologies: ['Power BI', 'Tableau', 'SQL', 'DAX', 'Python', 'Excel', 'Google Data Studio'],
    faq: [
      {
        question: 'What data sources can your dashboards connect to?',
        answer:
          'Our dashboards connect to 100+ data sources including MySQL, PostgreSQL, Excel, Google Sheets, Salesforce, HubSpot, QuickBooks, and most cloud platforms via API.',
      },
      {
        question: 'Can non-technical users interact with the dashboards?',
        answer:
          'Absolutely. We design all dashboards to be intuitive for non-technical stakeholders. We also provide training sessions so your team can use and customize them independently.',
      },
      {
        question: 'How often do dashboards refresh with new data?',
        answer:
          'Refresh frequency depends on your data source. We can configure dashboards from real-time streaming to hourly, daily, or scheduled refreshes based on your needs.',
      },
    ],
  },
  {
    id: '3',
    slug: 'business-intelligence',
    name: 'Business Intelligence',
    icon: 'Brain',
    shortDesc: 'Strategic BI frameworks that turn operational data into competitive advantage.',
    longDesc:
      'Business Intelligence is more than dashboards. We build comprehensive BI frameworks that align your data strategy with your business goals — creating a unified data infrastructure that drives smarter decisions at every level of your organization.',
    features: [
      'BI Strategy & Roadmap Development',
      'Data Warehouse Architecture',
      'ETL Pipeline Design & Implementation',
      'KPI Framework & Metrics Definition',
      'Competitive Intelligence Analysis',
      'Executive Reporting & Insights Delivery',
    ],
    benefits: [
      'Align every department around the same data truth',
      'Reduce decision latency from days to minutes',
      'Build a lasting competitive data advantage',
      'Scale your analytics as your business grows',
      'ROI-positive within the first quarter',
    ],
    technologies: ['Power BI', 'Tableau', 'SQL', 'Python', 'Azure', 'AWS', 'Google BigQuery', 'dbt'],
    faq: [
      {
        question: 'What is the difference between BI and regular reporting?',
        answer:
          'Traditional reporting looks at what happened. Business Intelligence tells you why it happened and what to do next. BI combines historical data, real-time metrics, and predictive analytics into a strategic decision-support system.',
      },
      {
        question: 'Our company has data in many different systems. Can you help?',
        answer:
          'Yes. Data integration is a core BI competency. We build ETL pipelines that collect data from all your systems — CRM, ERP, marketing platforms, operations tools — into a unified data warehouse.',
      },
      {
        question: 'How do you measure BI project success?',
        answer:
          'We define success metrics upfront with every client. Common KPIs include decision time reduction, report automation rate, user adoption, and measurable business outcomes like revenue growth or cost reduction.',
      },
    ],
  },
  {
    id: '4',
    slug: 'web-development',
    name: 'Web Development',
    icon: 'Code2',
    shortDesc: 'High-performance, SEO-ready websites and full-stack applications built to scale.',
    longDesc:
      'Your website is your most powerful sales tool. We build fast, beautiful, conversion-optimized websites and full-stack applications using modern technologies. From simple business sites to complex MERN stack applications, we deliver digital products that perform.',
    features: [
      'Business & Portfolio Websites',
      'Landing Pages with High Conversion Design',
      'Full-stack MERN Applications',
      'Responsive & Mobile-first Design',
      'API Integration & Third-party Services',
      'SEO Optimization & Core Web Vitals',
      'Fast Performance & Page Speed Optimization',
    ],
    benefits: [
      'Professional online presence that converts visitors',
      'Google-friendly SEO architecture from day one',
      'Sub-2-second page load times guaranteed',
      'Scalable codebase that grows with your business',
      'Complete ownership of your code and data',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS', 'Next.js', 'PostgreSQL'],
    faq: [
      {
        question: 'How long does it take to build a website?',
        answer:
          'A business website typically takes 2–3 weeks. A full-stack application with custom features takes 4–8 weeks. We provide detailed timelines during the project scoping call.',
      },
      {
        question: 'Do you provide website maintenance after launch?',
        answer:
          'Yes. We offer monthly maintenance packages covering security updates, performance monitoring, content updates, and feature additions.',
      },
      {
        question: 'Will my website work on mobile devices?',
        answer:
          'Every website we build is fully responsive and mobile-first. We test across iOS, Android, and all major browsers before delivery.',
      },
    ],
  },
  {
    id: '5',
    slug: 'professional-training',
    name: 'Professional Training',
    icon: 'GraduationCap',
    shortDesc: 'Hands-on upskilling programs in analytics, tools, and digital transformation.',
    longDesc:
      "Corporate training that actually builds skills, not just awards certificates. Our hands-on programs teach your team to use data tools and analytics frameworks in the context of your real business challenges. We train individuals, teams, and entire departments.",
    features: [
      'Python & SQL for Data Analysis',
      'Power BI & Tableau Mastery',
      'Advanced Excel & Data Visualization',
      'Business Intelligence Concepts & Strategy',
      'Web Development Fundamentals',
      'Machine Learning Introduction',
    ],
    benefits: [
      'Build in-house data capability permanently',
      'Reduce dependency on external consultants',
      'Upskill your team in 30–90 day programs',
      'Hands-on learning with your actual data',
      'Corporate workshop format or individual coaching',
    ],
    technologies: ['Python', 'SQL', 'Power BI', 'Tableau', 'Advanced Excel', 'React', 'Scikit-learn'],
    faq: [
      {
        question: 'Can training be customized for our specific industry or tools?',
        answer:
          'Yes. Every training program is customized to your team\'s skill level, industry context, and the specific tools you use. We use your real data and business scenarios for maximum relevance.',
      },
      {
        question: 'Do you offer corporate group training?',
        answer:
          'Absolutely. We offer corporate workshops for groups of 5–50+ participants, both online and on-site. Custom pricing applies for group bookings.',
      },
      {
        question: 'What is the format of the training programs?',
        answer:
          'Programs are hands-on and project-based. Participants work on real exercises and build portfolio projects during the course. We offer live sessions, recordings, and ongoing support.',
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map(s => s.slug);
