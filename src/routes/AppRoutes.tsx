import MainLayout from "@/components/layout/MainLayout";

import CollaboratorLayout from "@/components/layout/CollaboratorLayout";
import ContactPage from "@/features/contactPage/ContactPage";
import PricingHero from "@/features/home/PricingHero";
import AboutPage from "@/pages/AboutPage";
import BlogCategories from "@/pages/BlogCategories";
import Blogs from "@/pages/Blogs";
import BookingPackages from "@/pages/BookingPackages";
import CollaboratorHome from "@/pages/collaborator/CollaboratorHome";
import CollaboratorTeam from "@/pages/collaborator/CollaboratorTeam";
import Contacts from "@/pages/Contacts";
import CreateDashboard from "@/pages/CreateDashboard";
import Dashboard from "@/pages/Dashboard";
import FollowUps from "@/pages/FollowUps";
import Home from "@/pages/Home";
import Login from "@/pages/login";
import MessageTemplate from "@/pages/MessageTemplate";
import Privacy from "@/pages/Privacy";
import ProfileSettings from "@/pages/ProfileSettings";
import PublicBooking from "@/pages/PublicBooking";
import Settings from "@/pages/Settings";
import Signup from "@/pages/Signup";
import TeamsList from "@/pages/team/Project";
import ProjectList from "@/pages/team/ProjectList";
import TeamArchive from "@/pages/team/TeamArchive";
import TeamDetails from "@/pages/team/TeamDetails";
import TeamAccess from "@/pages/TeamAccess";
import Terms from "@/pages/Terms";
import Users from "@/pages/Users";
import ViewAppointments from "@/pages/ViewAppointments";
import ViewTeams from "@/pages/ViewTeams";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",

        element: <Home />,
      },
      {
        path: "/price",

        element: <PricingHero />,
      },
      {
        path: "/contact",

        element: <ContactPage />,
      },
      {
        path: "/about",

        element: <AboutPage />,
      },
      {
        path: "/signup",

        element: <Signup />,
      },
      {
        path: "/login",

        element: <Login />,
      },
      {
        path: "/privacy",

        element: <Privacy />,
      },
      {
        path: "/terms",

        element: <Terms />,
      },

      {
        element: <ProtectedRoute allowedRole="admin" />,
        children: [
          {
            element: <MainLayout />,
            path: "/admin",
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "create-dashboard", element: <CreateDashboard /> },
              { path: "follow-ups", element: <FollowUps /> },
              { path: "booking-packages", element: <BookingPackages /> },
              { path: "public-booking", element: <PublicBooking /> },
              { path: "appointments", element: <ViewAppointments /> },
              { path: "settings", element: <Settings /> },
              { path: "message-template", element: <MessageTemplate /> },
              { path: "team-access", element: <TeamAccess /> },
              { path: "project", element: <ProjectList /> },

              { path: "project/team", element: <TeamsList /> },
              { path: "project/team/:Id", element: <TeamDetails /> },
              { path: "team-archive", element: <TeamArchive /> },
              { path: "contacts-us", element: <Contacts /> },
              { path: "users", element: <Users /> },
              { path: "blog-categories", element: <BlogCategories /> },
              { path: "blogs", element: <Blogs /> },
              { path: "profile", element: <ProfileSettings /> },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRole="collaborator" />,
        children: [
          {
            path: "/collaborator",
            element: <CollaboratorLayout />,
            children: [
              { path: "dashboard", element: <CollaboratorHome /> },
              { path: "project", element: <CollaboratorTeam /> },

              { path: "project/team", element: <ViewTeams /> },
              { path: "project/team/:Id", element: <TeamDetails /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
