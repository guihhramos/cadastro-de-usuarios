import { useEffect, useState } from 'react'
import './style.css';
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
const [users, setUsers] = useState([])


  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    
    setUsers(usersFromApi.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form action=" ">
        <h1> Cadastro de Usuários</h1>
        <input placeholder="Nome" name="Nome" type="text" />
        <input placeholder="Idade" name="Idade" type="number" />
        <input placeholder="E-mail" name="Email" type="email" />
        <button type="button">Cadastrar</button>
      </form>

    {users.map( users => (
      <div key={users.id} className="card">
        <div>
          <p>Nome:  <span>{users.name}</span></p>
          <p>Idade: <span>{users.age}</span></p>
          <p>Email: <span>{users.email}</span></p>
        </div>
        <button>
          <img src={Trash} />
        </button>
      </div>
    ))}

    </div>
  )
}

export default Home;
