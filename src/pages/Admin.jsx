import { useState } from "react";
import { useProfileStore } from "../store/profileStore";
import NavBar from "../components/NavBar";

export default function AdminPage() {
  const profiles = useProfileStore((state) => state.profiles);
  const addProfile = useProfileStore((state) => state.addProfile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const deleteProfile = useProfileStore((state) => state.deleteProfile);

  const initialForm = {
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      ...formData,
      id: editingId ?? Date.now(),
      interests: formData.interests.split(",").map((s) => s.trim()),
    };

    if (editingId) {
      updateProfile(profile);
    } else {
      addProfile(profile);
    }

    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (profile) => {
    setFormData({
      ...profile,
      interests: profile.interests.join(", "),
    });
    setEditingId(profile.id);
  };

  const handleDelete = (id) => {
    deleteProfile(id);
  };

  return (
    <>
      <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Admin Panel - Manage Profiles
        </h1>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-6 rounded shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold">
            {editingId ? "Edit Profile" : "Add Profile"}
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Interests (comma-separated)"
            value={formData.interests}
            onChange={(e) =>
              setFormData({ ...formData, interests: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Profile" : "Add Profile"}
          </button>
        </form>

        {/* Profile List */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Profiles</h2>
          {profiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Photo</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Location</th>
                    <th className="p-2 border">Interests</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id}>
                      <td className="p-2 border">
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="p-2 border">{profile.name}</td>
                      <td className="p-2 border">{profile.contact}</td>
                      <td className="p-2 border">{profile.address}</td>
                      <td className="p-2 border">
                        {profile.interests.join(", ")}
                      </td>
                      <td className="p-2 border space-x-2">
                        <button
                          onClick={() => handleEdit(profile)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
