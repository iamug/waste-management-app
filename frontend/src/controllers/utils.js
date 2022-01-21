import AWN from "awesome-notifications";
import API from "./api";
let token = localStorage.getItem("token");
let headers = {
  "Content-Type": "application/json",
  "x-auth-token": token,
};

export const formatAmount = (amount = 0) => {
  return (
    "NGN " +
    parseFloat(amount)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log("Called", reader);
      console.log({ base64: reader.result });
      resolve(reader.result);
    };
    reader.onerror = () => reject(false);
  });
};

export const checkFileLimit = (file, size = 500000) => {
  if (file.size < size) return false;
  return true;
};

export const uploadImage = async (file) => {
  if (checkFileLimit(file)) {
    new AWN().alert("Image should be less than 500kb");
    return false;
  }
  let data = await getBase64(file);
  new AWN().info("Please wait while picture uploads", {
    durations: { info: 0 },
  });
  try {
    const res = await API.post("/upload", { data }, { headers });
    if (res.status !== 200) throw new Error("image upload error");
    if (res.status == 200) {
      new AWN().closeToasts();
      new AWN().success("Picture upload successful");
      return res.data.url;
    }
  } catch (err) {
    console.error(err);
    new AWN().alert("Picture Upload Failed, Kindly try again");
    return false;
  }
};
