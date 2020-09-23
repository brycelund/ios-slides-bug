import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import './Home.css'

const Settings = ({ history }) => {
  const toHome = () => {
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div onClick={toHome}>Go To Home</div>
      </IonContent>
    </IonPage>
  )
}

export default Settings
