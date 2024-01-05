import axios from "axios";

const BASE_URL = "";
const data = localStorage.getItem("persist:root");
// const user = data && JSON.parse(data)?.currentUser;
// const TOKEN = user ? JSON.parse(user)?.accessToken : null;
const user = JSON.parse(data)?.user;
const currentUser = JSON.parse(user)?.currentUser;
const TOKEN = currentUser?.token;
console.log(TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", token: `Bearer ${TOKEN}` },
});

// // Function to refresh the access token
// const refreshToken = async () => {
//   try {
//     const response = await axios.post("/refresh", {
//       refreshToken: "your-refresh-token-here",
//     });

//     const newAccessToken = response.data.accessToken;

//     // Update the access token in your application state or storage
//     // ...

//     return newAccessToken;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error;
//   }
// };

// // Axios request interceptor
// userRequest.interceptors.request.use(
//   (config) => {
//     const accessToken = "your-access-token-here"; // Get the access token from your state, storage, or wherever it's stored
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Axios response interceptor
// userRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is due to an expired token and the request hasn't been retried yet
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Refresh the access token
//         const newAccessToken = await refreshToken();

//         // Update the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         // Retry the request with the new token
//         return userRequest(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh error (e.g., redirect to login)
//         console.error("Error refreshing token:", refreshError);
//         throw refreshError;
//       }
//     }

//     // For other errors or if the request has already been retried, reject the promise
//     return Promise.reject(error);
//   }
// );
