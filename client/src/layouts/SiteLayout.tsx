import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className='font-medium px-3 pt-14 flex flex-col gap-14 pb-14 sm:max-w-[85%] md:max-w-[65%] xl:max-w-[60%] 2xl:max-w-[43%] mx-auto min-h-screen'>
        {children}
      </main>
      <Footer />
    </>
  );
}
