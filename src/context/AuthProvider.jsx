import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import {getAuth, createUserWithEmailAndPassword, updateProfile, 
    signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    // create user with email and password 
    const Register = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfie = profie =>{
        return updateProfile(auth.currentUser, profie)
    }
    const Login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const singOutUser = () =>{
        return signOut(auth)
    }
    // find current user 
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('current user', currentUser)
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser({})
            }
        })
        return () => unsubscribe()
    } ,[])
    const authInfo = {user, Register, updateUserProfie, singOutUser, Login}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;