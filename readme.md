# Simple WebRTC video chat application

Offer and Answer have to be created/added manually

This project is me learning about webrtc and how to create a simple video
chatting application

## WebRTC

WebRTC (Web Real-Time Communication) is a technology that enables peer-to-peer connections between users for real-time communication without the need for an intermediary server for transmitting media or data.

## How does it work?

To establish a connection, the initiating client (the offerer) first sends an "offer" to the other client (the answerer). This offer is a message containing connection information such as IP address, media capabilities (like video format), and other technical details. Upon receiving the offer, the answerer responds with an "answer," which includes its own connection details and preferences. After exchanging the offer and answer, both clients can establish a direct peer-to-peer connection. Once the connection is set up, they can communicate through voice, video, or even send files without the need for a server to relay the data.
