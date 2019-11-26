import React from "react";
function Video(props) {
  let mediaConstraints = {
    video: true,
    audio: true
  };
  const onStreaming = () => {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((localStream) => {
      document.getElementById("local_video").srcObject = localStream;
      //localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
    })
    .catch((err) => {alert(err)});
  };
  if (props.state.nick) {
    return (
      <div className = "video">
        <video className = "video-box" id="local_video" autoPlay muted></video>
        <button className = "play-button button" onClick={onStreaming}>Video Call</button>
      </div>
    )
  } else {
    return null;
  }
}
export default Video;