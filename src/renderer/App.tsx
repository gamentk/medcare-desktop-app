import { useEffect, useState, useRef } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import QRCode from 'qrcode.react';
import useMQTT from './hooks/useMQTT';
import './App.css';
import Appointments from './models/Appointments';
import axios from 'axios';

const Hello = () => {
    const [mac, setMac] = useState<string | undefined>();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [originalAppointments, setOriginalAppointments] = useState<Appointments[] | undefined>();
    const [appointments, setAppointments] = useState<Appointments[] | undefined>();
    const interval = useRef<any>();
    useMQTT(mac, onMessage);

    // Listening mac address
    useEffect(() => {
        window.electron.ipcRenderer.myPing();

        window.electron.ipcRenderer.once('ipc-example', (arg) => {
            setMac(arg as string);
        });
    }, []);

    // Fetch appointments when already has a mac address
    useEffect(() => {
        if (mac) {
            fetchAppointments();
        }
    }, [mac]);

    // Initialize timer
    useEffect(() => {
        interval.current = setInterval(() => {
            const date = new Date();
            setCurrentDate(date);
        }, 1000);

        return () => {
            clearInterval()
        }
    }, []);

    // Sort every second and alert when pill ready
    useEffect(() => {
        if (appointments) {
            const currentTime = currentDate.toLocaleTimeString('th-Th');

            if (appointments[0]?.apmt_time === currentTime) {
                window.electron.ipcRenderer.callTTS(`${appointments[0].u_first_name} ${appointments[0].u_last_name} กรุณารับยาค่ะ`);
            }
            
            const sortedAppointments = sortAppointmentsTime(appointments);
            setAppointments(sortedAppointments);
        }
    }, [currentDate]);

    async function fetchAppointments() {
        try {
            const { data } = await axios.get('https://medcare-server.herokuapp.com/v1/appointments/machines', {
                params: {
                    m_mac_address: mac
                }
            });
            // console.log(data)
            const sortedAppointments = sortAppointmentsTime(data.result);

            setOriginalAppointments(data.result);
            setAppointments(sortedAppointments);
        } catch (error) {
            console.log(JSON.stringify(error));                    
        }
    }
    
    function sortAppointmentsTime(appointments: Appointments[]): Appointments[] {
        const currentTime = currentDate.toLocaleTimeString('th-Th');
        const [currentHours, currentMinutes] = currentTime.split(':');
        const copyAppointments = [...appointments];
        let isWaitForNewDay = false;
        
        for (const [index, appointment] of appointments.entries()) {
            const [hours, minutes] = appointment.apmt_time.split(':');
            
            let dateA = new Date(2000, 0, 1, Number(currentHours), Number(currentMinutes));
            let dateB = new Date(2000, 0, 1, Number(hours), Number(minutes));

            let diffMinutes = ((dateA.getTime() - dateB.getTime()) * Math.pow(10, -3)) / 60;
            
            if (diffMinutes >= 30) {
                copyAppointments.push(copyAppointments.shift()!);

                if ((index + 1) === appointments.length) {
                    isWaitForNewDay = true;
                }
            } else {
                break;
            }
        }

        if (isWaitForNewDay && originalAppointments) {
            return originalAppointments!;
        }

        return copyAppointments;
    }

    function onMessage(topic: string, message: string) {
        switch (topic) {
            case 'MEDCARE/PING':
                console.log('ping');
                fetchAppointments();
                break;
            case `MEDCARE/GETPILL/${mac}`:
                console.log('Slot ->', message);
                window.electron.ipcRenderer.callPython(Number(message));
                break;
            default:
                break;
        }
    }
    
    return (
        <div className="container">
            <div className="banner">
                <h1 className="logo">MEDCARE</h1>
            </div>
            <div className="content">
                <div className="main">
                    <h1 className="timer">{currentDate && currentDate.toLocaleTimeString('th-Th')}</h1>
                    <h1 className="mac-address">{mac && mac}</h1>
                    <QRCode
                        value="/v1/appointments/getpill"
                        size={300}
                        bgColor="#ffffff"
                    />
                </div>
                <div className="appointments">
                    <ul className="patient-list">
                        {
                            appointments
                            && appointments.map(appointment => (
                                <li 
                                    key={appointment.apmt_id} 
                                    className="patient-item"
                                >
                                    <h4 className="time">{appointment.apmt_time}</h4>
                                    <div className="full-name">
                                        <span>{appointment.u_first_name}</span>
                                        <span>{appointment.u_last_name}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
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
