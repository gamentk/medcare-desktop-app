import { useEffect, useState } from 'react';
const mqtt = require('mqtt/dist/mqtt');

const useMQTT = (messageCallback: (topic: string, message: string) => void) => {
    const [client] = useState(mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 }));

    useEffect(() => {
        client.on('connect', () => {
            const GETPILL = 'MEDCARE/GETPILL/b4:6b:fc:61:c4:39';
            
            client.subscribe(GETPILL, (error: any) => {
                if (!error) {
                    console.log(`Subscribe to ${GETPILL}`);
                } else {
                    console.log(`Cannot subscribe to ${GETPILL}`);
                }
            });
        });

        client.on('message', (topic: string, payload: Buffer) => {
            const message = payload.toString();
            console.log(`${topic}: ${message}`);

            messageCallback(topic, message);
        });

        return () => {
            client.end();
        }
    }, []);
}

export default useMQTT;