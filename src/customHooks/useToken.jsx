import { useEffect, useState } from "react"
const useToken = email => {
    const [token, setToken] = useState('')
    useEffect(() =>{
        fetch(`https://patient-beta-server.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.success){
                localStorage.setItem('accessToken', data.accessToken)
                setToken(data.accessToken)
            }
        })
    } ,[email])
    return [token]
}

export default useToken