import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "../stylesheets/ODEM.css"
import ODEMABI from "../ABI/ODEM.json";

const contractAddress = "0x2f701CeA9b2fF7fFCAaBF304fFD0fD9E23EC4c46";
const bookedLearningExperiences = [];

function ODEM() {
  const [learningExperiences, setLearningExperiences] = useState([]);
  const [selectedlearningExperiences, setSelectedLearningExperiences] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== "undefined") {
        // Use Mist/MetaMask's provider
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        // Get the user's accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        // Get the contract instance
        const contract = new web3.eth.Contract(ODEMABI, contractAddress);
        setContract(contract);

        // Get the learning experiences from the contract
        const numLearningExperiences = await contract.methods.numLearningExperiences().call();
        const learningExperiences = [];
        for (let i = 1; i <= numLearningExperiences; i++) {
          const learningExperience = await contract.methods.getLearningExperience(i).call();
          learningExperiences.push({
            id: i,
            name: learningExperience[0],
            description: learningExperience[1],
            price: learningExperience[2],
            duration: learningExperience[3],
            educator: learningExperience[4],
            isAvailable: learningExperience[5],
          });
        }
        setLearningExperiences(learningExperiences);

      } else {
        console.log("Please install MetaMask!");
      }
    };
    initialize();
  }, []);
  async function bookLearningExperience() {
    const learningExperienceId = prompt("Enter the name of the learning experience:");
    const accounts = await web3.eth.getAccounts();
    const learningExperience = await contract.methods.getLearningExperience(learningExperienceId).call();
    const prior = 0.0001;
    const amount = web3.utils.toWei(prior.toString(), 'ether');
  
    await contract.methods.bookLearningExperience(learningExperienceId).send({
        from: accounts[0],
        value: amount,
        gas: 3000000
      });
      
    
    bookedLearningExperiences.push({
          id: learningExperienceId,
          name: learningExperience[0],
          description: learningExperience[1],
          price: learningExperience[2],
          duration: learningExperience[3],
          educator: learningExperience[4],
          isAvailable: learningExperience[5],
    })
    setSelectedLearningExperiences(bookLearningExperience);
    console.log(`Learning experience ${learningExperienceId} has been booked for address ${accounts[0]}`);

  }

  const createLearningExperience = async () => {
    try {
      const name = prompt("Enter the name of the learning experience:");
      const description = prompt("Enter the description of the learning experience:");
      const price = prompt("Enter the price of the learning experience in wei:");
      const duration = prompt("Enter the duration of the learning experience in seconds:");

      // Call the createLearningExperience function in the contract
      await contract.methods.createLearningExperience(name, description, price, duration).send({ from: accounts[0] });

      // Refresh the learning experiences list
      const numLearningExperiences = await contract.methods.numLearningExperiences().call();
      const learningExperiences = [];
      for (let i = 1; i <= numLearningExperiences; i++) {
        const learningExperience = await contract.methods.getLearningExperience(i).call();
        learningExperiences.push({
          id: i,
          name: learningExperience[0],
          description: learningExperience[1],
          price: learningExperience[2],
          duration: learningExperience[3],
          educator: learningExperience[4],
          isAvailable: learningExperience[5],
        });
      }
      setLearningExperiences(learningExperiences);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLearningExperienceAvailability = async (id) => {
    try {
      // Call the setLearningExperienceAvailability function in the contract
      const learningExperience = learningExperiences.find((learningExperience) => learningExperience.id === id);
      await contract.methods.setLearningExperienceAvailability(id, !learningExperience.isAvailable).send({ from: accounts[0] });

      // Refresh the learning experiences list
      const numLearningExperiences = await contract.methods.numLearningExperiences().call();
      const learningExperiences = [];
      for (let i = 1; i <= numLearningExperiences; i++) {
      const learningExperience = await contract.methods.getLearningExperience(i).call();
      learningExperiences.push({
      id: i,
      name: learningExperience[0],
      description: learningExperience[1],
      price: learningExperience[2],
      duration: learningExperience[3],
      educator: learningExperience[4],
      isAvailable: learningExperience[5],
      });
      }
      setLearningExperiences(learningExperiences);
      } catch (error) {
      console.log(error);
      }
      };
      
      return (
      <div>
        <div>
        <h1>Learning Experiences</h1>
        <button onClick={createLearningExperience}>Create Learning Experience</button>
        <table>
        <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Duration (months)</th>
        <th>Educator</th>
        <th>Is Available</th>
        </tr>
        </thead>
        <tbody>
        {learningExperiences.map((learningExperience) => (
        <tr key={learningExperience.id}>
        <td>{learningExperience.id}</td>
        <td>{learningExperience.name}</td>
        <td>{learningExperience.description}</td>
        <td>{web3.utils.fromWei(learningExperience.price.toString(), "ether")} ETH</td>
        <td>{learningExperience.duration}</td>
        <td>{learningExperience.educator}</td>
        <td>
        <input
        type="checkbox"
        checked={learningExperience.isAvailable}
        onChange={() => toggleLearningExperienceAvailability(learningExperience.id)}
        />
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        <br></br>
    
        <button className="LowerButton" onClick={bookLearningExperience}>Book A Learning Experience</button>
        <button className="LowerButton">Home</button>
        <button className="LowerButton">Raise Funds</button>        
      </div>
      );
      }
      
      export default ODEM;
      
      
      
      
      
      
