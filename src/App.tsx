// Styles
import './App.css'

// React Context
import { GlobalStorage } from './components/context/GlobalContext'

// React Components
import { Header } from './components/Header';
import { Home } from './components/Home';

// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryProduct } from './components/CategoryProducts';
import { Footer } from './components/Footer';
import { ProductPage } from './components/ProductPage';
import { Termos } from './components/Termos';
import GoToTop from './components/GoToTop';
import { PoliticaPrivacidade } from './components/Footer/Utils/PoliticaPrivacidade';
import { AddNewProduct } from './components/AddNewProduct';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { PopupTermsAccept } from './components/PopupTermosAccept';


function App() {

  return (
    <GlobalStorage>
      <BrowserRouter>
          <div className="container">
          <WhatsAppIcon />
          <PopupTermsAccept />
            <Header/>
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/category/:id" element={ <CategoryProduct /> } />
              <Route path="/product/:id" element={ <ProductPage /> } />
              <Route path="/termos" element={ <Termos /> } />
              <Route path="/politica-privacidade" element={ <PoliticaPrivacidade /> } />
              <Route path="/cadastrar-produto" element={ <AddNewProduct /> } />
            </Routes>
          </div>
            <Footer />
            <GoToTop />
      </BrowserRouter>
    </GlobalStorage>
  )
}

export default App
