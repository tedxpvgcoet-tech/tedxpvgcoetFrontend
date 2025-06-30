import Header from '../components/Header';
import Footer from '../components/Footer';
import PunarutthanSection from '../components/Punarutthan/PunarutthanSection';
import TalksSection from '../components/Punarutthan/TalksSection';
import Team from '../components/Punarutthan/Team';

const Punarutthan = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PunarutthanSection />
      <TalksSection />
      <Team />
      <Footer />
    </div>
  );
};

export default Punarutthan;