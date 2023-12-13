import React from 'react';
import Logo from '../../assets/ESCUELA-TELECOMUNICACIONES-UNSA-878x426.jpg'
import styles from './styles/Home.module.css';

function Home(props) {
    return (
        <div className={styles.container}>
            <div>
                <img src={Logo} alt="logo" className={styles.image} />
            </div>

        </div>
    );
}

export default Home;