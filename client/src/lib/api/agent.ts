import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";


const sleep = (deplay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, deplay);
    })
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(
    async response => {
        await sleep(500);
        store.uiStore.isIdle();
        return response;
    },
    async error => {
        await sleep(500);
        store.uiStore.isIdle();
        //console.log('axios error: ' + error)

        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    toast.error('Validation error');
                    
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;

            case 401:
                // toast.error('Unauthorised');
                if (data.detail === 'NotAllowed') {
                    throw new Error(data.detail)
                } else {
                    toast.error('Unauthorised');
                }
                break;
                
            case 403:
                toast.error('forbidden');
                break;

            case 404:
                //toast.error('not-found');
                await router.navigate('/not-found');
                break;

            case 500:
                //toast.error('server-error');
                router.navigate('/server-error', {state: {error: data}})
                break;

            default:
                break;

        }
        return Promise.reject(error);
    }
);

export default agent;