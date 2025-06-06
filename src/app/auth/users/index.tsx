
import MainUsers from "./main";
import UsersProvider from "./provider";

function Users() {
    return <UsersProvider>
        <MainUsers />
    </UsersProvider>
}
export default Users