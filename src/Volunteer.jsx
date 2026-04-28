import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ClipboardList,
  HandHeart,
  LayoutDashboard,
  Mail,
  Menu,
  Settings,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Volunteer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [volunteers, setVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(true);
  const [volunteerError, setVolunteerError] = useState("");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoadingVolunteers(true);
        setVolunteerError("");

        const res = await fetch(`${API_BASE_URL}/volunteer/list`);

        if (!res.ok) {
          throw new Error("Failed to fetch volunteers");
        }

        const data = await res.json();
        setVolunteers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setVolunteerError("Unable to load volunteer data.");
      } finally {
        setLoadingVolunteers(false);
      }
    };

    if (API_BASE_URL) {
      fetchVolunteers();
    } else {
      setVolunteerError("VITE_API_BASE_URL is not defined in .env");
      setLoadingVolunteers(false);
    }
  }, []);

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "#" },
    { label: "Assigned Tasks", icon: ClipboardList, href: "#" },
    { label: "Completed Tasks", icon: CheckCircle2, href: "#" },
    { label: "Schedule", icon: CalendarDays, href: "#" },
    { label: "Opportunities", icon: HandHeart, href: "#" },
    { label: "Messages", icon: Mail, href: "#" },
    { label: "My Profile", icon: User, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  const stats = [
    {
      title: "Assigned Tasks",
      value: "--",
      note: "Tasks currently assigned",
      icon: ClipboardList,
      color: "from-emerald-400 via-green-500 to-sky-500",
    },
    {
      title: "Completed Tasks",
      value: "--",
      note: "Tasks completed successfully",
      icon: CheckCircle2,
      color: "from-green-400 via-emerald-500 to-teal-500",
    },
    {
      title: "Upcoming Events",
      value: "--",
      note: "Scheduled opportunities ahead",
      icon: CalendarDays,
      color: "from-sky-400 via-blue-500 to-cyan-500",
    },
    {
      title: "Total Hours",
      value: "--",
      note: "Volunteer service hours logged",
      icon: Clock3,
      color: "from-amber-300 via-yellow-400 to-orange-400",
    },
  ];

  const filters = ["All", "Today", "This Week", "High Priority"];

  const assignedTasks = [
    {
      title: "Task title placeholder",
      category: "Category",
      assignedBy: "Coordinator Name",
      dueDate: "Date here",
      location: "Area / Remote",
      priority: "High Priority",
      status: "Pending",
    },
    {
      title: "Task title placeholder",
      category: "Category",
      assignedBy: "Coordinator Name",
      dueDate: "Date here",
      location: "Area / Remote",
      priority: "High Priority",
      status: "Pending",
    },
    {
      title: "Task title placeholder",
      category: "Category",
      assignedBy: "Coordinator Name",
      dueDate: "Date here",
      location: "Area / Remote",
      priority: "High Priority",
      status: "Pending",
    },
    {
      title: "Task title placeholder",
      category: "Category",
      assignedBy: "Coordinator Name",
      dueDate: "Date here",
      location: "Area / Remote",
      priority: "High Priority",
      status: "Pending",
    },
  ];

  const completedTasks = [
    {
      title: "Completed task placeholder",
      campaign: "Example campaign",
      completedOn: "Date here",
      hours: "--",
      status: "Approved",
    },
    {
      title: "Completed task placeholder",
      campaign: "Example campaign",
      completedOn: "Date here",
      hours: "--",
      status: "Approved",
    },
    {
      title: "Completed task placeholder",
      campaign: "Example campaign",
      completedOn: "Date here",
      hours: "--",
      status: "Approved",
    },
  ];

  const schedules = [
    {
      title: "Event / Shift placeholder",
      date: "Date here",
      time: "Time here",
      role: "Volunteer role",
      venue: "Venue name",
      status: "Confirmed",
    },
    {
      title: "Event / Shift placeholder",
      date: "Date here",
      time: "Time here",
      role: "Volunteer role",
      venue: "Venue name",
      status: "Confirmed",
    },
  ];

  const announcements = [
    {
      title: "Announcement title placeholder",
      author: "Coordinator",
      date: "Date here",
    },
    {
      title: "Announcement title placeholder",
      author: "Coordinator",
      date: "Date here",
    },
  ];

  const opportunities = [
    {
      title: "Opportunity title placeholder",
      location: "Area name",
      duration: "Duration",
      skills: "Skills needed",
    },
    {
      title: "Opportunity title placeholder",
      location: "Area name",
      duration: "Duration",
      skills: "Skills needed",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-14px) translateX(6px); }
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        .page-shell { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero-reveal { animation: slideUpFade 0.9s ease-out both; }
        .hero-reveal-delay { animation: slideUpFade 1.2s ease-out both; }
        .floating-card { animation: float 6s ease-in-out infinite; }
        .floating-card-slow { animation: floatSlow 8s ease-in-out infinite; }
        .soft-pulse { animation: pulseGlow 3s ease-in-out infinite; }

        .shimmer-bar {
          background: linear-gradient(
            90deg,
            rgba(34,197,94,0.35) 0%,
            rgba(59,130,246,0.55) 50%,
            rgba(250,204,21,0.35) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-shell,
          .hero-reveal,
          .hero-reveal-delay,
          .floating-card,
          .floating-card-slow,
          .soft-pulse,
          .shimmer-bar {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-200/60 bg-white/85 backdrop-blur-xl shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-sky-500 shadow-lg shadow-emerald-400/20">
              <span className="text-xl font-black text-white">H</span>
            </div>
            <div>
              <h1 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                HelpLink
              </h1>
              <p className="text-xs text-emerald-700">Volunteer Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 text-slate-700 hover:bg-emerald-50 transition lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <button
              className="hidden lg:flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-4 text-slate-700 hover:bg-emerald-50 transition"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
              aria-expanded={!sidebarCollapsed}
              aria-controls="volunteer-sidebar"
            >
              {sidebarCollapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">
                {sidebarCollapsed ? "Show menu" : "Hide menu"}
              </span>
            </button>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 text-slate-700 hover:bg-emerald-50 transition"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-sky-500 shadow-lg shadow-emerald-400/20">
              <span className="text-lg font-black text-white">VP</span>
            </div>
          </div>
        </nav>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        id="volunteer-sidebar"
        className={`fixed left-0 top-0 z-50 flex h-full w-[300px] max-w-[90vw] flex-col border-r border-emerald-200/60 bg-white/90 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:-translate-x-full" : "lg:translate-x-0"} lg:w-[280px]`}
      >
        <div className="flex h-20 items-center justify-between border-b border-emerald-200/60 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-sky-500 shadow-lg shadow-emerald-400/20">
              <span className="text-xl font-black text-white">H</span>
            </div>
            <div>
              <h1 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                HelpLink
              </h1>
              <p className="text-xs text-emerald-700">Volunteer Portal</p>
            </div>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50 transition lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-6 pt-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all ${
                activeNav === item.label
                  ? "border-emerald-200 bg-gradient-to-r from-emerald-100 to-sky-100 shadow-md"
                  : "border-transparent hover:bg-emerald-50/80"
              }`}
              onClick={() => {
                setActiveNav(item.label);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="h-5 w-5 text-emerald-700" />
              <span className="font-medium text-slate-800">{item.label}</span>
              {activeNav === item.label && (
                <div className="ml-auto flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500" />
              )}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-emerald-200/60 p-6">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50/80 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Need help?</p>
              <p className="text-xs text-slate-500">Contact your coordinator</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarCollapsed && (
        <button
          className="fixed left-4 top-24 z-40 hidden h-12 items-center gap-2 rounded-xl border border-emerald-200 bg-white/90 px-4 text-slate-700 shadow-lg backdrop-blur-xl transition hover:bg-emerald-50 lg:flex"
          onClick={() => setSidebarCollapsed(false)}
          aria-label="Show sidebar"
          aria-expanded="false"
          aria-controls="volunteer-sidebar"
        >
          <Menu className="h-5 w-5" />
          <span className="text-sm font-medium">Menu</span>
        </button>
      )}

      <main
        className={`pt-20 pb-12 transition-all duration-300 ${
          sidebarCollapsed ? "ml-0" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <section className="page-shell mx-auto max-w-7xl px-6 lg:px-10">
          <div className="hero-reveal mb-8 rounded-[2rem] border border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-green-50 to-sky-50 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="font-['Satoshi'] text-3xl font-black tracking-[-0.04em] text-slate-900 lg:text-4xl">
                  Welcome to your Dashboard
                </h1>
                <p className="mt-3 max-w-md text-slate-600">
                  Manage assignments, track progress, and view upcoming opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-2xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  View Today's Tasks
                </button>
                <button className="rounded-2xl border border-emerald-200 bg-white/70 px-6 py-3 font-semibold text-emerald-800 backdrop-blur-md transition hover:-translate-y-1 hover:bg-emerald-50">
                  Update Availability
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-[1.5rem] border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Volunteer API Data</h2>
                <p className="text-sm text-slate-500">
                  Live list fetched from <code>{API_BASE_URL || "Missing .env value"}</code>
                </p>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                Total Volunteers: {volunteers.length}
              </div>
            </div>

            {loadingVolunteers && (
              <p className="mt-4 text-sm text-slate-500">Loading volunteers...</p>
            )}

            {volunteerError && (
              <p className="mt-4 text-sm font-medium text-red-600">{volunteerError}</p>
            )}

            {!loadingVolunteers && !volunteerError && (
              <div className="mt-4 overflow-x-auto">
                <div className="grid gap-4 md:grid-cols-2">
                  {volunteers.length > 0 ? (
                    volunteers.map((volunteer, index) => (
                      <div
                        key={volunteer._id || volunteer.id || index}
                        className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-4"
                      >
                        <h3 className="font-semibold text-slate-900">
                          {volunteer.name || volunteer.fullName || "Volunteer Name"}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-slate-600">
                          <p>Email: {volunteer.email || "N/A"}</p>
                          <p>Phone: {volunteer.phone || "N/A"}</p>
                          <p>Role: {volunteer.role || "Volunteer"}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No volunteers found.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="group rounded-[1.5rem] border border-emerald-200/60 bg-white/75 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="tabular-nums text-3xl font-black text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                  Assigned Tasks
                </h2>
                <p className="text-sm text-slate-500">
                  Current work items assigned to you
                </p>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
              >
                See all tasks →
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-400/20"
                      : "border border-emerald-200 bg-white/80 text-slate-700 hover:bg-emerald-50"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              {assignedTasks.map((task, index) => (
                <div
                  key={index}
                  className="group rounded-[1.5rem] border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold text-slate-900">
                        {task.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
                          {task.category}
                        </span>
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-800">
                          {task.assignedBy}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>Due: {task.dueDate}</span>
                        <span>{task.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 sm:ml-4">
                      <div className="flex gap-2">
                        {task.priority && (
                          <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                            {task.priority}
                          </span>
                        )}
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                          {task.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-emerald-50">
                          Details
                        </button>
                        <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:shadow-emerald-400/25">
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                    Upcoming Schedule
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">Next events and shifts</p>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  View calendar →
                </a>
              </div>

              <div className="mt-6 space-y-4">
                {schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-1 font-semibold text-slate-900">
                          {schedule.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{schedule.date}</span>
                          <span>{schedule.time}</span>
                          <span>{schedule.role}</span>
                          <span>{schedule.venue}</span>
                        </div>
                      </div>
                      <span className="whitespace-nowrap rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
                        {schedule.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                    Completed Tasks
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">Recently finished work</p>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  View history →
                </a>
              </div>

              <div className="mt-6 space-y-3">
                {completedTasks.map((task, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4 transition hover:bg-emerald-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 font-medium text-slate-900">
                        {task.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{task.campaign}</span>
                        <span>{task.completedOn}</span>
                        <span>{task.hours}</span>
                      </div>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                  Opportunities
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  New roles you can apply for
                </p>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                Browse all →
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-sky-50 p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="line-clamp-2 font-semibold text-slate-900">
                    {opportunity.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{opportunity.location}</span>
                    <span>{opportunity.duration}</span>
                    <span>{opportunity.skills}</span>
                  </div>
                  <button className="mt-5 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                  Announcements & Updates
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Messages from coordinators
                </p>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                View all →
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-emerald-200/60 bg-white/80 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="line-clamp-2 font-semibold text-slate-900">
                    {announcement.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{announcement.author}</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
