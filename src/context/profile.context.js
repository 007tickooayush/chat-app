/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, database } from '../misc/firebase';

// creating context API to avoid 'prop drilling'
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userRef;

        const authOnSub = auth.onAuthStateChanged(authObj => {
            //   console.log('authObj',authObj)

            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`);

                userRef.on('value', snapshot => {
                    // console.log('snapshot', snapshot);

                    const { name, createdAt } = snapshot.val();
                    // console.log('profData', profData);

                    const profileData = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email,
                    };

                    setProfile(profileData);
                    setIsLoading(false);
                });
            } else {
                if(userRef){
                    userRef.off();
                }

                setProfile(null);
                setIsLoading(false);
            }
        });
        return () => {
            authOnSub();

            // unsubsrcibe from user reference
            if(userRef){
                userRef.off();
            }
        };
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
