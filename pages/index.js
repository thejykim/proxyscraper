import Head from 'next/head'

import GlobalNavbar from '../components/GlobalNavbar';
import { Container, Jumbotron } from 'react-bootstrap';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <GlobalNavbar />

            <Jumbotron>
                <Container>
                    <h1>Hello, world!</h1>

                    <p>This is a free proxy scraper.</p>
                </Container>
            </Jumbotron>
        </div>
    )
}
