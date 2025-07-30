import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { ResumeBuilder } from '@/components/ResumeBuilder';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <main className="flex-grow">
        <ResumeBuilder />
      </main>
      <Footer />
    </div>
  )
};

export default Index;
