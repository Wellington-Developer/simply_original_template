import { useState, useEffect } from 'react';

export const FormStepTwo = () => {
  const [cityClient, setCityClient] = useState('');
  const [cepClient, setCepClient] = useState('');
  const [addressClient, setAddressClient] = useState('');
  const [numberClient, setNumberClient] = useState('');
  const [fullAddressClient, setFullAddressClient] = useState({});

  useEffect(() => {
    setFullAddressClient({ city: cityClient, cep: cepClient, street: addressClient, number: numberClient });
  }, [cityClient, cepClient, addressClient, numberClient]);

  // Update localStorage whenever fullAddressClient changes
  useEffect(() => {
    localStorage.setItem('fullAddressClient', JSON.stringify(fullAddressClient));
  }, [fullAddressClient]);

  return (
    <form action="">
      <input
        value={cityClient}
        onChange={(e) => setCityClient(e.target.value)}
        type="text"
        placeholder="Cidade"
      />

      <input
        value={cepClient}
        onChange={(e) => setCepClient(e.target.value)}
        type="text"
        placeholder="CEP"
      />

      <input
        value={addressClient}
        onChange={(e) => setAddressClient(e.target.value)}
        type="text"
        placeholder="Endereço"
      />

      <input
        value={numberClient}
        onChange={(e) => setNumberClient(e.target.value)}
        type="text"
        placeholder="Número"
      />
    </form>
  );
};
