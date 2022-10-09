import { Message } from "element-ui";

export default function ({ $axios }) {
    $axios.onError((error) =>{
        Message.error(error.response.data.error || error.message)
        if (error.response.status === 401){
            window.location.reload()
        }
    })
}