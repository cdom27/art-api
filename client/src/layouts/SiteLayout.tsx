import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className='font-medium px-3 pt-14 flex flex-col gap-14 pb-14'>
        {children}
      </main>
      <Footer />
    </>
  );
}
