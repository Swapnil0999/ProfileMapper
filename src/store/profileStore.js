import { create } from 'zustand';
import { sampleData } from '../data/sampleData';

export const useProfileStore = create((set) => ({
  profiles: sampleData,

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  selectedProfile: null,
  setSelectedProfile: (profile) => set({ selectedProfile: profile }),
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  addProfile: (profile) =>
    set((state) => {
      const exists = state.profiles.some((p) => p.id === profile.id);
      return exists ? {} : { profiles: [...state.profiles, profile] };
    }),
  updateProfile: (updatedProfile) => set((state) => ({
    profiles: state.profiles.map((profile) =>
      profile.id === updatedProfile.id ? updatedProfile : profile
    ),
  })),
  deleteProfile: (id) => set((state) => ({
    profiles: state.profiles.filter((profile) => profile.id !== id),
  })),
}))