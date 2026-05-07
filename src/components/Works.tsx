'use client';

import { useState } from "react";
import { Server, Network, Mail, Shield, Workflow, Zap, Bot, Cloud, X } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const automationProjects = [
  { title: "Google Sheets to Slack & Facebook", category: "Make", icon: Workflow, description: "Webhook automation logging to Google Sheets, Slack notifications, and Facebook posting.", technologies: ["Make", "Webhooks", "Google Sheets", "Slack", "Facebook"], company: "Personal", image: "/projects/integration-google-sheets.png" },
  { title: "Automated Weather Facebook Posting", category: "n8n", icon: Cloud, description: "Fetches weather data, generates AI images, posts to Facebook automatically.", technologies: ["n8n", "OpenWeather API", "Google Drive", "Facebook API", "AI"], company: "Personal", image: "/projects/n8n-weather-automation.png" },
  { title: "AI-Powered Facebook Chatbot", category: "n8n", icon: Bot, description: "Chatbot using Google Gemini AI to respond to Facebook Page queries.", technologies: ["n8n", "Google Gemini", "Webhooks", "AI", "Facebook API"], company: "Personal", image: "/projects/n8n-fbpage-chatbot.png" },
  { title: "CRM Lead Automation", category: "Zapier", icon: Zap, description: "Multi-path automation for Asana tasks, Google Drive, and email notifications.", technologies: ["Zapier", "Asana", "Google Drive", "Gmail"], company: "Freelance", image: "/projects/zapier-crm-automation.png" },
  { title: "AI Content Repurposing", category: "Zapier", icon: Workflow, description: "Transcribes files, generates blog posts with AI, distributes to social media.", technologies: ["Zapier", "AI", "Facebook", "LinkedIn", "Instagram"], company: "Personal", image: "/projects/zapier-content-repurposing.png" },
  { title: "Automated Leads Enrichment", category: "Zapier", icon: Zap, description: "Lead processing with Apollo enrichment, Slack notifications, AI email drafts.", technologies: ["Zapier", "Apollo", "Google Sheets", "Slack", "AI"], company: "Freelance", image: "/projects/zapier-leads-enrichment.png" },
];

const infrastructureProjects = [
  { title: "Enterprise IT Infrastructure", category: "Infrastructure", icon: Server, description: "Complete IT setup for call center including structured cabling, network design, and server deployment.", technologies: ["VMware", "Ubiquiti", "Cabling", "VOIP"], company: "Infinitecs" },
  { title: "Multi-Branch Network", category: "Networking", icon: Network, description: "Managed enterprise IT across multiple branches with centralized security and surveillance.", technologies: ["Ubiquiti", "M365", "Security", "CCTV"], company: "Acro Distribution" },
  { title: "Email Migration & Recovery", category: "Cloud", icon: Mail, description: "Migrated from Eudora to Google Workspace and recovered 14 years of historical emails.", technologies: ["Google Workspace", "cPanel", "DNS", "Migration"], company: "Roberts Automotive" },
  { title: "Server Virtualization", category: "Virtualization", icon: Shield, description: "Migrated physical servers to VMware with automated firewall startup and Synology NAS backup.", technologies: ["VMware", "Ubuntu", "Synology NAS", "Firewall"], company: "Roberts Automotive" },
];

type Project = {
  title: string;
  category: string;
  icon: any;
  description: string;
  technologies: string[];
  company: string;
  image?: string;
};

const ProjectCard = ({ project, onExpand }: { project: Project, onExpand: (p: Project) => void }) => (
  <div className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 shadow-md hover:shadow-xl h-full flex flex-col"
    style={{ backgroundColor: 'var(--card-bg)' }}>
    <div className="h-52 relative overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0 cursor-pointer"
      onClick={() => onExpand(project)}>
      {project.image ? (
        <img src={project.image} alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <project.icon size={64} className="text-indigo-400 opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      {/* Expand hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">Click to expand</span>
      </div>
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow">
          {project.category}
        </span>
      </div>
      {project.company && (
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs">{project.company}</span>
        </div>
      )}
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Lightbox Modal
const Lightbox = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}>
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
    <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: 'var(--card-bg)' }}
      onClick={e => e.stopPropagation()}>
      {/* Close button */}
      <button onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition">
        <X size={20} />
      </button>
      {/* Full image */}
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full max-h-[60vh] object-contain bg-gray-900" />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <project.icon size={80} className="text-indigo-400 opacity-40" />
        </div>
      )}
      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">{project.category}</span>
          {project.company && <span className="text-xs text-gray-500 dark:text-gray-400">{project.company}</span>}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-md text-sm font-medium" style={{ backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Works = () => {
  const [activeTab, setActiveTab] = useState<'automation' | 'infrastructure'>('automation');
  const [expanded, setExpanded] = useState<Project | null>(null);
  const projects = activeTab === 'automation' ? automationProjects : infrastructureProjects;

  return (
    <section className="py-12 px-6">
      {/* Lightbox */}
      {expanded && <Lightbox project={expanded} onClose={() => setExpanded(null)} />}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Notable Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Key projects demonstrating expertise in automation and IT infrastructure.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <button onClick={() => setActiveTab('automation')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'automation'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>
              <Zap size={16} /> Automation Projects
            </button>
            <button onClick={() => setActiveTab('infrastructure')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'infrastructure'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>
              <Server size={16} /> Infrastructure Projects
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper key={activeTab} modules={[Navigation, Pagination]} grabCursor={true} centeredSlides={true}
          slidesPerView={1} spaceBetween={24} pagination={{ clickable: true }} navigation={true}
          breakpoints={{ 640: { slidesPerView: 1.3 }, 1024: { slidesPerView: 2.2 } }}
          className="!pb-12">
          {projects.map((project) => (
            <SwiperSlide key={project.title} className="!h-auto">
              <ProjectCard project={project} onExpand={setExpanded} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Works;
