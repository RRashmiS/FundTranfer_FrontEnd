import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import DonutChart from 'react-donut-chart';
import '../css/landing.css';

function LandingPage() {
    const [user, setUser] = useState("user1");
    const [accounts, SetAccounts] = useState([]);

    useEffect(() => {
        const data = {
            user: user,
        };
        const apiUrl = "https://x2axekjuc4.execute-api.us-east-1.amazonaws.com/dev/ownaccounts";

        axios
            .post(apiUrl, data)
            .then((response) => {
                console.log("Response:", response.data);
                const accountArray = response.data;
                SetAccounts(accountArray);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            <div className="landing-wrapper">
            <h2 className="text-center mt-4">My Accounts</h2>
                <Container>
                    <Row>
                        {accounts.map((account) => (
                            <Col key={account.AccountNumber} md={6}>
                                <Card className="card mt-5">
                                    <Card.Body>
                                        <Card.Title className="card-title"><h6>Account Number: {account.AccountNumber}</h6></Card.Title>
                                        <Card.Text className="card-text">
                                            <h4>Balance Rs: {account.Balance}</h4>
                                            <h6>Credited Rs: {account.Credited}</h6>
                                            <h6>Debited Rs: {account.Debited}</h6>
                                        </Card.Text>
                                        <div className="chart-container">
                                            <DonutChart
                                                data={[
                                                    {
                                                        label: 'Credit',
                                                        value: (account.Credited / (account.Credited + account.Debited)) * 100,
                                                    },
                                                    {
                                                        label: 'Debit',
                                                        value: (account.Debited / (account.Credited + account.Debited)) * 100,
                                                    },
                                                ]}
                                                width={350} 
                                                height={350} 
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default LandingPage;
