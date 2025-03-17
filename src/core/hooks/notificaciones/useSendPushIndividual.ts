import API from "@/services"
import { useMutation } from "@tanstack/react-query"

function useSendPushIndividual() {
    
    const {isPending, mutate} = useMutation({
        mutationFn: ({
            to,
            title,
            body
        }: {
            to: string,
            title: string,
            body: string
        }) => {
            return API.noti.expo(to, title, body)

        },
        onSettled(data, error, variables, context) {
            console.log(data, error, variables, context)
        },
    })
    
    const sendPush = async(to: string, title: string, body: string) => {
        
        mutate({
            to,
            title,
            body
        })

    }


    return {
        isPending, sendPush
    }
}

export default useSendPushIndividual