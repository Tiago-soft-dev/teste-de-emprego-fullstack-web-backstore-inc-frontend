 const urlBase = 'http://localhost:3000/backstore/'

 export const apiConect = {
   apiGetAll : async()=>{
       
       try {
           const response = await fetch(urlBase)          
           
           
           if(!response.ok){
               console.log('erro ao conectar');
               return null
           }
           const data = await response.json()
           
           
           return data
           
       } catch (error) {
           console.log('erro ao conectar: ', error)
           return 
       }
       
   },

   apiGetById: async(id)=>{
    
    try {
        const response = await fetch(`${urlBase}${id}`)
        if(!response.ok){
            console.error('ocorreu um erro: ', response.statusText)
            return null
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('ocorreu um erro: ', error.message)
        return null
    }
   },

   apiPost: async (body)=>{
    //const body = req.body
    try {
        return await fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
                       
        })

    } catch (error) {
        console.error('erro ao enviar dados: ', error.message)
        return null    
    }
    
   },

   apiUpdate: async(id, body)=>{
    try {
        const response = await fetch(`${urlBase}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        })

            console.log(71, response);
            
            if(!response.ok){
                console.error('erro na requisição: ', response.statusText)
                return null
            }

            const data = await response.json()
            //console.log(data, 79);
            
            return response

    } catch (error) {
        console.error('erro na requisicao: ',  error.message)
        return null
        
    }
   },

   apiDelete : async (id) =>{
    try {
        const response = await fetch(`${urlBase}${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }               
            }
        )

        if(!response.ok){
            console.error('erro na requisicao: ', response.statusText);
            return null
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('erro na requisicao: ', error.message);
        return null
    }
   }
}



   

