import api from "../http-config"
class ItemService{
    getItems(page,pageSize,sortParams){
        const baseSearch = `/todos?page=${page}&limit=${pageSize}`;
        const defaultOrder =`sortBy=createdDate&order=desc`
        if (sortParams !== undefined && sortParams !== null)
            return api.get(`${baseSearch}&${sortParams}`)
        return api.get(`${baseSearch}&${defaultOrder}`)
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