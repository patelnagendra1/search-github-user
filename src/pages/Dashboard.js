import React, { useContext } from 'react';
import { Info, Repos, User, Search, Navbar, Footer} from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {isLoading} = useContext(GithubContext)
  if(isLoading){
    return(
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="loading" />
      </main>
    )
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
      <Footer />
    </main>
  );
};

export default Dashboard;
