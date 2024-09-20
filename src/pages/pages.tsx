import PublicPages from "./public";
import AuthPages from "./auth";
import userDataHook from "../store/user_data_store";

function Pages() {
  const { isAuth } = userDataHook();

  return isAuth ? <AuthPages /> : <PublicPages />;
}

export default Pages;
