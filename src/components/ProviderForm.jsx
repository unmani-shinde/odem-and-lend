import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ODEMLendABI from "./ABI/ODEMLendABI.json"; // import the ABI of the smart contract
import "./stylesheets/ODEM.css";
const web3 = new Web3(Web3.givenProvider); // initialize web3 using the browser's provider

const ODEMLendAddress = '0x0B9A0709Bd1fDE424Edfe81dA7cDc780aCd2CF90'; // replace with the address of the deployed contract
const ODEMLendContract = new web3.eth.Contract(ODEMLendABI, ODEMLendAddress); // initialize the contract instance
const StatusKey= {
  1:"Pending",
  2:"Approved",
  3:"Rejected",
  4:"Repaid"
}
const myLoansNum =0;
function ProvideForm() {
  const [LoanRequests, setLoanRequests] = useState([]);
  const [OtherLoanRequests, setOtherLoanRequests] = useState([]);
  const [Accounts,setAccounts]= useState('');
  const [dueDate, setDueDate] = useState('');
  const [amountAsked, setAmountAsked] = useState('');
  const [mortgageGiven, setMortgageGiven] = useState('');
  const [otherDetails, setOtherDetails] = useState('');

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== "undefined") {
        // Use Mist/MetaMask's provider
        // Get the user's accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const numLoans = await ODEMLendContract.methods.getNumLoans().call();
        console.log(numLoans);
        CheckOtherLoans();
      } else {
        console.log("Please install MetaMask!");
      }
    };
    initialize();
    
  }, []);

  async function CheckOtherLoans(){
    try{
      const numLoans = await ODEMLendContract.methods.getNumLoans().call();
      const accounts = await web3.eth.getAccounts();

      const temploanRequests = [];

      for (let i = 1; i <= numLoans; i++) { 
        const loan = await ODEMLendContract.methods.getLoanDetails(i).call();
        if(loan[1]!=accounts[0]){
          temploanRequests.push({
            id: i,
            LoanBorrowerName: loan[0],
            LoanBorrower: loan[1],
            LoanStatus: loan[2],
            LoanDuration: loan[3],
            LoanMortgage: loan[4],
            LoanAmount: loan[5],
          });
        }
        else{
            myLoansNum++;
        }
        }
        setOtherLoanRequests(temploanRequests);
        
    }
    catch (error) {
      console.log(error);
    }
};

async function FundALoan(){
    try{
        const accounts = await web3.eth.getAccounts();
        const loanFundID = prompt("Enter the ID of the Loan you wish to Fund:");
        await ODEMLendContract.methods.approveLoan(loanFundID).send({ from: accounts[0] });
    }
    catch (error) {
        console.log(error);
      }
  };
    


  async function CreateLoanRequest() {

    try{
      const numLoans = await ODEMLendContract.methods.getNumLoans().call();
      const loanBorrower = prompt("Enter the name of the Borrower:");
      const loanAmount = prompt("Enter the amount to be Borrowed:");
      const loanDuration = prompt("Enter the duration:");
      const loanMortgage = prompt("Enter the Mortgage:");
      const accounts = await web3.eth.getAccounts();
      const loanBorrowerAccount = accounts[0];
  
      await ODEMLendContract.methods.createLoanRequest(loanAmount, loanBorrower, loanDuration, loanMortgage).send({ from: accounts[0] });
  
        // Refresh the learning experiences list
        
        const loanRequests = [];
        
        for (let i = 1; i <= numLoans; i++) { 
          const loan = await ODEMLendContract.methods.getLoanDetails(i).call();
          loanRequests.push({
            id: i,
            LoanBorrowerName: loan[0],
            LoanBorrower: loan[1],
            LoanStatus: loan[2],
            LoanDuration: loan[3],
            LoanMortgage: loan[4],
            LoanAmount: loan[5],
          });
        }
        setLoanRequests(loanRequests);
        
      }
     catch (error) {
        console.log(error);
      }
  };

  async function GetBalance(){
    try{
        const accounts = await web3.eth.getAccounts();
        const balanceInWei = await web3.eth.getBalance(accounts[0]);
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
        return balanceInEther;
    }
    catch(error){
      console.log(error);
    }
  };


  return (
        <div>
        <h1>Network's Loan Requests</h1>
        
        <br></br>
        <h4>Account Balance:{GetBalance}</h4>
        <button className="LowerButton" onClick={FundALoan}>Fund A Loan Request</button>
        <table className='my-loan-requests-table'>
        <thead>
        <tr>
        <th>ID</th>
        <th>Borrower's Name</th>
        <th>Borrower's Account Address</th>
        <th>Loan Amount</th>
        <th>Loan Duration (seconds)</th>
        <th>Loan Status</th>
        <th>Mortgage</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {OtherLoanRequests.map((LoanRequest) => (
        <tr key={LoanRequest.id}>
        <td>{LoanRequest.id}</td>
        <td>{LoanRequest.LoanBorrowerName}</td>
        <td>{LoanRequest.LoanBorrower}</td>
        <td>{web3.utils.fromWei(LoanRequest.LoanAmount, "ether")}ETH</td>
        <td>{LoanRequest.LoanDuration}</td>
        <td>{StatusKey[LoanRequest.LoanStatus]}</td>
        <td>{LoanRequest.LoanMortgage}</td>        
        <td><button className="LowerButton" onClick={FundALoan}>Accept</button><br></br><button>Reject</button></td>
        </tr>
        ))}
        </tbody>
        </table>
        <br></br><br></br>
        <button className="LowerButton">View Other Loan Requests</button>
        </div>
        );
      }

export default ProvideForm;
