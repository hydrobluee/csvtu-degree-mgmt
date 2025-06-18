import mongoose from "mongoose";
const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["New Application", "Enquiry"],
      required: true,
    },
    certificateType: {
      type: String,
      enum: [
        "Degree Urgent",
        "Degree Normal",
        "Degree Normal --> Urgent",
        "Degree Duplicate Normal",
        "Degree Duplicate Urgent",
        "Degree Correction",
        "Degree + Migration",
        "Provisional Certificate",
        "Migration Certificate",
      ],
      required: true,
    },
    enrollmentNumber: { type: String, required: true },
    branch: { type: String, required: true },
    rollNumber: { type: Number, required: true, unique: true },
    studentName: { type: String, required: true },
    passingYear: { type: Number, required: true },
    course: { type: String, required: true },
    division: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    feesDate: { type: Date, required: true },
    feeStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
    assignedDepartment: {
      type: String,
      enum: ["DegreeCell", "MPCon"],
      default: null,
    },
    currentStatus: { type: String, default: "Registered" },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
