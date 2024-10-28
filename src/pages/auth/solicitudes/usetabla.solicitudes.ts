function useTablaSolicitudes() {
    const ancho = window.innerWidth > 1380 ? 1380 : window.innerWidth - 60;
    const cabeceras: { label: string; key: string }[] = [
        { label: "id", key: "id" },
        { label: "cedula", key: "cedula" },
        { label: "Nombre", key: "name" },
        { label: "Celular", key: "celular" },
        { label: "Solicitado", key: "solicitado" },
        { label: "Fecha", key: "fecha" },
      ];

    return {ancho, cabeceras}
}

export default useTablaSolicitudes;