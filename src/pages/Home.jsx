import { useProfileStore } from "../store/profileStore";
import ProfileCard from "../components/ProfileCard";
import MapboxMap from "../components/MapboxMap";
import NavBar from "../components/NavBar";

export default function Home() {
  const profiles = useProfileStore((state) => state.profiles);
  const selected = useProfileStore((state) => state.selectedProfile);
  const searchTerm = useProfileStore((state) => state.searchTerm);

  const filteredProfiles = profiles.filter((profile) => {
    const term = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(term) ||
      profile.address.toLowerCase().includes(term) ||
      profile.description.toLowerCase().includes(term) ||
      profile.interests.join(" ").toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      {/* Main Content */}

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Profiles</h1>
        {filteredProfiles.length === 0 ? (
          <p className="text-gray-500">No profiles found.</p>
        ) : (
          <div className="overflow-x-auto whitespace-nowrap space-x-4 flex pb-4 scrollbar-thin scrollbar-thumb-blue-500">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="inline-block min-w-[300px]">
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>
        )}

        {selected && (
          <>
            <h2 className="text-2xl font-semibold mt-10 mb-2">
              Location for {selected.name}
            </h2>
            <MapboxMap />
          </>
        )}
      </div>
    </div>
  );
}
