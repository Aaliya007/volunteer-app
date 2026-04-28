// src/pages/RegisterNgoPage.jsx
import { useMemo, useState } from "react";

export default function RegisterNgoPage() {
  const [formData, setFormData] = useState({
    ngoName: "",
    aliases: "",
    cert12A80G: "",
    nitiDarpanId: "",
    societyTrustNumber: "",
    operatingState: "",
    operatingDistricts: [""],
    primaryName: "",
    primaryPhone: "",
    primaryEmail: "",
    reference1Name: "",
    reference1Org: "",
    reference1Phone: "",
    reference2Name: "",
    reference2Org: "",
    reference2Phone: "",
    agreeDeclaration: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const stateOptions = useMemo(
    () => [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    []
  );

  const verificationStatus = "Pending";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDistrictChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.operatingDistricts];
      updated[index] = value;
      return { ...prev, operatingDistricts: updated };
    });
  };

  const addDistrictField = () => {
    setFormData((prev) => ({
      ...prev,
      operatingDistricts: [...prev.operatingDistricts, ""],
    }));
  };

  const removeDistrictField = (index) => {
    setFormData((prev) => ({
      ...prev,
      operatingDistricts: prev.operatingDistricts.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.ngoName.trim()) nextErrors.ngoName = "NGO name is required.";
    if (!formData.operatingState.trim())
      nextErrors.operatingState = "Operating state is required.";
    if (formData.operatingDistricts.every((d) => !d.trim())) {
      nextErrors.operatingDistricts = "Add at least one operating district.";
    }
    if (!formData.primaryName.trim())
      nextErrors.primaryName = "Primary contact name is required.";
    if (!formData.primaryPhone.trim())
      nextErrors.primaryPhone = "Primary contact phone is required.";
    if (!formData.primaryEmail.trim())
      nextErrors.primaryEmail = "Primary contact email is required.";

    const hasAtLeastOneRegistration =
      formData.cert12A80G.trim() ||
      formData.nitiDarpanId.trim() ||
      formData.societyTrustNumber.trim();

    if (!hasAtLeastOneRegistration) {
      nextErrors.registration =
        "Provide at least one registration number: 12A/80G, NITI Aayog Darpan ID, or Society/Trust registration number.";
    }

    if (!formData.reference1Phone.trim()) {
      nextErrors.reference1Phone = "First reference phone number is required.";
    }

    if (!formData.reference2Phone.trim()) {
      nextErrors.reference2Phone = "Second reference phone number is required.";
    }

    if (!formData.agreeDeclaration) {
      nextErrors.agreeDeclaration =
        "You must confirm that the submitted NGO information is accurate.";
    }

    return nextErrors;
  };

  const isFormReady =
    formData.ngoName.trim() &&
    formData.operatingState.trim() &&
    formData.operatingDistricts.some((d) => d.trim()) &&
    formData.primaryName.trim() &&
    formData.primaryPhone.trim() &&
    formData.primaryEmail.trim() &&
    (formData.cert12A80G.trim() ||
      formData.nitiDarpanId.trim() ||
      formData.societyTrustNumber.trim()) &&
    formData.reference1Phone.trim() &&
    formData.reference2Phone.trim() &&
    formData.agreeDeclaration;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const registrationType = formData.cert12A80G ? "12A/80G" :
      formData.nitiDarpanId ? "NITI_Darpan" : "Society_Trust";

    const registrationId = formData.cert12A80G ||
      formData.nitiDarpanId || formData.societyTrustNumber;

    const payload = {
      name: formData.ngoName.trim(),
      registrationType,
      registrationId,
      operatingRegion: `${formData.operatingState} - ${formData.operatingDistricts.filter(d => d.trim()).join(", ")}`,
      contactName: formData.primaryName.trim(),
      contactEmail: formData.primaryEmail.trim(),
      contactPhone: formData.primaryPhone.trim(),
      referencePhones: [
        formData.reference1Phone.trim(),
        formData.reference2Phone.trim(),
      ].filter(Boolean),
    };

    try {
      const response = await fetch("https://sahaay-923054627985.asia-south1.run.app/ngo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("NGO registration response:", result);

      if (result.status === "success" || response.ok) {
        setSubmitted(true);
      } else {
        alert("Registration failed: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error("NGO registration error:", err);
      alert("Failed to connect to server. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
  const helperClass = "mt-1 text-xs text-slate-500";
  const errorClass = "mt-2 text-sm text-rose-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-6rem] top-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute right-[-5rem] top-28 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-12 lg:px-10">
        <div className="w-full">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              NGO Onboarding and Approval
            </div>

            <h1 className="font-['Satoshi'] text-4xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl">
              Register my NGO
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Submit your NGO details for platform review. Your organization will be created with a verification status of{" "}
              <span className="font-semibold text-amber-700">pending</span>, and your needs will remain hidden until approval is completed.
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-emerald-200/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  NGO application form
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Enter organization and contact details
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                {verificationStatus}
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="rounded-[1.75rem] border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900">NGO identity</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Add your NGO name and any aliases commonly used in the field.
                  </p>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <label className={labelClass}>NGO name</label>
                      <input
                        name="ngoName"
                        value={formData.ngoName}
                        onChange={handleChange}
                        placeholder="Enter registered NGO name"
                        className={inputClass}
                      />
                      {errors.ngoName && <p className={errorClass}>{errors.ngoName}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Aliases / alternate names</label>
                      <input
                        name="aliases"
                        value={formData.aliases}
                        onChange={handleChange}
                        placeholder="Enter aliases separated by commas"
                        className={inputClass}
                      />
                      <p className={helperClass}>
                        Optional. Use only if your organization is known by other names.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-sky-200/60 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Registration and legal identifiers
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    At least one registration number is required for onboarding.
                  </p>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <label className={labelClass}>12A / 80G certificate number</label>
                      <input
                        name="cert12A80G"
                        value={formData.cert12A80G}
                        onChange={handleChange}
                        placeholder="Enter certificate number"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>NITI Aayog Darpan ID</label>
                      <input
                        name="nitiDarpanId"
                        value={formData.nitiDarpanId}
                        onChange={handleChange}
                        placeholder="Enter Darpan ID"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Society / Trust registration number
                      </label>
                      <input
                        name="societyTrustNumber"
                        value={formData.societyTrustNumber}
                        onChange={handleChange}
                        placeholder="Enter registration number"
                        className={inputClass}
                      />
                    </div>

                    {errors.registration && (
                      <p className={errorClass}>{errors.registration}</p>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900">Operating region</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Mention the state and manually type the districts where your NGO actively works.
                  </p>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <label className={labelClass}>State</label>
                      <select
                        name="operatingState"
                        value={formData.operatingState}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select state</option>
                        {stateOptions.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.operatingState && (
                        <p className={errorClass}>{errors.operatingState}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Districts</label>
                      <div className="space-y-3">
                        {formData.operatingDistricts.map((district, index) => (
                          <div key={index} className="flex gap-3">
                            <input
                              type="text"
                              value={district}
                              onChange={(e) =>
                                handleDistrictChange(index, e.target.value)
                              }
                              placeholder="Enter district name"
                              className={inputClass}
                            />
                            {formData.operatingDistricts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeDistrictField(index)}
                                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addDistrictField}
                        className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Add another district
                      </button>

                      {errors.operatingDistricts && (
                        <p className={errorClass}>{errors.operatingDistricts}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900">Reference contacts</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Add two reference contacts from prior donors or partner NGOs.
                  </p>

                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-amber-200 bg-white p-4">
                      <p className="mb-4 text-sm font-semibold text-amber-700">
                        Reference 1
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>Name</label>
                          <input
                            name="reference1Name"
                            value={formData.reference1Name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Organization</label>
                          <input
                            name="reference1Org"
                            value={formData.reference1Org}
                            onChange={handleChange}
                            placeholder="Enter organization"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Phone number</label>
                          <input
                            name="reference1Phone"
                            value={formData.reference1Phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={inputClass}
                          />
                          {errors.reference1Phone && (
                            <p className={errorClass}>{errors.reference1Phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-white p-4">
                      <p className="mb-4 text-sm font-semibold text-amber-700">
                        Reference 2
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>Name</label>
                          <input
                            name="reference2Name"
                            value={formData.reference2Name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Organization</label>
                          <input
                            name="reference2Org"
                            value={formData.reference2Org}
                            onChange={handleChange}
                            placeholder="Enter organization"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Phone number</label>
                          <input
                            name="reference2Phone"
                            value={formData.reference2Phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={inputClass}
                          />
                          {errors.reference2Phone && (
                            <p className={errorClass}>{errors.reference2Phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-sky-200/60 bg-gradient-to-br from-white to-sky-50 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900">Primary contact</h3>

                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <div>
                      <label className={labelClass}>Full name</label>
                      <input
                        name="primaryName"
                        value={formData.primaryName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={inputClass}
                      />
                      {errors.primaryName && <p className={errorClass}>{errors.primaryName}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Phone number</label>
                      <input
                        name="primaryPhone"
                        value={formData.primaryPhone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className={inputClass}
                      />
                      {errors.primaryPhone && <p className={errorClass}>{errors.primaryPhone}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Email address</label>
                      <input
                        name="primaryEmail"
                        type="email"
                        value={formData.primaryEmail}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className={inputClass}
                      />
                      {errors.primaryEmail && <p className={errorClass}>{errors.primaryEmail}</p>}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-emerald-200 bg-white p-5 sm:p-6">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeDeclaration"
                      checked={formData.agreeDeclaration}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm leading-7 text-slate-700">
                      I confirm that the information is accurate and understand that the NGO remains pending until approval.
                    </span>
                  </label>
                  {errors.agreeDeclaration && (
                    <p className={errorClass}>{errors.agreeDeclaration}</p>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={!isFormReady}
                    className={`rounded-2xl px-8 py-4 text-sm font-semibold text-white shadow-lg transition ${isFormReady
                        ? "bg-gradient-to-r from-emerald-500 via-green-500 to-sky-500 shadow-emerald-400/25 hover:-translate-y-0.5 hover:opacity-95"
                        : "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none"
                      }`}
                  >
                    Submit NGO application
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 text-center shadow-inner">
                <h3 className="text-2xl font-bold text-slate-900">
                  NGO application submitted
                </h3>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-600">
                  Your NGO has been submitted with verification_status = pending.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}