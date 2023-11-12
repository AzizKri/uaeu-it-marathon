import './App.css';
import InfoPage from './containers/InfoPage';
import Schedule from './containers/Schedule';

function App() {
    const location = window.location.href.split("/");
    const path = location[location.length - 1];

    if (path.toLowerCase() === 'schedule') {
        return (
            <div className="App">
                <Schedule />
            </div>
        );
    } else {
        return (
            <div className="App">
                <InfoPage />
            </div>
        );
    }
}

export default App;
