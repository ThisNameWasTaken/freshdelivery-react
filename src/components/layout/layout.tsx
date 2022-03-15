import Header from '@components/layout/header/header';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';

const Layout: React.FC = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main
      className="relative flex-grow"
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </main>
    <Footer />
    <MobileNavigation />
  </div>
);

export default Layout;
