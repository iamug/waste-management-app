import API from "./api";
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token,
  },
};

export async function FetchUsersDataAdmin() {
  if (!token) return false;
  if (token) {
    const res = await API.get("/api/admin/users", config);
    if (!res) return false;
    return res.data;
  }
}

// //export default { GetUserData, LogoutUser };
