import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import QRCode from 'qrcode.react';

import './App.css';

const Hello = () => {
    return (
        <div className="container">
            <div className="banner">
                <h1 className="logo">MEDCARE</h1>
            </div>
            <div className="content">
                <QRCode
                    value="Test"
                    size={200}
                />
                <ul className="patient-list">
                    <li className="patient-item">
                        <h4 className="time">08:00</h4>
                        <div className="full-name">
                            <span>นายสมจิตร</span>
                            <span>จงจองหอง</span>
                        </div>
                    </li>                    
                </ul>
            </div>
            {/* <button onClick={() => window.electron.ipcRenderer.callPython()}>
                Call Python
            </button> */}
        </div>
    );
};

export default function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    );
}
