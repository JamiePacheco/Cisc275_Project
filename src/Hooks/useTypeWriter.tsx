import { useEffect, useState } from "react"

export function useTypeWriter(text : string, speed = 30) {

        const [displayText, setDisplayText] = useState("")
        
        
        useEffect(() => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (text !== undefined && i < text.length) {
                    setDisplayText((text.substring(0, i + 1)));
                    ++i;
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