import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import QRCode from 'qrcode.react';
import useMQTT from './hooks/useMQTT';
import './App.css';

const Hello = () => {
    const [mac, setMac] = useState<string>('');
    
    useMQTT(onMessage);
    window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
        console.log(arg);
        setMac(arg as string)
    });
    window.electron.ipcRenderer.myPing();

    console.log('mac ->', mac)

    function onMessage(topic: string, message: string) {
        console.log(message)
        // window.electron.ipcRenderer.callPython(Number(message));
    }
    
    return (
        <div className="container">
            <div className="banner">
                <h1 className="logo">MEDCARE</h1>
            </div>
            <div className="content">
                <h1>{mac && mac}</h1>
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
