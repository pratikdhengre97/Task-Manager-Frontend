import API from '../api/axios'

export const signup = (data) => API.post("/auth/signup", data);

// export const login = async (data) => {
//     const res = await API.post("/auth/login", data);
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.role)

//     return res.data;
// };

export const login = (data) => {
  return API.post("/auth/login", data);
};