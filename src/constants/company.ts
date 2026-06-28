import type { Stat } from '@/types';

export const COMPANY = {
  name: 'TechYanshi',
  tagline: 'Turning Data Into Insights. Building Digital Solutions.',
  description: 'Helping Businesses Grow with Data & Technology.',
  mission:
    'Empower every business — from startups to enterprises — with the data intelligence and digital infrastructure to compete and win.',
  vision:
    'To become the most trusted technology consulting partner for data-driven transformation across industries worldwide.',
  coreValues: ['Integrity', 'Innovation', 'Precision', 'Partnership'],
  quote:
    '"We help businesses transform raw data into actionable insights and scalable digital solutions."',
  contact: {
    phone: '+91 8955365468',
    email: 'techyanshi1@gmail.com',
    website: 'www.techyanshi.com',
    location: 'Remote',
  },
  founder: {
    name: 'Priyanshi Gupta',
    title: 'Founder & CEO',
    bio: 'Passionate technology professional helping businesses leverage data, dashboards, and digital solutions to achieve growth and better decision-making.',
    quote:
      '"To make data analytics and digital transformation accessible to every business and individual."',
    expertise: [
      'Data Analytics',
      'Power BI & Tableau',
      'Business Intelligence',
      'MERN Stack Development',
      'Training & Mentorship',
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'React', 'Node.js', 'MongoDB'],
    social: {
      linkedin: '#',
      github: '#',
      portfolio: '#',
      email: 'techyanshi1@gmail.com',
    },
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  social: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
};

export const HERO_STATS: Stat[] = [
  { value: '50', suffix: '+', label: 'Projects Delivered', description: 'Across analytics, dashboards & web dev' },
  { value: '100', suffix: '%', label: 'Client Satisfaction', description: 'Measurable outcomes, not just reports' },
  { value: '5', suffix: 'x', label: 'Faster Decisions', description: 'With data-driven analytics frameworks' },
  { value: '40', suffix: '%', label: 'Efficiency Gains', description: 'Average operational improvement' },
];

export const PROBLEM_STATS: Stat[] = [
  {
    value: '2.5QT',
    label: 'Data Created Daily',
    description: 'Quettabytes generated worldwide every single day',
  },
  {
    value: '97%',
    label: 'Unstructured Data',
    description: 'Of enterprise data goes unused for decision-making',
  },
  {
    value: '3x',
    label: 'Slower Decisions',
    description: 'Companies without analytics lag behind competitors',
  },
  {
    value: '60%',
    label: 'Revenue at Risk',
    description: 'Lost to poor data visibility and manual processes',
  },
];

export const INDUSTRIES = [
  { name: 'Retail & E-Commerce', icon: 'ShoppingBag' },
  { name: 'Healthcare', icon: 'Heart' },
  { name: 'Finance', icon: 'TrendingUp' },
  { name: 'Education', icon: 'GraduationCap' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Startups & SMEs', icon: 'Rocket' },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand your needs and data landscape',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Build strategy, dashboards, and architecture',
    icon: 'PenTool',
  },
  {
    step: '03',
    title: 'Deliver',
    description: 'Deploy solutions and train your teams',
    icon: 'Rocket',
  },
  {
    step: '04',
    title: 'Support',
    description: 'Ongoing optimization and long-term partnership',
    icon: 'HeartHandshake',
  },
];

export const DATA_PIPELINE_STEPS = [
  { step: '1', title: 'Raw Data', description: 'Unstructured, unprocessed' },
  { step: '2', title: 'Information', description: 'Organized, structured' },
  { step: '3', title: 'Insights', description: 'Patterns, trends identified' },
  { step: '4', title: 'Decisions', description: 'Actionable, strategic' },
  { step: '5', title: 'Business Growth', description: 'Revenue, efficiency, scale' },
];

export const COMPARISON_TABLE = [
  { others: 'Generic Reports', techyanshi: 'Business Consulting' },
  { others: 'Static Dashboards', techyanshi: 'Interactive Dashboards' },
  { others: 'Basic Websites', techyanshi: 'Scalable Applications' },
  { others: 'No Strategy', techyanshi: 'Business Intelligence' },
  { others: 'No Support', techyanshi: 'Long-Term Partnership' },
];

export const TESTIMONIALS_STATIC = [
  {
    id: '1',
    author_name: 'Rahul Sharma',
    author_title: 'Operations Director',
    company: 'RetailPro India',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      "TechYanshi's Power BI dashboard transformed how our leadership team operates. We went from weekly Excel reports to real-time visibility — decisions that used to take days now take minutes.",
    rating: 5,
    service: 'Dashboard Development',
    featured: true,
    published: true,
    created_at: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    author_name: 'Priya Mehta',
    author_title: 'Founder',
    company: 'EduBridge Learning',
    avatar_url: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      "The student performance dashboard helped us identify struggling students before they fell behind. TechYanshi didn't just build a tool — they understood our educational mission.",
    rating: 5,
    service: 'Data Analytics',
    featured: true,
    published: true,
    created_at: '2024-04-10T00:00:00Z',
  },
  {
    id: '3',
    author_name: 'Amit Verma',
    author_title: 'CEO',
    company: 'Spice Route Restaurants',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      'Our restaurant analytics dashboard showed us exactly which menu items to promote and which to cut. Revenue went up 18% in the first quarter after implementation.',
    rating: 5,
    service: 'Dashboard Development',
    featured: true,
    published: true,
    created_at: '2024-05-05T00:00:00Z',
  },
  {
    id: '4',
    author_name: 'Sneha Joshi',
    author_title: 'HR Manager',
    company: 'TechWave Solutions',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      "The Python and SQL training program was exactly what our analytics team needed. Hands-on, practical, and immediately applicable. Our team's capability doubled within 8 weeks.",
    rating: 5,
    service: 'Professional Training',
    featured: false,
    published: true,
    created_at: '2024-06-15T00:00:00Z',
  },
  {
    id: '5',
    author_name: 'Vikram Patel',
    author_title: 'Marketing Head',
    company: 'GrowthFirst Startup',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      "Our new website from TechYanshi ranks on page one for all our target keywords within 60 days. The quality of the code, the design, and the conversion optimization — all top-tier.",
    rating: 5,
    service: 'Web Development',
    featured: false,
    published: true,
    created_at: '2024-07-01T00:00:00Z',
  },
  {
    id: '6',
    author_name: 'Neha Kapoor',
    author_title: 'CFO',
    company: 'FinSmart Advisory',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote:
      "TechYanshi built our financial BI framework in 3 weeks. The quality of their work and the depth of their business understanding is exceptional for a company of their size.",
    rating: 5,
    service: 'Business Intelligence',
    featured: false,
    published: true,
    created_at: '2024-07-20T00:00:00Z',
  },
];

export const CAREERS_STATIC = [
  {
    id: '1',
    title: 'Junior Data Analyst',
    type: 'Full-time',
    location: 'Remote',
    department: 'Analytics',
    description:
      'Join our analytics team and help clients unlock the power of their data. You will work with Python, SQL, and data visualization tools to deliver actionable insights.',
    requirements: ['Python proficiency', 'SQL knowledge', 'Excel expertise', 'Strong communication'],
    benefits: ['Flexible remote work', 'Learning budget', 'Mentorship from senior analysts', 'Performance bonuses'],
    active: true,
    created_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Power BI Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Dashboard Development',
    description:
      'Design and build enterprise-grade Power BI dashboards for clients across industries. You will work directly with business stakeholders to translate requirements into impactful visual analytics.',
    requirements: ['Power BI expertise', 'DAX proficiency', 'SQL skills', 'Business acumen'],
    benefits: ['Competitive salary', 'Remote-first culture', 'Certification support', 'Project bonuses'],
    active: true,
    created_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Full-Stack MERN Developer',
    type: 'Contract',
    location: 'Remote',
    department: 'Web Development',
    description:
      'Build scalable web applications for our clients using the MERN stack. You will take projects from requirements to deployment, ensuring quality code and great user experience.',
    requirements: ['React & Node.js expertise', 'MongoDB experience', 'TypeScript', 'REST API design'],
    benefits: ['Competitive contract rate', 'Flexible hours', 'Portfolio-building projects', 'Long-term engagement'],
    active: true,
    created_at: '2024-06-01T00:00:00Z',
  },
];
