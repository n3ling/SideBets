import { useAuth } from "../auth/useAuth";

const HomePage = () => {
  const user = useAuth();
  return <div>Welcome to homepage {user.user?.uid}</div>;
};

export default HomePage;
