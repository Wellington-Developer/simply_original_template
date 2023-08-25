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
  
  const addProductToCart = (id, nameProduct, qtd, size, color, totalPrice) => {
    setShowPopup(true)
    const copyProductsCart = [...cart]
    const item = copyProductsCart.find((product) => product.id === id && product.size == size && product.color == color)

    if(!item) {
      copyProductsCart.push({id: id, nameProduct: nameProduct, qtd: qtd, size: size, color: color, totalPrice: totalPrice * qtd})
    } else {
      item.qtd = item.qtd + 1;
      item.totalPrice = totalPrice * item.qtd
    }

    setCart(copyProductsCart)
    localStorage.setItem(
      'productsCart',
      JSON.stringify(copyProductsCart)
    )

  }

  const removeProductToCart = (id, size, color, price) => {
    const copyProductsCart = [...cart]
    const item = copyProductsCart.find((product) => product.id === id && product.size === size && product.color === color);

    if(item.qtd > 1) {
      item.qtd = item.qtd - 1
      item.totalPrice = price * item.qtd
      setCart(copyProductsCart)
      localStorage.setItem(
      'productsCart',
      JSON.stringify(copyProductsCart))
    } else {
      const arrayFiltered = copyProductsCart.filter((product) => product.id !== id || product.size !== size || product.color !== color)
      setCart(arrayFiltered)
      localStorage.setItem(
      'productsCart',
      JSON.stringify(arrayFiltered)
    )
    }
  }

   const loadCart = () => {
    const productsCart: any = JSON.parse(localStorage.getItem('productsCart'))

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
    <GlobalContext.Provider value={ { allProducts, allCategories, cart, getProductsPerCategory, productsCategory, showPopup, setNewProduct, dataProduct, termsUserHasBeenAccepted, addProductToCart, removeProductToCart } }>{children}</GlobalContext.Provider>
  )
}