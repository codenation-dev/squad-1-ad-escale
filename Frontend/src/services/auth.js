export const TOKEN_KEY = "@buscapet-Token";
export const TOKEN_ID = "@buscapet-ID";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_ID, id);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_ID);

  return true;  
};

