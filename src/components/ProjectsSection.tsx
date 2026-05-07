'use client';

import { useState } from 'react';
import { ExternalLink, Zap, Cloud, Bot, Workflow, Server, Network, Mail, Shield } from 'lucide-react';

const automationProjects = [
  {
    title: "Google Sheets to Slack & Facebook",
    category: "Make (Integromat)",
    icon: Workflow,
    description: "Scenario that receives webhook data via custom webhooks, logs to Google Sheets, sends Slack notifications, and publishes posts to Facebook Pages.",
    technologies: ["Make", "Webhooks", "Google Sheets", "Slack", "Facebook"],
    image: "/projects/google-sheets-automation.png",
  },
  {
    title: "Automated Weather Facebook Posting",
    category: "n8n Automation",
    icon: Cloud,
    description: "Automated workflow that fetches current weather data, generates AI-powered weather images, and posts to Facebook Page.",
    technologies: ["n8n", "OpenWeather API", "Google Drive", "Facebook Graph API", "AI"],
    image: "/projects/weather-automation.png",
  },
  {
    title: "AI-Powered Facebook Chatbot",
    category: "n8n Automation",
    icon: Bot,
    description: "Webhook-based chatbot using Google Gemini AI with memory to respond to Facebook Page queries.",
    technologies: ["n8n", "Google Gemini", "Webhooks", "AI Agent", "Facebook API"],
    image: "/projects/fb-chatbot.png",
  },
  {
    title: "CRM Lead Action & Subtask Automation",
    category: "Zapier",
    icon: Zap,
    description: "Complex multi-path automation handling Asana task updates, Google Drive folder creation, and automated email notifications.",
    technologies: ["Zapier", "Asana", "Google Drive", "Gmail", "Path Routing"],
    image: "/projects/crm-automation.png",
  },
  {
    title: "AI Content Repurposing Workflow",
    category: "Zapier",
    icon: Workflow,
    description: "Automated content pipeline that transcribes files, generates blog posts using AI, and distributes across social media.",
    technologies: ["Zapier", "AI Transcription", "Facebook", "LinkedIn", "Instagram"],
    image: "/projects/content-repurposing.png",
  },
  {
    title: "Automated Leads Enrichment",
    category: "Zapier",
    icon: Zap,
    description: "Lead processing with Apollo enrichment, priority-based routing, Slack notifications, and AI-generated email drafts.",
    technologies: ["Zapier", "Apollo", "Google Sheets", "Slack", "AI"],
    image: "/projects/leads-enrichment.png",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Real-world workflow automations using n8n, Zapier, Make, and AI integrations
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 transition cursor-pointer"
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              {/* Project Image */}
              <div className="h-48 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <project.icon size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expand Button */}
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {selectedProject === index ? 'Show Less' : 'View Details'}
                  <ExternalLink size={16} />
                </button>

                {/* Expanded Details */}
                {selectedProject === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Tools Used:</strong> {project.technologies.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      <strong>Category:</strong> {project.category}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
