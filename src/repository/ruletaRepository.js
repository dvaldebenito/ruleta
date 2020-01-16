const RuletaRepository = ({ axios, urlBase }) => {
    const getAllItems = async () => {
        try {
            const response = await axios.get(`${urlBase}/getAllItems`);
            return response.data; 
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }
    
    const changeStatusItems = async (item) => {
        try {
            await axios.get(`${urlBase}/changeItemsId/${item.id}`)
        } catch (error) {
            console.log('ERROR =>', error.message)
            return 0
        }
    }

    const getItemsActives = async () => {
        try {
            const response = await axios.get(`${urlBase}/getItems`);
            return response.data; 
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }

    const activeAllItems = async () => {
        try {
            const response = await axios.get(`${urlBase}/activeAllItems`);
            return response.data; 
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }

    return {
        getAllItems,
        changeStatusItems,
        getItemsActives,
        activeAllItems
    }
}

export default RuletaRepository