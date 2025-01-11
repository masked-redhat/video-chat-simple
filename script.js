let localStream, remoteStream, peerConnection;

const user1 = document.getElementById("user-1");
const user2 = document.getElementById("user-2");

const offerTextArea = document.getElementById("sdp-offer");
const answerTextArea = document.getElementById("sdp-answer");

const createOfferButton = document.getElementById("create-offer");
const createAnswerButton = document.getElementById("create-answer");

const addAnswerButton = document.getElementById("add-answer");

const servers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  user1.srcObject = localStream;
};

const createPeerConnection = (textArea) => {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  user2.srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = async (event) => {
    event.streams[0].getTracks().forEach((track) => {
      if (!remoteStream.getTracks().includes(track)) {
        remoteStream.addTrack(track);
      }
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("ICE Candidate:", event.candidate);
    } else {
      console.log("ICE Gathering complete. No more candidates.");
      textArea.value = JSON.stringify(peerConnection.localDescription);
    }
  };

  peerConnection.oniceconnectionstatechange = () => {
    console.log("ICE Connection State:", peerConnection.iceConnectionState);
  };

  peerConnection.onicegatheringstatechange = () => {
    console.log("ICE Gathering State:", peerConnection.iceGatheringState);
  };
};

const makeOffer = async () => {
  createPeerConnection(offerTextArea);

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
};

const createAnswer = async () => {
  createPeerConnection(answerTextArea);

  let offer = offerTextArea.value;
  if (!offer) return alert("Get the offer from other device first");

  offer = JSON.parse(offerTextArea.value);
  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
};

const addAnswer = async () => {
  let answer = answerTextArea.value;
  if (!answer) return alert("Get the answer from the other device first");

  answer = JSON.parse(answerTextArea.value);

  if (!peerConnection.currentRemoteDescription)
    await peerConnection.setRemoteDescription(answer);
};

createOfferButton.addEventListener("click", makeOffer);
createAnswerButton.addEventListener("click", createAnswer);
addAnswerButton.addEventListener("click", addAnswer);

init();
