import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [isVKUser, setIsVKUser] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id, isVKUser) => {
        setToken(jwtToken)
        setUserId(id)
        setIsVKUser(isVKUser)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, isVKUser: isVKUser,
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsVKUser(false)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.isVKUser)
        }
        setReady(true);
    }, [login])

    return {login, logout, token, userId, isVKUser, ready}

}