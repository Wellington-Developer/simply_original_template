import React, { useEffect, useState } from 'react';
export const GlobalContext = React.createContext(null);

export const GlobalStorage = ({ children }) => {
  const [ showPopup, setShowPopup] = useState(false);
  const [ allProducts, setAllProducts ] = useState([])
  const [ allCategories, setAllCategories ] = useState()
  const [ cart, setCart ] = useState<any>([])
  const [ productsCategory, setProductCategory ] = useState()
  const [ dataProduct, setDataProduct ] = useState()
  const [ termsUserHasBeenAccepted, setTermsUserHasBeenAccepted ] = useState<any>()


  const getAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
    .then(r => r.json())
    .then(r => setAllProducts(r))
  }

  const getAllCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
    .then(r => r.json())
    .then(r => setAllCategories(r))
  }

  const getProductsPerCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(r => r.json())
    .then(response => setProductCategory(response))
  }

  const setNewProduct = (array) => {
    setDataProduct(array)
  }

  const userHasBeenAcceptTerms = () => {
    const data = localStorage.getItem("termos")
    setTermsUserHasBeenAccepted(data)
  }

  const setProductToCart = (id) => {
      const product = allProducts.find((product) => product.id === id);
      const isProductAlready = cart.some(carting => carting.id === product.id);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      if(!isProductAlready) {
        localStorage.setItem('cartProducts',
        JSON.stringify([...cart, product]))
        setCart([...cart, product])
      }

  }

  const deleteProductToCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
    localStorage.setItem('cartProducts',
    JSON.stringify(newCart))
  }

  const loadCart = () => {
    const productsCart: any = JSON.parse(localStorage.getItem('cartProducts'))

    if(productsCart) {
      setCart(productsCart)
    } else {
      setCart([...cart])
    }
  }




  useEffect(() => {
    getAllProducts()
    getAllCategories()
    userHasBeenAcceptTerms()
    loadCart()
  }, [])

  return (
    <GlobalContext.Provider value={ { allProducts, allCategories, setProductToCart, cart, deleteProductToCart, getProductsPerCategory, productsCategory, showPopup, setNewProduct, dataProduct, termsUserHasBeenAccepted } }>{children}</GlobalContext.Provider>
  )
}