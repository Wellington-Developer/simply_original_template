// Styles
import './App.css'

// React Context
import { GlobalStorage } from './components/context/GlobalContext'

// React Components
import { Home } from './components/Home';

// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryProduct } from './components/CategoryProducts';
import { ProductPage } from './components/ProductPage';
import { Termos } from './components/Termos';
import GoToTop from './components/GoToTop';
import { PoliticaPrivacidade } from './components/Footer/Utils/PoliticaPrivacidade';
import { AddNewProduct } from './components/AddNewProduct';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { PopupTermsAccept } from './components/PopupTermosAccept';
import { Cart } from './components/Cart';
import { SearchPage } from './components/SearchPage';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { ChangeAddress } from './components/InfoClient/utils/ChangeAddress';

function App() {

  return (
    <SkeletonTheme baseColor="#333" highlightColor="#444">
      <GlobalStorage>
        <BrowserRouter>
            <WhatsAppIcon />
            <PopupTermsAccept />
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/search" element={ <SearchPage /> } />
                <Route path="/cart" element={<Cart />} />
                <Route path="/category/:id" element={ <CategoryProduct /> } />
                <Route path="/product/:id" element={ <ProductPage /> } />
                <Route path="/termos" element={ <Termos /> } />
                <Route path="/change-address" element={<ChangeAddress />} />
                <Route path="/politica-privacidade" element={ <PoliticaPrivacidade /> } />
                <Route path="/cadastrar-produto" element={ <AddNewProduct /> } />
              </Routes>
              <GoToTop />
        </BrowserRouter>
      </GlobalStorage>
    </SkeletonTheme>
  )
}

export default App
