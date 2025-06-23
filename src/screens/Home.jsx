import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import ProgressStrip from '../components/ProgressStrip';
import ThemeList from '../components/ThemeList';
import CTAButton from '../components/CTAButton';

export default function Home() {
  return (
    <div className="home-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 max-w-md w-11/12 md:w-4/5 mx-auto">
        <Hero />
        <ProgressStrip />
        <ThemeList />
        <CTAButton />
      </main>
    </div>
  );
}
