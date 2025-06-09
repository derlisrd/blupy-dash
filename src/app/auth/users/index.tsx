
import AddModal from "./_modals/add";
import PermisosModal from "./_modals/permisos";
import MainUsers from "./main";
import UsersProvider from "./provider";

function Users() {
    return <UsersProvider>
        <MainUsers />
        <PermisosModal />
        <AddModal />
    </UsersProvider>
}
export default Users