import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiConect } from '../../api/apiConect';
import Button from '../Button/Button';
import './Card.css';


export default function Card() {

    const [pesquisar, setPesquisar] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [itemUpdate, setItemUpdate] = useState()


    async function handleSubmit(event) {
        //console.log(13, event);

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
        await getAll()
    }

    
    async function handleSubmitEdit(item){
      setIsEditing(true)
      setItemUpdate(item)             
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

    async function itemUpdateForm(event){
        
        event.preventDefault()
        console.log(event);
        
        const produtoUpdate = {
            nome: event.target.nome.value,
            serial: event.target.serial.value,
            marca: event.target.marca.value,
            modelo: event.target.modelo.value,
            id: event.target.id.value
            
        }
        console.log(produtoUpdate);

        try {
            const response = await apiConect.apiUpdate(produtoUpdate.id,produtoUpdate)
                    

            if (response.ok) {
                toast('Sucesso ao atualizar.')

                setIsEditing(false)

                getAll()

            } else {
                toast('Erro ao cadastrar.')
            }


        } catch (error) {
            console.error('Erro ao atualizar o produto: ', error);
                toast('Erro ao atualizar.')
        }
        
    }

    return (
                
       <div className='card'>
           {isEditing ? <>

            <h3>Produto Antigo</h3>
            <div>
              <form>
              <div>
                <label htmlFor='nome'>Nome </label>
                <input value={itemUpdate.nome} />
             </div>
            <div>
                <label htmlFor='serial'>Serial</label>
                <input value={itemUpdate.serial}/>
            </div>

            <div>
                <label htmlFor='marca'>Marca</label>
                <input value={itemUpdate.marca}/>
            </div>
            <div>
                <label htmlFor='modelo'>Modelo</label>
                <input value={itemUpdate.modelo}/>
            </div>
            <div>
                <label htmlFor='id'>ID </label>
                <input value={itemUpdate._id}/>
            </div>
              </form>
            </div>

            <h2>Produto Atualizado</h2>
                
        <form onSubmit={itemUpdateForm}>
        
       
        <div>   
            <label htmlFor='nome'>Nome</label>
            <input type="text" id='nome' name='nome' placeholder='nome do produto...' />
        </div>

        <div>
            <label htmlFor='serial'>Serial</label>
            <input type='text' id='serial' name='serial' placeholder='serial do produto...'></input>
        </div>

        <div>
            <label htmlFor='marca'>Marca</label>
            <input type='text' id='marca' name='marca' placeholder='marca do produto...'></input>
        </div>

        <div>
            <label htmlFor='modelo'>Modelo</label>
            <input type='text' id='modelo' name='modelo' placeholder='modelo do produto...'></input>   
        </div>

        <div>
                <input type='text' id='id' name='id' value={itemUpdate._id} hidden/>  
        </div>    
        
        <button type='submit'>Atualizar</button>
        
        </form>

        <br></br>
        
                               
           </> : <>

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
   </div>
</form>


</div>

<div className='cardPesquisar'>

<div>
    
    <button onClick={getAll}>BUSCAR PRODUTOS CADASTRADOS</button>
    <h2>Produtos Cadastrados</h2>
</div>

<div>
    <ul>

        {pesquisar.map((item, index) => (<li key={index}>item: {item.nome}, serial: {item.serial}, marca: {item.marca}, modelo: {item.modelo} <button id='btnEdit' onClick={()=>handleSubmitEdit(item)}>✏️</button> <button id='btnTrash' onClick={() => deleteItem(item._id)}>🗑️</button></li>))        
        }
       
        
    </ul>
</div>
</div>
           
</>} 
            



        </div>
)
}