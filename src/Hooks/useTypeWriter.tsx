import { useEffect, useState } from "react"

export function useTypeWriter(text : string, speed = 50) {

        const [displayText, setDisplayText] = useState("")

        useEffect(() => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText((prevText: string) => prevText + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            
            return () => {
                clearInterval(typingInterval);
            };
        }, [text, speed]);

    return displayText;
}