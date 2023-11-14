import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import QuestionDetails from "./QuestionDetails";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/question";

const DisplayAnswer = ({ question, handleShare }) => {
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers));
  };

  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const handleLoadedMetadata = (event) => {
    const video = videoRef.current;
    const clickX = event.nativeEvent.offsetX;
    const videoWidth = video.offsetWidth;

    if (event.detail === 2) {
        // Double-click event
        if (video.requestFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            video.requestFullscreen();
          }
        } else if (video.mozRequestFullScreen) {
          if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
          } else {
            video.mozRequestFullScreen();
          }
        } else if (video.webkitRequestFullscreen) {
          if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
          } else {
            video.webkitRequestFullscreen();
          }
        }
      } else {
        if (clickX < videoWidth / 3) {
          // User clicked on the left third of the video
          video.currentTime -= 10; // Go back 10 seconds
        } else if (clickX > (2 * videoWidth) / 3) {
          // User clicked on the right third of the video
          video.currentTime += 10; // Go forward 10 seconds
        } else {
          // User clicked in the middle third of the video
          if (video.paused) {
            videoRef.current.play(); // Play if paused
          } else {
            videoRef.current.pause(); // Pause if playing
          }
        }
      }
    setIsVideoReady(true);
  };
  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoReady]);

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          {ans.answerVideo == "" ? (
            <></>
          ) : (
            <>
              <video
                src={ans.answerVideo}
                ref={videoRef}
                className="w-full h-full"
                controls
                style={{ width: 700, height: 300, border: "2px black solid" }}
                onClick={handleLoadedMetadata}
              />
            </>
          )}
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {user?.result?._id === ans.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link to={`/Users/${ans.userId}`} className="user-link">
                <Avatar backgroundColor="orange" px="5px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
