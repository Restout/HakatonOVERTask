import { FC } from "react";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

const RoomPage: FC = () => {
    const { roomId } = useParams();

    const meeting = () => async (element: HTMLDivElement) => {
        const appId = process.env.REACT_APP_MEETING_APP_ID;
        const secretKey = process.env.REACT_APP_MEETING_SECRET;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            parseInt(appId as string),
            secretKey as string,
            roomId as string,
            Date.now().toString(),
            "Студент",
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // zp.joinRoom({
        //     container: element,
        //     sharedLinks: [
        //         {
        //             name: "Personal link",
        //             url:
        //                 window.location.protocol +
        //                 "//" +
        //                 window.location.host +
        //                 window.location.pathname +
        //                 "?roomID=" +
        //                 roomID,
        //         },
        //     ],
        //     scenario: {
        //         mode: ZegoUIKitPrebuilt.VideoConference,
        //     },
        // });
    };

    return <div ref={meeting} />;
};

export default RoomPage;
