import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './store/reevamovieSlice';

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const resp = await axios.get('/trending/all/week');
      dispatch(setBannerData(resp.data.results));
    } catch (error) {
      console.error("Trending Data Error:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const resp = await axios.get('/configuration');
      if (resp.data?.images?.secure_base_url) {
        dispatch(setImageUrl(resp.data.images.secure_base_url + "original"));
      }
    } catch (error) {
      console.error("Config Error:", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main>
      <div className="pb-14 lg:pb-0">
        <Header />
        <div className="min-h-[90vh]">
          <Outlet />
        </div>
        <Footer />
      </div>
      <MobileNavigation />
    </main>
  );
}

export default App;