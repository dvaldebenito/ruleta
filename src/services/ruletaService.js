import RuletaRepository from '../repository/ruletaRepository'

const ItemsService = ({ axios, urlBase }) => {
    const ruletaRepository = RuletaRepository({ axios, urlBase });

    const getItemsActives = async () => {
        try {
            return await ruletaRepository.getItemsActives();
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }
    
    const changeStatusItems = async (item, state) => {
        try {
            return await ruletaRepository.changeStatusItems({ ...item, active: state })
        } catch (error) {
            console.log('ERROR =>', error.message)
            return 0
        }
    }

    const getAllItems = async () => {
        try {
            return await ruletaRepository.getAllItems();
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }

    const activeAllItems = async () => {
        try {
            return await ruletaRepository.activeAllItems();
        } catch (error) {
            console.log('ERROR =>', error.message)
            return []
        }
    }

    return {
        getItemsActives,
        changeStatusItems,
        getAllItems,
        activeAllItems
    }
}

export default ItemsService