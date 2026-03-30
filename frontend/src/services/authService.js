import api from "./api";

export const authService = {
  login: async (username, password) => {
    const data = await api.post("/auth/login", { username, password });
    // Store token and user info in localStorage
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  },

  register: async (userData) => {
    // Note: Backend doesn't have a register endpoint yet
    // This would need to be implemented on the backend
    // For now, we'll just store the registration locally
    const newUser = {
      id: "u" + Date.now(),
      username: userData.email,
      password: userData.password,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      role: userData.userType || "patient",
      token: `mock-jwt-${userData.userType || "patient"}`,
    };
    localStorage.setItem("authToken", newUser.token);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
