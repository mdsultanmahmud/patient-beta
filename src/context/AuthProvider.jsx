import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import {getAuth, createUserWithEmailAndPassword, updateProfile, 
    signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, sendEmailVerification} from 'firebase/auth'
export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    // create user with email and password 
    const Register = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfie = profie =>{
        setLoading(true)
        return updateProfile(auth.currentUser, profie)
    }
    const Login = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const singOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }

    // sign in with google 
    const googleSign = () =>{
        return signInWithPopup(auth, provider)
    }
    // send email for verify
    const emailVerify = () =>{
        return sendEmailVerification(auth.currentUser)
    } 
    // find current user 
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('current user', currentUser)
            if(currentUser){
                setLoading(false)
                setUser(currentUser)
            }else{
                setLoading(false)
                setUser({})
            }
        })
        return () => unsubscribe()
    } ,[])
    const authInfo = {user,loading,googleSign,Register, updateUserProfie, singOutUser, Login, emailVerify}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;