import { useMutation } from "@tanstack/react-query";

function useClienteFarma() {

    const { isPending, data } = useMutation({
        mutationFn: (newTodo) => 
      })

    return {
        isPending,
        data
    }
}

export default useClienteFarma;