import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:4000/api/user/all");
      const data = await res.json();
      setUsers(data.data || data.users || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-gray-800 shadow-2xl rounded-2xl p-6 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          All Users
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-600 w-full text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">WhatsApp</th>
                <th className="border p-2">DOB</th>
                <th className="border p-2">Weight</th>
                <th className="border p-2">Height</th>
                <th className="border p-2">Chest</th>
                <th className="border p-2">Biceps</th>
                <th className="border p-2">Thigh</th>
                <th className="border p-2">Waist</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Purpose</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Diet Preference</th>
                <th className="border p-2">Medical Conditions</th>
                <th className="border p-2">Involved in Sports</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.whatsAppNumber}</td>
                  <td className="border p-2">{u.DOB}</td>
                  <td className="border p-2">{u.weight}</td>
                  <td className="border p-2">{u.height}</td>
                  <td className="border p-2">{u.chest}</td>
                  <td className="border p-2">{u.biceps}</td>
                  <td className="border p-2">{u.thigh}</td>
                  <td className="border p-2">{u.waist}</td>
                  <td className="border p-2">{u.category}</td>
                  <td className="border p-2">{u.purpose}</td>
                  <td className="border p-2">{u.address}</td>
                  <td className="border p-2">{u.dietPreference}</td>
                  <td className="border p-2">{u.medicalConditions}</td>
                  <td className="border p-2">
                    {u.involvedInSports ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
