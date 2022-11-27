import { useState } from 'react';
import { FiSearch } from 'react-icons/fi' //Importação dos icones - npm install react-icons
import './styles.css'

import api from './services/api';

function App() {
  //Salva os valores informados no input
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  async function handleSearch() {
   // alert("Valor do input " + input)
   if(input === '') {
    alert('Preencha algum CEP!')
    return
   }

   try {
    const response = await api.get(`${input}/json`)
    //console.log(response.data)
    setCep(response.data)
    setInput('')
   } catch {
    alert('Ops erro ao buscar')
    setInput('') //Retorna campo como vazio
   }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
          <input 
            type='text'
            placeholder='Digite seu cep...'
            //Comandos após inserir o useState
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#fff'/>
            </button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>

    
  );
}

export default App;
