import axios from 'axios'
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'

export const ViewAllUsers =()=> AxiosInstance.get('admin/view-user')
// export const AssignTaskToUser =(taskData) =>  AxiosInstance.post('admin/create-task')