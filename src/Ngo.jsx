import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "./firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  FilePlus2,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from "lucide-react";

export default function Ngo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [taskFilter, setTaskFilter] = useState("All");
  const [menuHidden, setMenuHidden] = useState(false);
  const navigate = useNavigate();
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "needs"), (snap) => {
      setNeeds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const updateNeedStatus = async (needId, status) => {
    await updateDoc(doc(db, "needs", needId), { verificationStatus: status });
  };

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "#" },
    { label: "Post Task", icon: FilePlus2, href: "#" },
    { label: "Manage Tasks", icon: ClipboardList, href: "#" },
    { label: "Volunteers", icon: Users, href: "#" },
    { label: "Applications", icon: UserCheck, href: "#" },
    { label: "Schedule", icon: CalendarDays, href: "#" },
    { label: "Messages", icon: Mail, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  const stats = [
    {
      title: "Active Tasks",
      value: "--",
      note: "Currently open volunteer tasks",
      icon: ClipboardList,
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Available Volunteers",
      value: "--",
      note: "Volunteers ready for assignment",
      icon: Users,
      accent: "bg-sky-100 text-sky-700",
    },
    {
      title: "Pending Applications",
      value: "--",
      note: "Volunteer requests awaiting review",
      icon: UserCheck,
      accent: "bg-amber-100 text-amber-700",
    },
    {
      title: "Upcoming Events",
      value: "--",
      note: "Scheduled drives and campaigns",
      icon: CalendarDays,
      accent: "bg-violet-100 text-violet-700",
    },
  ];

  const filters = ["All", "Urgent", "Open", "Closing Soon"];

  const postedTasks = [
    {
      title: "Task title placeholder",
      category: "Category",
      location: "Area / Remote",
      date: "Date here",
      volunteersNeeded: "--",
      status: "Open",
    },
    {
      title: "Task title placeholder",
      category: "Category",
      location: "Area / Remote",
      date: "Date here",
      volunteersNeeded: "--",
      status: "Open",
    },
    {
      title: "Task title placeholder",
      category: "Category",
      location: "Area / Remote",
      date: "Date here",
      volunteersNeeded: "--",
      status: "Open",
    },
  ];

  const volunteers = [
    {
      name: "Volunteer Name",
      skills: "Teaching, Outreach",
      availability: "Weekends",
      location: "City area",
      status: "Available",
    },
    {
      name: "Volunteer Name",
      skills: "Medical Support, Coordination",
      availability: "Evenings",
      location: "City area",
      status: "Available",
    },
    {
      name: "Volunteer Name",
      skills: "Logistics, Distribution",
      availability: "Full Week",
      location: "City area",
      status: "Available",
    },
  ];

  const applications = [
    {
      task: "Task title placeholder",
      applicant: "Volunteer Name",
      appliedOn: "Date here",
      status: "Pending",
    },
    {
      task: "Task title placeholder",
      applicant: "Volunteer Name",
      appliedOn: "Date here",
      status: "Pending",
    },
    {
      task: "Task title placeholder",
      applicant: "Volunteer Name",
      appliedOn: "Date here",
      status: "Pending",
    },
  ];

  const announcements = [
    {
      title: "Announcement title placeholder",
      author: "NGO Admin",
      date: "Date here",
    },
    {
      title: "Announcement title placeholder",
      author: "NGO Admin",
      date: "Date here",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-200/60 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-emerald-400/10">
              <img src="/src/assets/logo.png" alt="Sahaay Logo" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <h1 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                Sahaay
              </h1>
              <p className="text-xs text-emerald-700">NGO Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-700 transition hover:bg-emerald-50 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-700 transition hover:bg-emerald-50"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>

            <button
              className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50"
              onClick={() => setMenuHidden((v) => !v)}
            >
              {menuHidden ? "Show menu" : "Hide menu"}
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-sky-500 shadow-lg shadow-emerald-400/20">
              <span className="text-lg font-black text-white">NG</span>
            </div>
          </div>
        </nav>
      </header>

      {!menuHidden && (
        <aside className="fixed left-0 top-0 z-40 hidden h-full w-[280px] flex-col border-r border-emerald-200/60 bg-white/80 backdrop-blur-xl lg:flex">
          <div className="flex h-20 items-center gap-3 border-b border-emerald-200/60 px-6">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-emerald-400/10">
              <img src="/src/assets/logo.png" alt="Sahaay Logo" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <h2 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                Sahaay
              </h2>
              <p className="text-xs text-emerald-700">NGO Portal</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 p-6 pt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveNav(item.label)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-transparent text-slate-600 hover:border-emerald-100 hover:bg-emerald-50/60 hover:text-slate-900"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-emerald-200/60 p-6">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Organization Tools</p>
                <p className="text-xs text-slate-600">Manage tasks and volunteers</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {sidebarOpen && !menuHidden && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {sidebarOpen && !menuHidden && (
        <aside className="fixed left-0 top-0 z-50 flex h-full w-[300px] max-w-[90vw] flex-col border-r border-emerald-200/60 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-emerald-200/60 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-emerald-400/10">
                <img src="/src/assets/logo.png" alt="Sahaay Logo" className="h-full w-full object-contain p-1" />
              </div>
              <div>
                <h2 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                  Sahaay
                </h2>
                <p className="text-xs text-emerald-700">NGO Portal</p>
              </div>
            </div>

            <button
              className="rounded-xl border border-emerald-200 bg-white p-2 text-slate-700"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-6 pt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.label);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-transparent text-slate-600 hover:border-emerald-100 hover:bg-emerald-50/60 hover:text-slate-900"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </aside>
      )}

      <main className={`min-h-screen pt-24 pb-12 ${menuHidden ? "lg:pl-0" : "lg:pl-[280px]"}`}>
        <section className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  NGO Dashboard
                </p>
                <h1 className="mt-3 font-['Satoshi'] text-3xl font-black tracking-[-0.04em] text-slate-900 lg:text-4xl">
                  Manage your NGO operations
                </h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Create tasks, review volunteer availability, track applications,
                  and monitor upcoming campaigns from one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/submit-need")}
                  className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-600">
                  Submit Field Report
                </button>
                <button className="rounded-2xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-emerald-50">
                  View Volunteers
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="rounded-[1.5rem] border border-emerald-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-3xl font-black tracking-tight text-slate-900 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{stat.note}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                    Upload a Task
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Create a new volunteer opportunity or assignment
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Task title"
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
                <input
                  type="text"
                  placeholder="Date"
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
                <input
                  type="text"
                  placeholder="Volunteers needed"
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
                <select className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15">
                  <option>Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <textarea
                  placeholder="Task description"
                  rows={5}
                  className="md:col-span-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-600">
                  Publish Task
                </button>
                <button className="rounded-2xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-emerald-50">
                  Save Draft
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                    Available Volunteers
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Search and review volunteers for tasks
                  </p>
                </div>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-700">
                  <Search className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {volunteers.map((volunteer, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">{volunteer.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{volunteer.skills}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{volunteer.availability}</span>
                          <span>{volunteer.location}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {volunteer.status}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-emerald-50">
                        View Profile
                      </button>
                      <button className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600">
                        Assign Task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                  Posted Tasks
                </h2>
                <p className="text-sm text-slate-600">
                  Review currently published NGO tasks
                </p>
              </div>
              <a href="#" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                Manage all tasks →
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${taskFilter === filter
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-400/20"
                    : "border border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              {postedTasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-emerald-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900">{task.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-slate-700">
                          {task.category}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-slate-700">
                          {task.location}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{task.date}</span>
                        <span>Needed: {task.volunteersNeeded}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {task.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-emerald-50">
                          Edit
                        </button>
                        <button className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600">
                          View Applicants
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                Needs Heatmap
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Live map of open needs across regions
              </p>
            </div>
            <div style={{ height: "400px", borderRadius: "1rem", overflow: "hidden" }}>
              <MapContainer
                center={[22.9734, 78.6569]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {needs.map((need) => {
                  const lat = need.lat || need.location?.lat;
                  const lng = need.lng || need.location?.lng;
                  if (!lat || !lng) return null;
                  const urgency = need.urgencyScore || need.urgency?.score || 5;
                  const color = urgency >= 8 ? "#ef4444" : urgency >= 5 ? "#f97316" : "#22c55e";
                  return (
                    <CircleMarker
                      key={need.id}
                      center={[lat, lng]}
                      radius={urgency * 2}
                      fillColor={color}
                      color={color}
                      fillOpacity={0.6}
                      weight={1}
                    >
                      <Popup>
                        <strong>{need.title || need.description?.slice(0, 50)}</strong>
                        <br />
                        Urgency: {urgency}/10
                        <br />
                        Status: {need.verificationStatus || need.verification_status}
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
          <div className="mt-12 rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div>
              <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                Needs — Coordinator Review
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Verify or dispute needs before they surface to volunteers
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {needs.length === 0 && <p className="text-slate-500">No needs found.</p>}
              {needs.map((need) => (
                <div key={need.id} className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 line-clamp-2">{need.title || need.description}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>📍 {need.location?.address || need.district || "Unknown location"}</span>
                        <span>⚡ Urgency: {need.urgencyScore}/10</span>
                        <span>📂 {need.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${need.verificationStatus === "verified"
                        ? "bg-emerald-100 text-emerald-700"
                        : need.verificationStatus === "disputed"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                        }`}>
                        {need.verificationStatus || "unverified"}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateNeedStatus(need.id, "verified")}
                          className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateNeedStatus(need.id, "disputed")}
                          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Dispute
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
                    Recent Applications
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Volunteer requests awaiting action
                  </p>
                </div>
                <a href="#" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  View all →
                </a>
              </div>

              <div className="mt-6 space-y-3">
                {applications.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4 transition hover:bg-emerald-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 font-medium text-slate-900">{item.applicant}</h3>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{item.task}</span>
                        <span>{item.appliedOn}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-900">
                    Announcements & Updates
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Publish notices for volunteers
                  </p>
                </div>
                <a href="#" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  View all →
                </a>
              </div>

              <div className="mt-6 grid gap-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="rounded-[1.5rem] border border-emerald-200/60 bg-emerald-50/50 p-6 transition hover:bg-emerald-50"
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
          </div>
        </section>
      </main>
    </div>
  );
}
