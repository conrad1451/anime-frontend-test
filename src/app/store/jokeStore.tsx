import useStore  from './baseStore';

const useJokesStore = useStore((set: any) => ({
  user: null,
  fetchJokes: (credentials) => {
    // Authenticate user and update state
  },
  deleteJoke: () => {
    // Log out user and update state
  },
}));

export default useJokesStore;