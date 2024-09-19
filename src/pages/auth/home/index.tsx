
import HomePage from "./page";
import HomeProvider from "./provider";

function Home() {

    return (<HomeProvider>
        <HomePage />
    </HomeProvider>);
}

export default Home;