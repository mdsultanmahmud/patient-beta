import { useEffect, useState } from "react"

const useAdmin = email =>{
    const [isAdmin, setIsAdmin] = useState('')
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    if(email){
        useEffect(() =>{
            fetch(`https://patient-beta-server.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
            })
        },[email])
    }

    return [isAdmin, isAdminLoading]
}

export default useAdmin