import axios from "axios";

const api = axios.create({
    baseURL : "https://fakestoreapi.com",
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    console.log("Headers:", config.headers);
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent to:", config.url);
    return config;
    },
    (error) => {
        return Promise.reject(error);

    }
);


api.interceptors.response.use(
    (response) => response,
    (error) =>{
        let message = "Something went wrong";

    // Network error (no response from server)
    if (!error.response) {
        message = "Network error. Please check your connection.";
        } else {
        const status = error.response.status;

    // Unauthorized
    if (status === 401) {
        message = "Session expired. Please login again.";
      }
    // Forbidden
    else if (status === 403) {
        message = "You do not have permission to perform this action.";
      }

    // Not found
    else if (status === 404) {
        message = error.response.data?.message || "Resource not found.";
      }

    // Server error
    else if (status >= 500) {
        message = "Server error. Please try again later.";
      }

    // Other errors (fallback)
    else {
        message =
          error.response.data?.message || "Something went wrong";
      }
    }

    // Attach standardized message
    error.message = message;
        return Promise.reject(error);
    }
);

export default api;













