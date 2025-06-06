
import PermisosModal from "./_modals/permisos";
import MainUsers from "./main";
import UsersProvider from "./provider";

function Users() {
    return <UsersProvider>
        <MainUsers />
        <PermisosModal />
    </UsersProvider>
}
export default Users