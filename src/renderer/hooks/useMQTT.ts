import { useEffect, useState } from 'react';
// import mqtt from 'mqtt'
const mqtt = require('mqtt/dist/mqtt');

const useMQTT = (mac: string | undefined, messageCallback: (topic: string, message: string) => void) => {
    const [client, setClient] = useState<any>();

    useEffect(() => {
        if (mac) {
            const client = mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 });

            client.on('connect', () => {
                const GETPILL = `MEDCARE/GETPILL/${mac}`;
                
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

            setClient(client);
        }

        return () => {
            if (client) {
                client.end();
            }
        }
    }, [mac]);
}

export default useMQTT;