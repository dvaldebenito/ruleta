import axios from 'axios';

const ItemsService = {}

ItemsService.getItems = async () => {
    try {
        const response = await axios.get('http://localhost:9000/items');
        return response.data; 
    } catch (error) {
        console.log('ERROR =>', error.message)
        return []
    }
}

ItemsService.changeStatusItems = async (item, state) => {
    try {
        console.log(item, state)
        await axios.put(`http://localhost:9000/items/${item.id}`, { ...item, active: state })
    } catch (error) {
        console.log('ERROR =>', error.message)
        return 0
    }
}

export default ItemsService