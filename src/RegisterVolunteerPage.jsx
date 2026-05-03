import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const STATE_OPTIONS = [
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal_pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west_bengal" },
  { label: "Jharkhand", value: "jharkhand_duplicate" },
].filter((item, index, arr) => arr.findIndex((x) => x.label === item.label) === index);


const SKILL_OPTIONS = [
  { label: "Teaching", value: "teaching" },
  { label: "Medical Help", value: "medical_help" },
  { label: "Food Distribution", value: "food_distribution" },
  { label: "Logistics / Transport", value: "logistics" },
  { label: "Event Management", value: "event_management" },
  { label: "Fundraising", value: "fundraising" },
  { label: "Tech Support", value: "tech_support" },
];


const TRAVEL_OPTIONS = [
  { label: "Yes (within city)", value: "within_city" },
  { label: "Yes (intercity)", value: "intercity" },
  { label: "No (only local)", value: "local_only" },
];


const DAY_OPTIONS = [
  { label: "Weekdays", value: "weekdays" },
  { label: "Weekends", value: "weekends" },
];


const TIME_OPTIONS = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
];


const EXPERIENCE_OPTIONS = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Experienced", value: "experienced" },
];


const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  state: "",
  district: "",
  areaPincode: "",
  skills: [],
  canTravel: "",
  remoteAvailable: "",
  availabilityDays: [],
  availabilityTimeSlots: [],
  calendarNotes: "",
  experienceLevel: "",
  previousVolunteering: "",
  projectCount: "",
  urgentAvailable: "",
  cvFile: null,
};


export default function RegisterVolunteerPage() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const selectedSkillLabels = useMemo(() => {
    return SKILL_OPTIONS.filter((skill) =>
      formData.skills.includes(skill.value)
    ).map((skill) => skill.label);
  }, [formData.skills]);


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));


    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };


  const handleArrayToggle = (field, value) => {
    setFormData((prev) => {
      const currentValues = prev[field];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];


      return {
        ...prev,
        [field]: nextValues,
      };
    });


    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };


  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    handleChange("cvFile", file);
  };


  const validateForm = () => {
    const newErrors = {};


    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";
    if (formData.skills.length === 0) newErrors.skills = "Select at least one skill.";
    if (!formData.canTravel) newErrors.canTravel = "Please choose a travel option.";
    if (!formData.remoteAvailable) newErrors.remoteAvailable = "Please select remote availability.";
    if (formData.availabilityDays.length === 0) {
      newErrors.availabilityDays = "Select at least one availability day option.";
    }
    if (formData.availabilityTimeSlots.length === 0) {
      newErrors.availabilityTimeSlots = "Select at least one time slot.";
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Please select an experience level.";
    }
    if (!formData.previousVolunteering) {
      newErrors.previousVolunteering = "Please tell us if you have volunteered before.";
    }
    if (
      formData.previousVolunteering === "yes" &&
      !String(formData.projectCount).trim()
    ) {
      newErrors.projectCount = "Please enter the number of projects.";
    }
    if (!formData.urgentAvailable) {
      newErrors.urgentAvailable = "Please select urgent task availability.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const buildPayload = () => {
    return {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age ? Number(formData.age) : null,
      state: formData.state,
      district: formData.district.trim(),
      areaPincode: formData.areaPincode.trim(),
      skills: formData.skills,
      canTravel: formData.canTravel,
      remoteAvailable: formData.remoteAvailable === "yes",
      availability: {
        days: formData.availabilityDays,
        timeSlots: formData.availabilityTimeSlots,
        calendarNotes: formData.calendarNotes.trim(),
      },
      experienceLevel: formData.experienceLevel,
      previousVolunteering: formData.previousVolunteering === "yes",
      projectCount:
        formData.previousVolunteering === "yes" && formData.projectCount
          ? Number(formData.projectCount)
          : 0,
      urgentAvailable: formData.urgentAvailable === "yes",
      cvFileName: formData.cvFile ? formData.cvFile.name : null,
    };
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const skillMapping = {
      teaching: "teaching",
      medical_help: "first_aid",
      food_distribution: "cooking",
      logistics: "driving",
      event_management: "manual_labor",
      fundraising: "fundraising",
      tech_support: "tech_support",
    };

    const canonicalSkills = formData.skills.map(s => skillMapping[s] || s);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age ? Number(formData.age) : 18,
      state: formData.state,
      city: formData.district.trim(),
      skills: canonicalSkills,
    };

    try {
      const response = await fetch("https://sahaay-923054627985.asia-south1.run.app/volunteer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.status === "success" || response.ok) {
        setSubmitted(true);
        setTimeout(() => navigate("/volunteer"), 1800);
      } else {
        alert("Registration failed: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to connect to server. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');


        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }


        .volunteer-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          animation: pageEnter 0.7s ease-out both;
        }


        .brand-heading {
          font-family: 'Satoshi', sans-serif;
        }


        .soft-grid {
          background-image:
            linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }


        .hero-glow {
          animation: glowPulse 4s ease-in-out infinite;
        }


        .glass-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }


        .field-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(248, 250, 252, 0.9);
          padding: 0.9rem 1rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }


        .field-input::placeholder {
          color: #94a3b8;
        }


        .field-input:focus {
          border-color: rgba(16, 185, 129, 0.65);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
          transform: translateY(-1px);
        }


        .option-chip {
          border: 1px solid rgba(16, 185, 129, 0.16);
          background: rgba(255, 255, 255, 0.85);
          color: #334155;
          transition: all 0.25s ease;
        }


        .option-chip:hover {
          border-color: rgba(16, 185, 129, 0.38);
          background: rgba(236, 253, 245, 0.95);
          transform: translateY(-1px);
        }


        .option-chip.active {
          border-color: rgba(16, 185, 129, 0.55);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(56, 189, 248, 0.12));
          color: #065f46;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.10);
        }


        .radio-card {
          border: 1px solid rgba(16, 185, 129, 0.14);
          background: rgba(255, 255, 255, 0.85);
          transition: all 0.25s ease;
        }


        .radio-card:hover {
          transform: translateY(-2px);
          border-color: rgba(16, 185, 129, 0.32);
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
        }


        .radio-card.active {
          border-color: rgba(16, 185, 129, 0.55);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(125, 211, 252, 0.12));
          box-shadow: 0 18px 42px rgba(16, 185, 129, 0.12);
        }


        .section-badge {
          letter-spacing: 0.22em;
        }


        @media (prefers-reduced-motion: reduce) {
          .volunteer-page,
          .hero-glow,
          .field-input,
          .option-chip,
          .radio-card {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>


      <div className="volunteer-page relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 soft-grid opacity-60" />
        <div className="pointer-events-none absolute left-[-5rem] top-16 -z-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl hero-glow" />
        <div className="pointer-events-none absolute right-[-4rem] top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl hero-glow" />
        <div className="pointer-events-none absolute bottom-[-6rem] left-1/3 -z-10 h-80 w-80 rounded-full bg-lime-200/20 blur-3xl hero-glow" />


        <header className="sticky top-0 z-40 border-b border-emerald-200/50 bg-white/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-10">
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <img src="/sahaay.png" alt="Sahaay Logo" className="h-12 w-12 object-contain" />
              <div className="text-left">
                <h1 className="brand-heading text-xl font-black tracking-[-0.03em] text-slate-900">
                  Sahaay
                </h1>
                <p className="text-xs font-medium text-emerald-700">
                  Volunteer Registration
                </p>
              </div>
            </button>
          </div>
        </header>


        <main className="mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-14">
          <section className="glass-card rounded-[2rem] border border-white/60 p-6 shadow-2xl shadow-emerald-100/40 sm:p-8 lg:p-10">
            <div className="mb-10 text-center">
              <p className="text-2xl font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Volunteer Registration Form
              </p>
              <h2 className="brand-heading mt-3 text-xs font-black tracking-[-0.05em] text-slate-900 sm:text-3xl">
                Build your volunteer profile
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-s leading-6 text-slate-600 sm:text-sm">
                Add your details below. Keep it accurate so NGOs can reach you quickly and Sahaay can recommend suitable work.
              </p>
            </div>


            {submitted && (
              <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-emerald-800">
                Registration submitted successfully. Redirecting to volunteer page...
              </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    1. Basic Details
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Simple and essential information
                  </h3>
                </div>


                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-rose-600">{errors.fullName}</p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-rose-600">{errors.email}</p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="field-input"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-rose-600">{errors.phone}</p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Age
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="field-input"
                      placeholder="Optional"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                    />
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      State *
                    </label>
                    <select
                      className="field-input"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                    >
                      <option value="">Select state</option>
                      {STATE_OPTIONS.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-2 text-sm text-rose-600">{errors.state}</p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      District *
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Enter district"
                      value={formData.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                    />
                    {errors.district && (
                      <p className="mt-2 text-sm text-rose-600">{errors.district}</p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Area / Pincode
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Enter area or pincode"
                      value={formData.areaPincode}
                      onChange={(e) => handleChange("areaPincode", e.target.value)}
                    />
                  </div>
                </div>
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    2. Skills
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Select the skills you can contribute
                  </h3>
                </div>


                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {SKILL_OPTIONS.map((skill) => {
                    const active = formData.skills.includes(skill.value);


                    return (
                      <button
                        key={skill.value}
                        type="button"
                        onClick={() => handleArrayToggle("skills", skill.value)}
                        className={`option-chip rounded-2xl px-4 py-4 text-left ${active ? "active" : ""}`}
                        aria-pressed={active}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold">{skill.label}</span>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${active
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-500"
                              }`}
                          >
                            {active ? "✓" : "+"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>


                {errors.skills && (
                  <p className="mt-3 text-sm text-rose-600">{errors.skills}</p>
                )}
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    3. Mobility
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Help us match nearby and travel-ready volunteers
                  </h3>
                </div>


                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Can travel? *
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {TRAVEL_OPTIONS.map((option) => {
                      const active = formData.canTravel === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleChange("canTravel", option.value)}
                          className={`radio-card rounded-2xl p-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <p className="font-semibold text-slate-800">{option.label}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.canTravel && (
                    <p className="mt-3 text-sm text-rose-600">{errors.canTravel}</p>
                  )}
                </div>


                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Remote availability? *
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["yes", "no"].map((value) => {
                      const active = formData.remoteAvailable === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleChange("remoteAvailable", value)}
                          className={`radio-card rounded-2xl p-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <p className="font-semibold capitalize text-slate-800">{value}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.remoteAvailable && (
                    <p className="mt-3 text-sm text-rose-600">{errors.remoteAvailable}</p>
                  )}
                </div>
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    4. Availability
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    For better allocation
                  </h3>
                </div>


                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Available on *
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {DAY_OPTIONS.map((option) => {
                      const active = formData.availabilityDays.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleArrayToggle("availabilityDays", option.value)
                          }
                          className={`option-chip rounded-2xl px-4 py-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-sm">{active ? "✓" : "○"}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.availabilityDays && (
                    <p className="mt-3 text-sm text-rose-600">{errors.availabilityDays}</p>
                  )}
                </div>


                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Time slots *
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {TIME_OPTIONS.map((option) => {
                      const active = formData.availabilityTimeSlots.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleArrayToggle("availabilityTimeSlots", option.value)
                          }
                          className={`option-chip rounded-2xl px-4 py-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-sm">{active ? "✓" : "○"}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.availabilityTimeSlots && (
                    <p className="mt-3 text-sm text-rose-600">
                      {errors.availabilityTimeSlots}
                    </p>
                  )}
                </div>


                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Calendar / Additional availability notes
                  </label>
                  <textarea
                    rows="4"
                    className="field-input resize-none"
                    placeholder="Optional: mention exact dates, shifts, exam schedule, office hours, or preferred volunteering windows"
                    value={formData.calendarNotes}
                    onChange={(e) => handleChange("calendarNotes", e.target.value)}
                  />
                </div>
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    5. Experience
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Tell us about your volunteering background
                  </h3>
                </div>


                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Experience Level *
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {EXPERIENCE_OPTIONS.map((option) => {
                      const active = formData.experienceLevel === option.value;


                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleChange("experienceLevel", option.value)}
                          className={`radio-card rounded-2xl p-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <p className="font-semibold text-slate-800">{option.label}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.experienceLevel && (
                    <p className="mt-3 text-sm text-rose-600">{errors.experienceLevel}</p>
                  )}
                </div>


                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Previous volunteering? *
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["yes", "no"].map((value) => {
                      const active = formData.previousVolunteering === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleChange("previousVolunteering", value)}
                          className={`radio-card rounded-2xl p-4 text-left ${active ? "active" : ""}`}
                          aria-pressed={active}
                        >
                          <p className="font-semibold capitalize text-slate-800">{value}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.previousVolunteering && (
                    <p className="mt-3 text-sm text-rose-600">
                      {errors.previousVolunteering}
                    </p>
                  )}
                </div>


                {formData.previousVolunteering === "yes" && (
                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Number of projects
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="field-input"
                      placeholder="Enter number of completed projects"
                      value={formData.projectCount}
                      onChange={(e) => handleChange("projectCount", e.target.value)}
                    />
                    {errors.projectCount && (
                      <p className="mt-2 text-sm text-rose-600">{errors.projectCount}</p>
                    )}
                  </div>
                )}
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    6. Emergency Availability
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Are you available for urgent tasks?
                  </h3>
                </div>


                <div className="grid gap-4 sm:grid-cols-2">
                  {["yes", "no"].map((value) => {
                    const active = formData.urgentAvailable === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleChange("urgentAvailable", value)}
                        className={`radio-card rounded-2xl p-4 text-left ${active ? "active" : ""}`}
                        aria-pressed={active}
                      >
                        <p className="font-semibold capitalize text-slate-800">{value}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {value === "yes"
                            ? "Useful for high-priority and real-time allocation"
                            : "You will only receive standard requests"}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {errors.urgentAvailable && (
                  <p className="mt-3 text-sm text-rose-600">{errors.urgentAvailable}</p>
                )}
              </div>


              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    7.CV Upload
                  </p>
                  <h3 className="mt-2 text-l font-bold text-slate-900">
                    Upload your CV or profile document
                  </h3>
                  <p className="mt-2 text-xs text-slate-600">
                    Optional
                  </p>
                </div>


                <div className="rounded-[1.5rem] border border-dashed border-emerald-300 bg-emerald-50/60 p-6">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-emerald-600"
                  />
                  <p className="mt-3 text-sm text-slate-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>


                  {formData.cvFile && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-700">
                      Selected file: <span className="font-semibold">{formData.cvFile.name}</span>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex flex-col gap-4 border-t border-emerald-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-slate-500">
                  By registering, you create a volunteer profile that can later be matched against NGO needs based on skills, time, and location.
                </p>


                <div className="flex flex-wrap gap-3">

                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-sky-500 px-7 py-3 font-semibold text-white shadow-xl shadow-emerald-400/20 transition hover:-translate-y-1"
                  >
                    Register as Volunteer
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}