import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Home'
import BlogPage from './pages/Blog'
import SpecificBlogPage from './pages/SpecBlog'
import CreateBlogPage from './pages/CreateBlog'
import ParksMap from './pages/Parks';
import ProfilePage from './pages/Profile/Profile';
import NFTPage from './pages/NFT';
import MainMapPage from './pages/MainMap';
import LogDistancePage from './pages/LogDistance'
import LeaderboardPage from './pages/Leaderboard'
import UsersPage from './pages/Users'
import SpecificUsersPage from './pages/SpecUsers';

export default function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/blog/view" element={<BlogPage />} exact />
        <Route path="/blogs/:bid" element={<SpecificBlogPage />} />
        <Route path="/blog/create" element={<CreateBlogPage />} exact />
        <Route path="/maps" element={<MainMapPage /> } exact />
        <Route path="/maps/log" element={<LogDistancePage />} exact />
        <Route path="/leaderboard" element={<LeaderboardPage />} exact />
        <Route path="/nft" element={<NFTPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/parks" element={<ParksMap />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<SpecificUsersPage />} />
      </Routes>
    </Router>
  );
}

