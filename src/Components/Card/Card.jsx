import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiConect } from '../../api/apiConect';
import Button from '../Button/Button';
import './Card.css';

export default function Card() {

    const [pesquisar, setPesquisar] = useState([])



    async function handleSubmit(event) {
        console.log(13, event);


        event.preventDefault()

        const form = event.target

        const produto = {
            nome: event.target.nome.value,
            serial: event.target.serial.value,
            marca: event.target.marca.value,
            modelo: event.target.modelo.value
        }

        if (event.target[4].value == 'cadastrar') {
            console.log(event.target[4].value);

            try {
                const response = await apiConect.apiPost(produto)

                if (response.ok) {
                    toast('Sucesso ao cadastrar.')
                    form.reset()
                } else {
                    toast('Erro ao cadastrar.')
                }

            } catch (error) {
                console.error('Erro ao enviar o formuário: ', error);
                toast('Erro ao cadastrar.')
            }
        }

    }

    async function getAll() {
       
        const response = await apiConect.apiGetAll()
        setPesquisar(response)
    }

    async function deleteItem(id) {

        const response = await apiConect.apiDelete(id)
        getAll()
        console.log(response);
    }



    return (
        <div className='card'>
            <div className='cardCadastrar'>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='nome'>Nome do Produto</label>
                        <input type="text" id='nome' name='nome' placeholder='Nome do Produto' />
                    </div>
                    <div>
                        <label htmlFor='serial'>Serial do Produto</label>
                        <input type='text' id='serial' name='serial' placeholder='Serial do Produto'></input>
                    </div>

                    <div>
                        <label htmlFor='marca'>Marca do Produto</label>
                        <input type='text' id='marca' name='marca' placeholder='Marca do Produto'></input>
                    </div>
                    <div>
                        <label htmlFor='modelo'>Modelo do Produto</label>
                        <input type='text' id='modelo' name='modelo' placeholder='Modelo do Produto'></input>
                    </div>
                    <div className='buttonCadastrar'>
                        <Button key='cadastrar' nome='Cadastrar' type='submit' value='cadastrar' />
                        {/* <Button key='resetar' nome='Limpar' type='reset' /> */}
                        {/* <Button key='pesquisar' nome='Pesquisar' type='submit' value='pesquisar'/> */}
                    </div>
                </form>

            </div>

            <div className='cardPesquisar'>

                <div>

                    <button onClick={getAll}>BUSCAR PRODUTOS CADASTRADOS</button>
                </div>

                <div>
                    <ul>

                        {pesquisar.map((item, index) => (<li key={index}>item: {item.nome}, serial: {item.serial}, marca: {item.marca}, modelo: {item.modelo} <button id='btnTrash' onClick={() => deleteItem(item._id)}>🗑️</button></li>))}

                    </ul>
                </div>
            </div>



        </div>
    )
}