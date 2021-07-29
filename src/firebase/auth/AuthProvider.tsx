import React, {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import firebase from "firebase/app";
import {auth} from "../firebase";

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged((firebaseUser: React.SetStateAction<firebase.User | null>) => {
            setUser(firebaseUser);
        });
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};