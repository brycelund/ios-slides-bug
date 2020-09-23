import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import Swiper from '../components/Swiper'
import './Home.css'

const Home = ({ history }) => {
  const toSettings = () => {
    history.push('/settings')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div onClick={toSettings}>Go To Settings</div>
        <Swiper />
      </IonContent>
    </IonPage>
  )
}

export default Home
