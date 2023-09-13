import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import swal from 'sweetalert';
import 'bootstrap';
import '../css/transfer.css'

function TransferPage() {
  const [payerAcc, setPayerAcc] = useState("");
  const [payeeAcc, setPayeeAcc] = useState("");
  const [rePayeeAcc, setRePayeeAcc] = useState("");
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState("user1");
  const [errors, setErrors] = useState({});
  const[accounts,setAccounts] = useState([])

    useEffect(() => {
        const data = {
            user: user,
        };
        const apiUrl = "https://x2axekjuc4.execute-api.us-east-1.amazonaws.com/dev/ownaccounts";

        axios
            .post(apiUrl, data)
            .then((response) => {
                const accountArray = response.data;
                setAccounts(accountArray);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
  function tranferMoney(e) {
    e.preventDefault();

    if (payeeAcc != rePayeeAcc) {
      swal("Failed", "Payee Account Numbers doesn't match", "error");
    } else {
      
      const apiUrl =
        "https://x2axekjuc4.execute-api.us-east-1.amazonaws.com/dev/transaction";

      const data = {
        accountNumPayer: payerAcc,
        userIdPayer: user,
        accountNumPayee: payeeAcc,
        userIdPayee: user,
        amount: amount,
      };
      console.log(data);
      axios
        .post(apiUrl, data)
        .then((response) => {
          console.log("Response:", response.data);
          // alert(response.data.message)
          swal("SUCCESS", response.data.message, "success");
          
        })
        .catch((error) => {
          // alert("Transaction Failed")
          swal("Failed", "Trasaction Failed", "error");
          
        
        });
    }
  }
  return (
   
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-6 ">
      <div className="transfer-wrapper">
        <h2 className="text-center">Fund Transfering Form</h2>
        <form className="transfer-form">
        <div className="form-group">
  <label htmlFor="myaccount">My Account Number</label>
  <select
    className="form-control"
    id="myaccount"
    onChange={(e) => setPayerAcc(e.target.value)}
    required
  >
    <option value="">Select an Account</option>
    {accounts.map((account) => (
      <option key={account.AccountNumber} value={account.AccountNumber}>
        {account.AccountNumber}
      </option>
    ))}
  </select>
</div>


          <div className="form-group">
           
            <input
              className="form-control"
              type="number"
              id="payeeacc"
              placeholder="Payee account number"
              onChange={(e) => setPayeeAcc(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
           
            <input
              className="form-control"
              type="number"
              id="repayeeacc"
              placeholder="Re-enter payee account number"
              onChange={(e) => setRePayeeAcc(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            
            <input
              className="form-control"
              type="number"
              id="amount"
              placeholder="Amount Rs."
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            type="button"
            onClick={tranferMoney}
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  </div>


  </div>
  
  );
}
export default TransferPage;
