import api from "../http-config"
class ItemService{
    getItems(sortParams){
        return api.get(`/todos${sortParams}`)
    }
    createItem(payload){
        return api.post(`/todos`, payload)
    }
    deleteItem(id){
        return api.delete(`/todos/${id}`)
    }
    updateItem(id,payload){
        return api.put(`/todos/${id}`, payload)
    }
}

export default new ItemService();