import { useLocation } from "react-router-dom";

export default function DetalleDispositivo() {

    const location = useLocation();
    location.state;

    console.log(location.state)

    return <></>
}