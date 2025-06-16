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
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Student Application / Enquiry</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>Type:</label>
          <select
            name="enquiryType"
            value={form.enquiryType}
            onChange={handleChange}
            className="ml-2"
          >
            <option>New Application</option>
            <option>Enquiry</option>
          </select>
        </div>
        <div>
          <label>Certificate Type:</label>
          <select
            name="certificateType"
            value={form.certificateType}
            onChange={handleChange}
            className="ml-2"
          >
            <option>Degree Normal</option>
            <option>Degree Urgent</option>
            <option>Degree Normal to Urgent</option>
            <option>Degree duplicate Normal</option>
            <option>Degree duplicate  Urgent</option>
            <option>Degree Correction</option>
            <option>Degree + Migration</option>
            <option>Provisional Certificate</option>
            <option>Migration Certification</option>
          </select>
        </div>
        {[
          "enrollmentNo",
          "branch",
          "rollNo",
          "name",
          "passingYear",
          "course",
          "division",
          "mobile",
          "feesDate",
          "email",
        ].map((field) => (
          <div key={field}>
            <label className="capitalize mr-2">
              {field.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border p-1 w-full"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
