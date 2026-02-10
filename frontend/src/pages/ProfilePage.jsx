import React from "react";
import { User, Mail, School, CreditCard } from "lucide-react";

export default function ProfilePage({ user }) {
  // fallback demo data if user not passed
  const profile = user || {
    name: "Simran Agrawal",
    email: "simran@example.com",
    studentId: "STU001",
    branch: "Computer Engineering"
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4 max-w-md">

        <div className="flex items-center gap-3">
          <User className="text-blue-500" />
          <span><strong>Name:</strong> {profile.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-green-500" />
          <span><strong>Email:</strong> {profile.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="text-purple-500" />
          <span><strong>Student ID:</strong> {profile.studentId}</span>
        </div>

        <div className="flex items-center gap-3">
          <School className="text-orange-500" />
          <span><strong>Branch:</strong> {profile.branch}</span>
        </div>

      </div>
    </div>
  );
}
