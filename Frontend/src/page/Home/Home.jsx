import React from 'react';
import Logo from '../../assets/ESCUELA-TELECOMUNICACIONES-UNSA-878x426.jpg'
import styles from './styles/Home.csx';

function Home(props) {
    return (
        <div style={styles.container}>
            <div>
                <img src={Logo} alt="logo" style={styles.image} />
            </div>

        </div>
    );
}

export default Home;