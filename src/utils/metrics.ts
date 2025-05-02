import axios from 'axios';
import { InteractionManager } from 'react-native';

export const loadUrlsWithTTFB = async (url: string) => {
    const startTTFB = performance.now();
    try {
        const response = await axios.get(url);
        const ttfb = performance.now() - startTTFB;

        console.log(`TTFB for ${url}: ${ttfb.toFixed(2)} ms`);

        const data = response.data;

        return {ttfb, data};
    } catch (error) {
        console.error('Error fetching data:', error);
        return -1;
    }
};

export const measureFCP = () => {
    return new Promise<number>((resolve) => {
        const startFCP = performance.now();
        const timeout = setTimeout(() => {
            const fcp = performance.now() - startFCP;
            console.log(`FCP: ${fcp.toFixed(2)} ms`);
            resolve(fcp);
        }, 0);

        return () => clearTimeout(timeout);
    });
};

export const measureTTI = () => {
    return new Promise<number>((resolve) => {
        const startTTI = performance.now();
        const task = InteractionManager.runAfterInteractions(() => {
            const tti = performance.now() - startTTI;
            console.log(`TTI: ${tti.toFixed(2)} ms`);
            resolve(tti);
        });

        return () => task.cancel();
    });
};
