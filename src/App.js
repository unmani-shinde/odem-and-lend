import './App.css';
// import Borrower from './components/Borrower';
import LoanRequestForm from './components/LoanRequestForm';
import ProviderForm from './components/ProviderForm';
import Lender from './components/Lender';
import ODEM from './components/ODEM/ODEM.jsx';
// import ProgressTracker from './components/ODEM/ProgressTracker';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <ODEM></ODEM>
      </div>
    </div>
  );
}

export default App;
