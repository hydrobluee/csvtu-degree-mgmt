import { XIcon } from "lucide-react";

export default function ViewStudentData({ isOpen, student, onClose }) {
  if (!isOpen || !student) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className=" bg-white shadow-xl/30 border rounded-xl 
        p-6 w-11/12 h-[50vh] max-h-[50vh] max-w-4xl 
        relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <XIcon className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-semibold mb-14">More Student Details</h2>

        <div className="grid grid-cols-2 text-lg gap-4 text-gray-800">
          <div className="space-y-2">
            <p>
              <strong>Type:</strong> {student.type}
            </p>
            <p>
              <strong>Name:</strong> {student.student_name}
            </p>
            <p>
              <strong>Enrollment No:</strong> {student.enrollment_number}
            </p>
            <p>
              <strong>Roll No:</strong> {student.roll_number}
            </p>
            <p>
              <strong>Mobile:</strong> {student.mobile}
            </p>
            <p>
              <strong>Course:</strong> {student.course}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Certificate type:</strong> {student.certificate_type}
            </p>
            <p>
              <strong>Passing Year:</strong> {student.passing_year}
            </p>
            <p>
              <strong>Status:</strong> {student.current_status}
            </p>
            <p>
              <strong>Division:</strong> {student.division}
            </p>
            <p>
              <strong>Fees Date:</strong>{" "}
              {new Date(student.fees_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Submitted at:</strong>{" "}
              {new Date(student.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
