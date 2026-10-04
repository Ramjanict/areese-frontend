import { type project } from "@/components/collaboratorDashboard/ProjectCard";

import { AlertTriangle } from "lucide-react";
import { LuCalendarClock } from "react-icons/lu";
import Project from "./Project";
export const projectsData: project[] = [
  {
    id: 1,
    title: "Fitness Tracking App",
    personName: "John Doe",
    role: "Frontend Developer",
    keyPoints: [
      "Built responsive UI with React and Tailwind CSS",
      "Integrated REST API for workout tracking",
      "Implemented authentication and protected routes",
    ],
    icon: <LuCalendarClock />,
    date: "2026-05-14",
    projectType: "Mobile Application",
    startDate: "2026-04-01",
    startTime: "10:00",
    endDate: "2026-05-10",
    endTime: "18:00",
    resourceLink: "https://github.com/example/fitness-app",
    shortNote: "A modern fitness tracking platform for daily workouts.",
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    personName: "Sarah Ahmed",
    role: "Full Stack Developer",
    keyPoints: [
      "Created analytics dashboard with charts",
      "Managed global state using Zustand",
      "Implemented product and order management system",
    ],
    icon: <AlertTriangle />,
    date: "2026-05-14",
    projectType: "Web Application",
    startDate: "2026-03-15",
    startTime: "9:00",
    endDate: "2026-04-28",
    endTime: "16:30",
    resourceLink: "https://github.com/example/ecommerce-dashboard",
    shortNote: "Admin dashboard for managing e-commerce operations.",
  },
];
const ProjectList = () => {
  return (
    <div>
      <Project />
    </div>
  );
};

export default ProjectList;
