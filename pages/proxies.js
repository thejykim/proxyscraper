import Head from 'next/head'
import React from 'react';

const axios = require('axios').default;

import GlobalNavbar from '../components/GlobalNavbar';
import { Alert, Button, Card, Row, Col, Container, Form, Jumbotron, Spinner } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Proxies() {
    const [isScraping, setIsScraping] = React.useState(false);
    const [proxies, setProxies] = React.useState(null);
    const [type, setType] = React.useState('HTTP');
    const [prevType, setPrevType] = React.useState(null);
    const [checktime, setChecktime] = React.useState(10);

    const getProxies = () => {
        setIsScraping(true);
        setProxies(null);
        setPrevType(type);

        axios.get('api/proxies?type=' + type + '&timeout=' + checktime).then((res) => {
            setProxies(res.data.replace(/\n\s*\n/g, '\n'));
            setIsScraping(false);
        });
    }

    const updateSettings = (e) => {
        console.log(e.target.id);
        if (e.target.id === 'type') {
            setType(e.target.value)
        } else if (e.target.id === 'checktime') {
            setChecktime(e.target.value)
        }
    }

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
                <Row>
                    <Col>
                        <Card body className="shadow-sm">
                            <h4>Settings</h4>

                            <br />

                            <Form inline>
                                <Form.Group>
                                    <Form.Label><span style={{ marginBottom: '0', marginRight: '0.5rem' }}>Search for</span></Form.Label>
                                    <Form.Control as="select" id='type' value={type} onChange={(e) => updateSettings(e)}>
                                        <option>HTTP</option>
                                        <option>HTTPS</option>
                                    </Form.Control>
                                    <Form.Label><span style={{ marginBottom: '0', marginLeft: '0.5rem' }}>proxies</span></Form.Label>
                                </Form.Group>
                            </Form>

                            <hr />

                            <Form inline>
                                <Form.Group>
                                    <Form.Label><span style={{ marginBottom: '0', marginRight: '0.5rem' }}>Time out after</span></Form.Label>
                                    <Form.Control as="select" id='checktime' value={checktime} onChange={(e) => updateSettings(e)}>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>60</option>
                                    </Form.Control>
                                    <Form.Label><span style={{ marginBottom: '0', marginLeft: '0.5rem' }}>seconds</span></Form.Label>
                                </Form.Group>
                            </Form>
                        </Card>

                        <br />

                        <div className="d-flex justify-content-center">
                            <Button variant='dark' className="w-50" onClick={getProxies} disabled={isScraping}>
                                {isScraping ? 'Searching' : 'Search'}
                            </Button>
                        </div>
                    </Col>

                    <Col>
                        {proxies ? (
                            <div>
                                <Alert variant='dark'>
                                    We found <strong>{proxies.split('\n').length}</strong> working {prevType} proxies. Not too shabby.
                                </Alert>

                                <Form.Control as="textarea" value={proxies} rows={10} />
                            </div>
                        ) : isScraping ? (
                            <div className="d-flex justify-content-center" style={{ padding: '3rem 1rem'}}>
                                <div className="text-center">
                                    <Spinner animation='border' variant='dark' />
                                    <p style={{ marginTop: '1rem' }}>Checking your proxies. Depending on your timeout setting, this could take up to a couple minutes.</p>
                                </div>
                            </div>
                        ) : null}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
