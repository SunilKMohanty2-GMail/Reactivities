import axios from "axios";


const sleep = (deplay: number) => {
    return new Promise (resolve => {
        setTimeout(resolve, deplay);
    })
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
});

export default agent;