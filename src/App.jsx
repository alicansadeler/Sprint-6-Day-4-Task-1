import Header from './components/Header';
import Footer from './components/Footer';
import './components/Layout.css';
import Products from './components/Products';

function App() {
  return (
    <>
      <Header />
      <div className="content-section">
        <Products />
      </div>
      <Footer />
    </>
  );
}

export default App;
