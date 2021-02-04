import Head from 'next/head'
import React from 'react';

const axios = require('axios').default;

import GlobalNavbar from '../components/GlobalNavbar';
import { Container, Jumbotron } from 'react-bootstrap';

export default function Proxies() {
    const [proxies, setProxies] = React.useState(null);

    React.useEffect(() => {
        axios.get('api/proxies').then((res) => {
            const parsedProxies = res.data.split('\n');
            setProxies(parsedProxies);
        })
    }, []);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <GlobalNavbar />

            <Jumbotron>
                <Container>
                    <h1>Proxies</h1>

                    <p>Just press download.</p>
                </Container>
            </Jumbotron>

            <Container>
                {proxies ? (
                    <div>
                        <p>We found <strong>{proxies.length}</strong> working HTTP proxies.</p>

                        {proxies.map((proxy) => {return <p>{proxy}</p>})}
                    </div>
                ) : <p>One sec. Fetching the proxies.</p>}
            </Container>
        </div>
    )
}
