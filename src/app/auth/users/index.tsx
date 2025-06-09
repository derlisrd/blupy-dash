
import AddModal from "./_modals/add";
import PermisosModal from "./_modals/permisos";
import ResetPasswordModal from "./_modals/resetpassword";
import MainUsers from "./main";
import UsersProvider from "./provider";

function Users() {
    return <UsersProvider>
        <MainUsers />
        <PermisosModal />
        <AddModal />
        <ResetPasswordModal />
    </UsersProvider>
}
export default Users