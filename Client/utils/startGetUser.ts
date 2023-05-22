import { AuthState } from "../store/authSlice";

import { get } from "./securestore";

const getPersistedAuthValues = async () => {
  let values: AuthState = {
    token: "",
    user: null,
    expiration: "",
  };
  const token = await get("user.token");
  const expiration = await get("user.expiration");
  const user = await get("user.user");
  if (token && expiration && user) {
    values = {
      token,
      expiration,
      user: JSON.parse(user),
    };
  }

  return values;
};

export { getPersistedAuthValues };
