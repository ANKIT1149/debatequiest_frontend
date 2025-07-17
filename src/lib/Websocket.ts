export class WebSocketClient{
    private ws: WebSocket | null = null
    private onMessage: (data: { message: string, data: any, audio: string }) => void
    private onError: (error: string) => void;

    constructor(
        companionId: string,
        userId: string,
        onMessage: (data: { message: string; data: any; audio: string }) => void,
        onError: (error: string) => void
    ) {
        this.onMessage = onMessage;
        this.onError = onError;
        this.connect(companionId, userId);
    }

    private connect(companionId: string, userId: string) {
        this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/interactions/${companionId}/${userId}`);
        this.ws.onopen = () => console.log("websocket Connected")
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            this.onMessage(data)
        }
        this.ws.onerror = () => this.onError('WebSocket error');
       this.ws.onclose = () => console.log('WebSocket disconnected'); 
    }

    sendAudio(audio: ArrayBuffer) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(audio)
        }
    }

    close() {
        if (this.ws) {
            this.ws.close()
        }
    }
}