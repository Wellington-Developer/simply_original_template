import { useEffect, useState } from 'react';

export const FormStepOne = () => {
  const [nameClient, setNameClient] = useState('');
  const [whatsappClient, setWhatsappClient] = useState('');
  const [dataInfoClient, setDataInfoClient] = useState<any>({});

  useEffect(() => {
    // Update the dataInfoClient whenever nameClient or whatsappClient changes
    setDataInfoClient({ nome: nameClient, whatsapp: whatsappClient });
  }, [nameClient, whatsappClient]);

  const formatPhoneNumber = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    let formattedPhoneNumber = '';

    if (digitsOnly.length > 2) {
      formattedPhoneNumber += `(${digitsOnly.substring(0, 2)}) `;
    } else if (digitsOnly.length <= 2 && digitsOnly.length > 0) {
      formattedPhoneNumber += `(${digitsOnly}`;
      return formattedPhoneNumber;
    }

    if (digitsOnly.length > 7) {
      formattedPhoneNumber += `${digitsOnly.substring(2, 7)}-`;
    } else if (digitsOnly.length > 2) {
      formattedPhoneNumber += digitsOnly.substring(2);
      return formattedPhoneNumber;
    }

    if (digitsOnly.length >= 8) {
      formattedPhoneNumber += digitsOnly.substring(7, 11);
    }

    return formattedPhoneNumber;
  };

  const handleWhatsappChange = (e) => {
    // Formata o número do telefone quando digitado
    const formattedNumber = formatPhoneNumber(e.target.value);
    setWhatsappClient(formattedNumber);

    // Atualize o local storage com o número formatado
    setDataInfoClient({ nome: nameClient, whatsapp: formattedNumber });
    localStorage.setItem('infoClientName', JSON.stringify({ nome: nameClient, whatsapp: formattedNumber }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lidar com a submissão do formulário
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nameClient}
        onChange={(e) => setNameClient(e.target.value)}
        type="text"
        placeholder="Nome"
      />

      <input
        value={whatsappClient}
        onChange={handleWhatsappChange}
        type="text"
        placeholder="Whatsapp"
      />
    </form>
  );
};
