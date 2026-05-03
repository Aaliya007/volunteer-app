import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function LandingPage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState("volunteer");
  const [isLogin, setIsLogin] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [introExit, setIntroExit] = useState(false);
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    async function fetchNeeds() {
      const snap = await getDocs(collection(db, "needs"));
      setNeeds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchNeeds();
  }, []);

  const openAuthModal = (selectedRole, loginMode) => {
    setRole(selectedRole);
    setIsLogin(loginMode);
    setOpenModal(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 700);
      return () => clearTimeout(timer);
    }

    const exitTimer = setTimeout(() => {
      setIntroExit(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');

        @keyframes introGlow {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(12px);
            letter-spacing: 0.08em;
            filter: blur(10px);
          }
          35% {
            opacity: 1;
            transform: scale(1) translateY(0);
            letter-spacing: 0.04em;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            letter-spacing: 0.03em;
            filter: blur(0px);
          }
        }

        @keyframes introFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.06);
            filter: blur(10px);
          }
        }

        @keyframes pageReveal {
          0% {
            opacity: 0;
            transform: scale(0.985);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-14px) translateX(6px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(32px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes pingSoft {
          0% { transform: scale(1); opacity: 0.85; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes cinematicGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        .intro-screen {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at top left, rgba(74, 222, 128, 0.20), transparent 30%),
            radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.18), transparent 30%),
            radial-gradient(circle at center, rgba(250, 204, 21, 0.14), transparent 35%),
            linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 45%, #eff6ff 100%);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .intro-screen.exit {
          animation: introFadeOut 0.7s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .intro-logo-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .intro-ring {
          position: absolute;
          width: 13rem;
          height: 13rem;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18), rgba(14, 165, 233, 0.06), transparent 72%);
          filter: blur(8px);
          animation: cinematicGlow 4s ease-in-out infinite;
        }

        .intro-title {
          position: relative;
          z-index: 1;
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          color: #0f172a;
          animation: introGlow 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          text-shadow: 0 8px 30px rgba(16, 185, 129, 0.10);
        }

        .intro-accent {
          height: 0.35rem;
          width: 8rem;
          border-radius: 9999px;
          background: linear-gradient(90deg, #22c55e, #facc15, #38bdf8);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.18);
          animation: introGlow 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .page-shell {
          animation: pageReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hero-reveal {
          animation: slideUpFade 0.9s ease-out both;
        }

        .hero-reveal-delay {
          animation: slideUpFade 1.15s ease-out both;
        }

        .floating-card {
          animation: float 6s ease-in-out infinite;
        }

        .floating-card-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .soft-pulse {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .marquee-track {
          animation: marquee 20s linear infinite;
        }

        .shimmer-bar {
          background: linear-gradient(
            90deg,
            rgba(34,197,94,0.4) 0%,
            rgba(59,130,246,0.6) 50%,
            rgba(250,204,21,0.4) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .ping-soft::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(34,197,94,0.35);
          animation: pingSoft 1.8s ease-out infinite;
        }

        .hero-title {
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(3rem, 6vw, 5.8rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .hero-subtext {
          font-size: clamp(1.05rem, 1.4vw, 1.35rem);
          line-height: 1.9;
          color: rgba(255,255,255,0.92);
        }

        .hero-logo-card {
          background: rgba(255,255,255,0.28);
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.10);
          backdrop-filter: blur(18px);
        }

        .hero-chip-clean {
          background: rgba(255,255,255,0.26);
          border: 1px solid rgba(255,255,255,0.30);
          backdrop-filter: blur(14px);
        }

        .section-reveal {
          animation: slideUpFade 1s ease-out both;
        }

        .cinematic-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          will-change: transform;
        }

        .cinematic-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
          border-color: rgba(16, 185, 129, 0.25);
        }

        .cinematic-image {
          transition: transform 0.7s ease, filter 0.7s ease;
        }

        .cinematic-card:hover .cinematic-image {
          transform: scale(1.04);
          filter: saturate(1.08) contrast(1.04);
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12);
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-title,
          .intro-accent,
          .page-shell,
          .hero-reveal,
          .hero-reveal-delay,
          .floating-card,
          .floating-card-slow,
          .soft-pulse,
          .marquee-track,
          .shimmer-bar,
          .ping-soft::after,
          .cinematic-card,
          .cinematic-image,
          .hover-lift {
            animation: none !important;
            transition: none !important;
          }

          .intro-screen {
            transition: none !important;
          }
        }
      `}</style>

      {showIntro && (
        <div className={`intro-screen ${introExit ? "exit" : ""}`}>
          <div className="intro-logo-wrap">
            <div className="intro-ring" />
            <h1 className="intro-title tracking-[-0.05em]">Sahaay</h1>
            <div className="intro-accent" />
          </div>
        </div>
      )}

      {!showIntro && (
        <div className="page-shell">
          {/* BACKGROUND ORBS */}
          <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
            <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
          </div>

          {/* NAVBAR */}
          <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-200/60 bg-white/85 backdrop-blur-xl shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-emerald-400/10">
                  <img src="/sahaay.png" alt="Sahaay Logo" className="h-full w-full object-contain p-1" />
                </div>
                <div>
                  <h1 className="font-['Satoshi'] text-xl font-black tracking-[-0.03em] text-slate-900">
                    Sahaay
                  </h1>
                  <p className="text-xs font-medium text-emerald-700">
                    Smart NGO × Volunteer Response
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-8 md:flex">
                <a href="#impact" className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition">
                  Impact
                </a>
                <a href="#dashboard" className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition">
                  Dashboard
                </a>
                <a href="#journeys" className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition">
                  For You
                </a>
                <a href="#how" className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition">
                  How It Works
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/volunteer")}
                  className="hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 sm:inline-flex transition shadow-sm"
                >
                  Volunteer Login
                </button>
                <button
                  onClick={() => navigate("/ngo")}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-400/25 hover:scale-[1.02] transition"
                >
                  NGO Login
                </button>
              </div>
            </nav>
          </header>

          <main>
            {/* HERO */}
            <section className="relative min-h-screen overflow-hidden pt-24">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 cinematic-image"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-vector/global-volunteer-solidarity-hands-up-banner-with-earth-map-vector_1017-48268.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.10),transparent_28%)]" />

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
                <div className="hero-reveal mb-6 rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-wider text-white/60 backdrop-blur-sm">
                  REAL-TIME NGO & VOLUNTEER COORDINATION
                </div>

                <div className="hero-reveal-delay mb-8 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl">
                    <img src="/sahaay.png" alt="Sahaay Logo" className="h-full w-full object-contain p-2" />
                  </div>
                  <h1 className="hero-title">
                    <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]">
                      Sahaay
                    </span>
                  </h1>
                </div>

                <h2 className="hero-reveal-delay max-w-3xl text-2xl sm:text-3xl font-medium leading-snug text-white">
                  Help arrives faster when people
                  <span className="block text-white/75">
                    move together.
                  </span>
                </h2>

                <p className="hero-reveal-delay mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white/70">
                  A smart platform connecting NGO needs with volunteers —
                  making coordination faster, smoother, and more effective.
                </p>

                <div className="hero-reveal-delay mt-10 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => navigate("/register-volunteer")}
                    className="group rounded-xl bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Join as Volunteer
                  </button>

                  <button
                    onClick={() => navigate("/register-ngo")}
                    className="rounded-xl border border-white/30 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                  >
                    Join as NGO
                  </button>
                </div>
              </div>
            </section>

            {/* MOVING TRUST STRIP */}
            <section className="border-y border-emerald-200/50 bg-white/70 backdrop-blur-xl">
              <div className="overflow-hidden py-4">
                <div className="marquee-track flex w-[200%] gap-6 whitespace-nowrap">
                  <div className="flex min-w-max gap-6">
                    {[
                      { label: "Verified Volunteers", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "NGO Requests", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Location-Based Matching", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Real-Time Dashboard", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "Skill-Based Coordination", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Impact Tracking", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Emergency Support", style: "bg-rose-50 text-rose-700 border-rose-200" },
                      { label: "Verified Volunteers", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "NGO Requests", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Location-Based Matching", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Real-Time Dashboard", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    ].map((item, index) => (
                      <div
                        key={`first-${index}`}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${item.style}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex min-w-max gap-6">
                    {[
                      { label: "Verified Volunteers", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "NGO Requests", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Location-Based Matching", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Real-Time Dashboard", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "Skill-Based Coordination", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Impact Tracking", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Emergency Support", style: "bg-rose-50 text-rose-700 border-rose-200" },
                      { label: "Verified Volunteers", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { label: "NGO Requests", style: "bg-sky-50 text-sky-700 border-sky-200" },
                      { label: "Location-Based Matching", style: "bg-amber-50 text-amber-700 border-amber-200" },
                      { label: "Real-Time Dashboard", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    ].map((item, index) => (
                      <div
                        key={`second-${index}`}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${item.style}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* DASHBOARD */}
            <section id="dashboard" className="section-reveal mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <div className="mb-12 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Live coordination
                </p>
                <h2 className="mt-3 font-['Satoshi'] text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  A dashboard ready for live data
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-500">
                  Connect your backend later and populate this area with NGO requests,
                  volunteer matches, assignments, and analytics.
                </p>
              </div>

              <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="cinematic-card rounded-[2rem] border border-emerald-200/50 bg-white/75 p-6 backdrop-blur-xl shadow-xl">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        Dashboard Preview
                      </p>
                      <h3 className="mt-2 font-['Satoshi'] text-2xl font-black tracking-[-0.03em] text-slate-900">
                        Real-time data will appear here
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                      <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500 ping-soft" />
                      Ready for Firebase
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        value: "--",
                        label: "Metric 01",
                        color: "from-emerald-100 to-emerald-50",
                      },
                      {
                        value: "--",
                        label: "Metric 02",
                        color: "from-amber-100 to-amber-50",
                      },
                      {
                        value: "--",
                        label: "Metric 03",
                        color: "from-sky-100 to-sky-50",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`rounded-3xl border border-emerald-200/50 bg-gradient-to-br ${item.color} p-5 hover-lift`}
                      >
                        <p className="text-4xl font-black text-slate-900 tabular-nums">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-700">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4">
                    {[
                      { title: "Task title", progress: "0%" },
                      { title: "Task title", progress: "0%" },
                      { title: "Task title", progress: "0%" },
                    ].map((task, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-4 hover-lift"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-slate-900">{task.title}</p>
                          <span className="text-sm font-semibold text-emerald-600">
                            {task.progress}
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-200/60">
                          <div
                            className="shimmer-bar h-full rounded-full"
                            style={{ width: task.progress }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-emerald-200/50 bg-emerald-50 p-5 hover-lift">
                      <p className="text-sm font-medium text-slate-600">Response Metric</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">--</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Connect live data to display response trends.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-emerald-200/50 bg-emerald-50 p-5 hover-lift">
                      <p className="text-sm font-medium text-slate-600">Matching Metric</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">--</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Populate this card using your backend logic.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cinematic-card rounded-[2rem] border border-emerald-200/50 bg-white/85 p-6 shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                    Recent Activity
                  </p>

                  <div className="mt-6 rounded-3xl border border-dashed border-emerald-200/40 bg-emerald-50/30 p-8 text-center">
                    <p className="text-lg font-semibold text-slate-900">No activity yet</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Recent volunteer actions, NGO requests, and updates can appear
                      here after Firebase integration is connected.
                    </p>
                  </div>

                  <div className="mt-6 rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 p-5 hover-lift">
                    <p className="text-sm font-medium text-slate-700">Live Needs Map</p>
                    <div className="relative mt-4 h-52 overflow-hidden rounded-2xl border border-emerald-200/50">
                      <MapContainer
                        center={[23.5937, 78.9629]}
                        zoom={4}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                        dragging={false}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution=""
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
                            />
                          );
                        })}
                      </MapContainer>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* USER JOURNEYS */}
            <section id="journeys" className="section-reveal mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Built for every helper
                </p>
                <h2 className="mt-3 font-['Satoshi'] text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  One platform, two clear journeys
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  The interface is structured so both NGOs and volunteers can quickly
                  understand where to go next.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="cinematic-card rounded-[2rem] border border-emerald-300/50 bg-emerald-50/80 p-8 shadow-lg">
                  <div className="mb-5 inline-flex rounded-2xl bg-emerald-200/60 px-4 py-2 text-sm font-semibold text-emerald-800">
                    For Volunteers
                  </div>
                  <h3 className="font-['Satoshi'] text-2xl font-black tracking-[-0.03em] text-slate-900">
                    Join and respond with clarity
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    A simple path for volunteers to register, explore needs, and
                    participate in meaningful work.
                  </p>
                  <ul className="mt-6 space-y-3 text-slate-700">
                    <li>• Sign up and create a profile</li>
                    <li>• View NGO requests</li>
                    <li>• Get matched to opportunities</li>
                    <li>• Track tasks and updates</li>
                  </ul>
                  <button
                    onClick={() => navigate("/register-volunteer")}
                    className="mt-8 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition hover-lift"
                  >
                    Become a Volunteer
                  </button>
                </div>

                <div className="cinematic-card rounded-[2rem] border border-amber-300/50 bg-amber-50/80 p-8 shadow-lg">
                  <div className="mb-5 inline-flex rounded-2xl bg-amber-200/60 px-4 py-2 text-sm font-semibold text-amber-800">
                    For NGOs
                  </div>
                  <h3 className="font-['Satoshi'] text-2xl font-black tracking-[-0.03em] text-slate-900">
                    Manage requests from one place
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    A clean workflow for NGOs to post needs, organize assignments,
                    and review activity in one dashboard.
                  </p>
                  <ul className="mt-6 space-y-3 text-slate-700">
                    <li>• Post new requests</li>
                    <li>• Review volunteer matches</li>
                    <li>• Update request status</li>
                    <li>• Monitor activity and outcomes</li>
                  </ul>
                  <button
                    onClick={() => navigate("/register-ngo")}
                    className="mt-8 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition hover-lift"
                  >
                    Register Your NGO
                  </button>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <style>{`
                @keyframes stepFadeUp {
                  0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.96);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }

                @keyframes stepGlow {
                  0%, 100% {
                    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.10);
                  }
                  50% {
                    box-shadow: 0 18px 40px rgba(16, 185, 129, 0.20);
                  }
                }

                @keyframes numberPulse {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.08);
                  }
                }

                .steps-card-center {
                  max-width: 860px;
                  margin-inline: auto;
                }

                .step-item {
                  opacity: 0;
                  animation: stepFadeUp 0.8s ease-out forwards;
                  transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
                }

                .step-item:nth-child(1) {
                  animation-delay: 0.25s;
                }

                .step-item:nth-child(2) {
                  animation-delay: 0.65s;
                }

                .step-item:nth-child(3) {
                  animation-delay: 1.05s;
                }

                .step-item:hover {
                  transform: translateY(-6px);
                  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.10);
                  background: rgba(255, 255, 255, 0.92);
                }

                .step-badge {
                  animation: numberPulse 2.4s ease-in-out infinite;
                  box-shadow: 0 10px 20px rgba(34, 197, 94, 0.22);
                }

                .step-item:hover .step-badge {
                  animation: numberPulse 1s ease-in-out infinite, stepGlow 1.8s ease-in-out infinite;
                }

                .step-image {
                  opacity: 0;
                  transform: translateY(28px);
                  animation: stepFadeUp 0.9s ease-out 1.35s forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                  .step-item,
                  .step-badge,
                  .step-image {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }

                  .step-item:hover {
                    transform: none;
                  }
                }
              `}</style>

              <div className="steps-card-center rounded-[2rem] border border-emerald-200/50 bg-white/85 p-8 shadow-xl backdrop-blur-xl lg:p-10">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                    JOIN NOW!
                  </p>

                  <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                    Three steps to simple coordination
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-7">
                    A clean and guided flow for volunteers and NGOs to connect, respond,
                    and coordinate smoothly through Sahaay.
                  </p>
                </div>

                <div className="mt-12 space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Create an account",
                      desc: "Sign up as a volunteer or NGO to access the platform.",
                    },
                    {
                      step: "02",
                      title: "Add or explore requests",
                      desc: "NGOs can post needs and volunteers can browse opportunities.",
                    },
                    {
                      step: "03",
                      title: "Coordinate through the dashboard",
                      desc: "Manage updates, assignments, and information in one place.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="step-item flex items-start gap-4 rounded-[1.5rem] border border-emerald-200/50 bg-emerald-50/55 px-5 py-5 sm:px-6"
                    >
                      <div className="step-badge flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 font-bold text-white">
                        {item.step}
                      </div>

                      <div className="pt-1 text-left">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900 sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="step-image mt-10 overflow-hidden rounded-[1.75rem] border border-emerald-200/50 bg-white/70">
                  <img
                    src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvay0yNi1hb20tMTkzNzktb2xqMDEyN3dvcmQtMS12b2x1bnRlZXJfMi5qcGc.jpg"
                    alt="Volunteers working together"
                    className="cinematic-image h-72 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="border-t border-emerald-200/50 bg-emerald-50 px-5 py-4 text-center">
                    <p className="text-sm font-medium text-slate-900 sm:text-base">
                      Better teamwork starts with clearer coordination
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Sahaay brings volunteers and NGOs into one connected workflow.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHY SAHAAY STANDS OUT */}
            <section id="why-sahaay" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <style>{`
                @keyframes whyFadeUp {
                  0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.97);
                    filter: blur(8px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                  }
                }

                @keyframes whyFloatGlow {
                  0%, 100% {
                    transform: scale(1) translateY(0);
                    opacity: 0.55;
                  }
                  50% {
                    transform: scale(1.06) translateY(-8px);
                    opacity: 0.95;
                  }
                }

                @keyframes whyShimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }

                .why-wrap {
                  position: relative;
                  overflow: hidden;
                  border-radius: 2rem;
                  border: 1px solid rgba(16, 185, 129, 0.14);
                  background:
                    radial-gradient(circle at top left, rgba(34,197,94,0.16), transparent 28%),
                    radial-gradient(circle at bottom right, rgba(56,189,248,0.16), transparent 30%),
                    linear-gradient(135deg, rgba(255,255,255,0.72), rgba(236,253,245,0.92), rgba(239,246,255,0.88));
                  backdrop-filter: blur(18px);
                  box-shadow:
                    0 18px 60px rgba(16, 24, 40, 0.08),
                    inset 0 1px 0 rgba(255,255,255,0.45);
                }

                .why-wrap::before,
                .why-wrap::after {
                  content: "";
                  position: absolute;
                  border-radius: 9999px;
                  filter: blur(28px);
                  pointer-events: none;
                }

                .why-wrap::before {
                  top: -4rem;
                  left: -4rem;
                  width: 14rem;
                  height: 14rem;
                  background: rgba(34,197,94,0.18);
                  animation: whyFloatGlow 5s ease-in-out infinite;
                }

                .why-wrap::after {
                  right: -3rem;
                  bottom: -3rem;
                  width: 12rem;
                  height: 12rem;
                  background: rgba(56,189,248,0.16);
                  animation: whyFloatGlow 6s ease-in-out infinite reverse;
                }

                .why-heading,
                .why-copy,
                .why-feature {
                  opacity: 0;
                  animation: whyFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .why-feature {
                  position: relative;
                  overflow: hidden;
                  border: 1px solid rgba(16, 185, 129, 0.12);
                  background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.38));
                  backdrop-filter: blur(14px);
                  box-shadow:
                    inset 0 1px 0 rgba(255,255,255,0.38),
                    0 12px 28px rgba(15, 23, 42, 0.06);
                  transition:
                    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 280ms cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 280ms cubic-bezier(0.16, 1, 0.3, 1),
                    background 280ms cubic-bezier(0.16, 1, 0.3, 1);
                }

                .why-feature::after {
                  content: "";
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(
                    120deg,
                    transparent 0%,
                    rgba(255,255,255,0.18) 30%,
                    rgba(255,255,255,0.42) 50%,
                    transparent 72%
                  );
                  background-size: 200% 100%;
                  opacity: 0;
                  transition: opacity 280ms ease;
                }

                .why-feature:hover {
                  transform: translateY(-6px);
                  border-color: rgba(16, 185, 129, 0.24);
                  background: linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.48));
                  box-shadow:
                    inset 0 1px 0 rgba(255,255,255,0.48),
                    0 18px 36px rgba(15, 23, 42, 0.10);
                }

                .why-feature:hover::after {
                  opacity: 1;
                  animation: whyShimmer 1.6s linear infinite;
                }

                .why-icon {
                  box-shadow:
                    inset 0 1px 0 rgba(255,255,255,0.45),
                    0 10px 24px rgba(15, 23, 42, 0.08);
                }

                @media (prefers-reduced-motion: reduce) {
                  .why-wrap::before,
                  .why-wrap::after,
                  .why-heading,
                  .why-copy,
                  .why-feature,
                  .why-feature:hover::after {
                    animation: none !important;
                  }

                  .why-heading,
                  .why-copy,
                  .why-feature {
                    opacity: 1 !important;
                  }

                  .why-feature:hover {
                    transform: none;
                  }
                }
              `}</style>

              <div className="why-wrap px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="max-w-3xl">
                  <p
                    className="why-heading text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600"
                    style={{ animationDelay: "0.05s" }}
                  >
                    Why Sahaay Stands Out
                  </p>

                  <h2
                    className="why-heading mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl"
                    style={{ animationDelay: "0.12s" }}
                  >
                    Built for real impact,
                    <span className="block bg-gradient-to-r from-emerald-500 via-lime-500 to-sky-500 bg-clip-text text-transparent">
                      powered by smart technology
                    </span>
                  </h2>

                  <p
                    className="why-copy mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Connect NGOs and volunteers through intelligent matching, real-time coordination,
                    and scalable infrastructure for fast, reliable response.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    {
                      icon: "⚡",
                      title: "Real-Time Matching",
                      desc: "Instantly connects needs with best-fit volunteers",
                      tint: "from-emerald-100 to-green-50",
                      iconColor: "text-emerald-600",
                      delay: "0.28s",
                    },
                    {
                      icon: "📍",
                      title: "Location-Based Allocation",
                      desc: "Matches based on proximity for faster response",
                      tint: "from-rose-100 to-pink-50",
                      iconColor: "text-rose-500",
                      delay: "0.38s",
                    },
                    {
                      icon: "🧠",
                      title: "AI-Powered Decisions",
                      desc: "Smart prioritization using urgency and skill data",
                      tint: "from-fuchsia-100 to-violet-50",
                      iconColor: "text-fuchsia-500",
                      delay: "0.48s",
                    },
                    {
                      icon: "🔄",
                      title: "Live Task Tracking",
                      desc: "Monitor assignments and status updates in real time",
                      tint: "from-sky-100 to-blue-50",
                      iconColor: "text-sky-500",
                      delay: "0.58s",
                    },
                    {
                      icon: "👥",
                      title: "Verified Volunteers",
                      desc: "Reliable, skill-based onboarding for trusted participation",
                      tint: "from-purple-100 to-indigo-50",
                      iconColor: "text-purple-500",
                      delay: "0.68s",
                    },
                    {
                      icon: "☁️",
                      title: "Heatmap Analysis",
                      desc: "Highlights areas with greater volunteer need",
                      tint: "from-slate-100 to-white",
                      iconColor: "text-slate-500",
                      delay: "0.78s",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="why-feature rounded-[1.6rem] p-5 sm:p-6"
                      style={{ animationDelay: item.delay }}
                    >
                      <div
                        className={`why-icon mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tint} ${item.iconColor} text-xl`}
                      >
                        <span>{item.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
              <div className="cinematic-card rounded-[2.5rem] border border-emerald-200/50 bg-gradient-to-r from-emerald-50 via-green-50 to-sky-50 p-10 text-center shadow-xl md:p-14">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                  BUILDING A BETTER TOMORROW
                </p>
                <h2 className="mx-auto mt-4 max-w-3xl font-['Satoshi'] text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  Connect. Contribute. Create Impact—Faster.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-700">
                  Join a growing network where NGOs and volunteers collaborate seamlessly.
                  Post or discover tasks, and let our intelligent matching system connect
                  the right people to the right causes.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => navigate("/register-volunteer")}
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-semibold text-white shadow-xl shadow-emerald-400/25 hover:-translate-y-1 transition hover-lift"
                  >
                    Join as Volunteer
                  </button>
                  <button
                    onClick={() => navigate("/register-ngo")}
                    className="rounded-2xl border border-emerald-300 bg-white px-8 py-4 font-semibold text-emerald-800 hover:bg-emerald-50 hover:-translate-y-1 transition hover-lift"
                  >
                    Join as NGO
                  </button>
                </div>
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer className="border-t border-emerald-200/50 bg-white/80 px-6 py-8 text-center text-sm font-medium text-slate-600">
            Built for NGO and volunteer coordination • Team Sahaay
          </footer>

          {/* MODAL */}
          {openModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
              <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-emerald-200/50 bg-white/95 shadow-2xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-sky-500" />

                <div className="p-8">
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-sky-500 shadow-lg shadow-emerald-400/30">
                      <span className="text-2xl font-black text-white">
                        {role === "ngo" ? "N" : "V"}
                      </span>
                    </div>

                    <h2 className="font-['Satoshi'] text-2xl font-black tracking-[-0.03em] text-slate-900">
                      {isLogin ? "Welcome back" : "Create account"} as{" "}
                      {role === "ngo" ? "NGO" : "Volunteer"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Access your account and continue on the platform.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      />
                    </div>

                    <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-sky-500 py-3 font-semibold text-white shadow-lg shadow-emerald-400/25 hover:opacity-95 transition hover-lift">
                      {isLogin ? "Login" : "Create Account"}
                    </button>
                  </div>

                  <p className="mt-5 text-center text-sm text-slate-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>

                  <button
                    onClick={() => setOpenModal(false)}
                    className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}