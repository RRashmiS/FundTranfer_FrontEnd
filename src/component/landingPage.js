import axios from "axios";
import { useEffect,useState } from "react";
import {Button, Container,Card,Row,Col} from 'react-bootstrap';
import DonutChart from 'react-donut-chart';
import '../css/landing.css'

function LandingPage() {
    const [user,setUser] = useState("user1")
    const [accounts,SetAccounts] = useState([])
  
    useEffect(()=>{
        const data = {
            user:user,   
          };
        const apiUrl = "https://x2axekjuc4.execute-api.us-east-1.amazonaws.com/dev/ownaccounts"; 
        
        axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle the response data here, if needed
        console.log("Response:", response.data);
        const accountArray = response.data
        SetAccounts(accountArray)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
      
      
    },[])
   
    return (
        <div>
           <div className="landing-wrapper">
            <Container>
      <Row>
      {accounts.map((account) => (
        <Col md={5}>
          <Card className="card mt-5">
            <Card.Body>
              <Card.Title className="card-title"><h4>Account Number:{account.AccountNumber}</h4></Card.Title>
              <Card.Text className="card-text">
               <h3>Balance Rs:{account.Balance}</h3>
              </Card.Text>
              <div className="donut-chart-container">
              <DonutChart
                    data={[
                        {
                        label: 'Credit',
                        value:  (account.Credited / (account.Credited + account.Debited)) * 100,
                        },
                        {
                        label: 'Debit',

                        value: (account.Debited / (account.Credited + account.Debited)) * 100,
                        // isEmpty: true,
                        },
                        
                    ]}
                    
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
    )
}
export default LandingPage;