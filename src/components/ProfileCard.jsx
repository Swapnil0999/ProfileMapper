import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../store/profileStore";

export default function ProfileCard({ profile }) {
  const setSelectedProfile = useProfileStore(
    (state) => state.setSelectedProfile
  );
  const navigate = useNavigate();

  const handleCardClick = () => {
    setSelectedProfile(profile);
    navigate(`/profile/${profile.id}`);
  };

  const handleSummaryClick = (e) => {
    e.stopPropagation();
    setSelectedProfile(profile);
  };

  return (
    <div
      className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <img
        src={profile.photo}
        alt={`Profile picture of ${profile.name}`}
        className="rounded-xl w-full h-40 sm:h-48 md:h-56 object-cover mb-3 sm:mb-4"
      />
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
        {profile.name}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
        {profile.description}
      </p>
      <button
        onClick={handleSummaryClick}
        className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Summary
      </button>
    </div>
  );
}
