export type ChatMessageType = 'message' | 'connect' | 'disconnect';
export const ChatMessageType = {
    Message: 'message' as ChatMessageType,
    Connect: 'connect' as ChatMessageType,
    Disconnect: 'disconnect' as ChatMessageType,
}

export interface ChatMessage {
    type: ChatMessageType;
    message: string;
    sender: string;
}
