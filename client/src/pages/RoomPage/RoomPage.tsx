import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

export default function RoomPage() {
    const { roomId } = useParams();
    let myMeeting = async (element: HTMLDivElement) => {
        // generate Kit Token
        const appID = process.env.REACT_APP_MEETING_APP_ID;
        const serverSecret = String(process.env.REACT_APP_MEETING_SECRET);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            parseInt(appID as string),
            serverSecret,
            roomId as string,
            Date.now().toString(),
            "Student",
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Personal link",
                    url: `http://localhost:3000/room/${roomId}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            showRemoveUserButton: true,
            showTurnOffRemoteCameraButton: true,
            showTurnOffRemoteMicrophoneButton: true,
        });
    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: "100vw", height: "100vh" }}
        ></div>
    );
}
