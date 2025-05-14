import { useProfileStore } from "../store/profileStore";

import { useParams } from "react-router-dom";
import MapboxMap from "../components/MapboxMap";
import NavBar from "../components/NavBar";
import { useEffect } from "react";

const ProfileDetails = () => {
  const profiles = useProfileStore((state) => state.profiles);
  const setSelectedProfile = useProfileStore(
    (state) => state.setSelectedProfile
  );
  const selectedProfile = useProfileStore((state) => state.selectedProfile);
  const { id } = useParams();
  useEffect(() => {
    console.log("Profiles:", profiles);
    console.log("Selected Profile:", selectedProfile);
    if (!selectedProfile && profiles) {
      const profile = profiles.find((p) => p.id.toString() === id);
      if (profile) setSelectedProfile(profile);
    }
  }, [id, selectedProfile, profiles, setSelectedProfile]);

  if (!selectedProfile) {
    return (
      <>
        <NavBar />
        <div className="text-center text-gray-600 mt-10">
          Profile not found or still loading...
        </div>
      </>
    );
  }
  const profile = selectedProfile;
  return (
    <>
      <NavBar />
      <div className="max-w-3xl  mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-48 h-48 rounded-full object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="mt-2 text-gray-600">{profile.description}</p>

            <div className="mt-4 space-y-2">
              <div>
                <span className="font-medium text-gray-700">Location:</span>{" "}
                {profile.address}
              </div>
              <div>
                <span className="font-medium text-gray-700">Contact:</span>{" "}
                {profile.contact}
              </div>
              <div>
                <span className="font-medium text-gray-700">Interests:</span>{" "}
                {profile.interests?.join(", ") || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Enlarged Map section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Map View</h3>
          <div className="w-full h-[500px] bg-white rounded-lg overflow-hidden">
            <MapboxMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
