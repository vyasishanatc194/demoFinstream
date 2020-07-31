import axios from "axios";

const services = axios.create({
    headers: { 
        "Content-Type": "application/json" 
    }
    
});


const servicesForData = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    }
    
});
const tokenHeaders = (useToken) => {
    const jwt = localStorage.getItem("userToken");
    const headers = useToken && jwt ? { headers: { 'Authorization': 'Bearer ' + jwt } } : {};
    return headers;
};

export const get = (url, useToken = false) => {
    const headers = tokenHeaders(useToken);
    return services.get(url, headers);
};

export const post = (url, data, useToken = false) => {
    const headers = tokenHeaders(useToken);
    return services.post(url, data, headers);
};

export const postFormData = (url, data, useToken = false) => {
    //const headers = tokenHeaders(useToken);
    return servicesForData.post(url, data);
};

export const putFormData = (url, data, useToken = false) => {
    //const headers = tokenHeaders(useToken);
    return servicesForData.put(url, data);
};

export const put = (url, data, useToken = false) => {
    //const headers = tokenHeaders(useToken);
    return services.put(url, data);
};

export const remove = (url, data, useToken = false) => {
    //const headers = tokenHeaders(useToken);
    return services.delete(url, data);
  };
  