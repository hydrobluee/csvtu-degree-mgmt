import React, { useState } from "react";
import api from "../services/api";

export default function StudentForm() {
  const initial = {
    enquiryType: "New Application",
    certificateType: "Degree Normal",
    enrollmentNo: "",
    branch: "",
    rollNo: "",
    name: "",
    passingYear: "",
    course: "",
    division: "",
    mobile: "",
    feesDate: "",
    email: "",
  };
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/applications", form);
      setMessage("Application submitted successfully!");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setMessage("Submission failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Student Application / Enquiry
        </h2>

        {message && (
          <p className="text-center text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Type & Certificate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select
                name="enquiryType"
                value={form.enquiryType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option>New Application</option>
                <option>Enquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Certificate Type
              </label>
              <select
                name="certificateType"
                value={form.certificateType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option>Degree Normal</option>
                <option>Degree Urgent</option>
                <option>Degree Normal to Urgent</option>
                <option>Degree duplicate Normal</option>
                <option>Degree duplicate Urgent</option>
                <option>Degree Correction</option>
                <option>Degree + Migration</option>
                <option>Provisional Certificate</option>
                <option>Migration Certification</option>
              </select>
            </div>
          </div>

          {/* Section 2: Personal & Academic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "enrollmentNo", label: "Enrollment No" },
              { name: "rollNo",       label: "Roll No" },
              { name: "name",         label: "Name" },
              { name: "branch",       label: "Branch" },
              { name: "course",       label: "Course" },
              { name: "division",     label: "Division" },
              { name: "passingYear",  label: "Passing Year" },
              { name: "mobile",       label: "Mobile" },
              { name: "feesDate",     label: "Fees Date", type: "date" },
              { name: "email",        label: "Email",      type: "email" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="block text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
