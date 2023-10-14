import './App.css';
import Student from './containers/Student';

function App() {
  return (
    <div className="App">
      <Student />
      <div className='Powered'>
        <p><b>Powered by</b></p>
        <img src="/cs.png" alt='CS Club'/>
      </div>
    </div>
  );
}

export default App;
