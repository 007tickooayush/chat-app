/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

// creating context API to avoid 'prop drilling'
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;

    const authOnSub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        console.log('authObj.uid', authObj.uid);

        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', snapshot => {
          // log entire snapshot
          // console.log('snapshot', snapshot);

          const { name, createdAt, avatar } = snapshot.val();

          const profileData = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          // log profileData
          // console.log('profileData', profileData);

          setProfile(profileData);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // using couble negation to convert into a boolean
          if (!!snapshot.val() === false) {
            return;
          }
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authOnSub();

      // unsubsrcibe from user reference
      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }

      database.ref('.info/connected').off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
