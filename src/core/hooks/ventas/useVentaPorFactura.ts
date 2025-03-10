import { useState } from "react";

function useVentasPorFactura(){
    const [search, setSearch] = useState("");

    const buscarVentaPorFactura = (search: string) => {
        console.log(search);
    }

    return {
        search,
        setSearch,
        buscarVentaPorFactura
    }
}
export default useVentasPorFactura;