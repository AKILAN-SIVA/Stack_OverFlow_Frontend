import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import copy from "copy-to-clipboard";
import up from "../../assets/up.svg";
import circleup from "../../assets/circle-up.svg";
import circledown from "../../assets/circle-down.svg";
import down from "../../assets/down.svg";
import moment from "moment";
import Avatar from "../../components/Avatar/Avatar";
import "./Questions.css"
import DisplayAnswer from "./DisplayAnswer"
import { useSelector, useDispatch } from 'react-redux';
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question.js"
import crypto from "crypto-js";

const QuestionDetails = () => {

    const { id } = useParams();

    const questionsList = useSelector(state => state.questionsReducer);
    console.log(questionsList);
    const user = useSelector((state) => state.currentUserReducer);
    const [Answer, setAnswer] = useState("");
    const [Video, setVideo] = useState(null);
    const [AnswerVideo, setAnswerVideo] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const url = "http://localhost:3000";

    const handleShare = () => {
        copy(url + location.pathname);
        alert(`Link copied \n url : ${url + location.pathname} `);
    };

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    };

    const handleUpVote = () => {
        dispatch(voteQuestion(id, "upVote", user.result._id));
    };

    const handleDownVote = () => {
        dispatch(voteQuestion(id, "downVote", user.result._id));
    };

    async function handleFile(e) {
        var file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                const base64Video = e.target.result;
                //   const hash = hashWithSHA256(base64Video);
                setAnswerVideo(base64Video);
                console.log(base64Video);
            };
        }
    }



    // const hashWithSHA256 = (input) => {
    //     return crypto.SHA256(input).toString();
    // };


    async function handlePosAns(e, answerLength) {
        e.preventDefault();
        if (user === null) {
            alert("Login to Answer !");
            navigate("/Auth");
        } else {
            if (Answer === "") {
                alert(" The answer cant be empty !");
            } else {
                dispatch(
                    postAnswer({
                        id,
                        noOfAnswers: answerLength,
                        answerBody: Answer,
                        answerVideo: AnswerVideo,
                        userAnswered: user.result.name,
                        userId: user.result?._id,
                    })
                );
            }
        }
    }

    // var questionsList = [{
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 3,
    //     questionTitle: "what is function",
    //     questionBody: "it meant to be",
    //     questionTags: ["java", "node js", "react js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'Kumar',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // },
    // {
    //     _id: '2',
    //     upVotes: 5,
    //     downVotes: 1,
    //     noOfAnswers: 3,
    //     questionTitle: "what is function",
    //     questionBody: "it meant to be",
    //     questionTags: ["java", "node js", "react js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'Kumar',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // },
    // {
    //     _id: '3',
    //     upVotes: 10,
    //     downVotes: 5,
    //     noOfAnswers: 3,
    //     questionTitle: "what is function",
    //     questionBody: "it meant to be",
    //     questionTags: ["java", "node js", "react js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'Kumar',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }]


    return (
        <div className="question-detail-page">
            {
                questionsList.data === null ?
                    <h1>Loading...</h1>
                    :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>
                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className="question-details-container-2">
                                            <div className="question-votes">
                                                <img
                                                    src={up}
                                                    alt="up-arrow"
                                                    width="20"
                                                    className="votes-icon"
                                                    onClick={handleUpVote}
                                                />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img
                                                    src={down}
                                                    alt="down-arrow"
                                                    width="20"
                                                    className="votes-icon"
                                                    onClick={handleDownVote}
                                                />
                                            </div>

                                            <div style={{ width: "100%" }}>
                                                <p className="question-body">{question.questionBody}</p>
                                                <div className="question-details-tags">
                                                    {question.questionTags.map((tag) => (
                                                        <p>{tag} </p>
                                                    ))}
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type="button" onClick={handleShare}>
                                                            Share
                                                        </button>
                                                        {user?.result?._id === question?.userId && (
                                                            <button type="button" onClick={handleDelete}>
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="ask">
                                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                                        <Link
                                                            to={`/Users/${question.userId}`}
                                                            className="user-link"
                                                        >
                                                            <Avatar backgroundColor="orange" px="5px" py="5px">
                                                                {question.userPosted.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <div>{question.userPosted}</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                        </section>
                                    )}
                                    <section className="post-ans-container">
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => { handlePosAns(e, question.answer.length) }}
                                        >
                                            <textarea
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="10"
                                                onChange={(e) => setAnswer(e.target.value)}
                                            ></textarea>
                                            <br />
                                            <input
                                                type="file"
                                                name="file"
                                                className=""
                                                onChange={handleFile}
                                                accept=".mp4"
                                            />
                                            <br />
                                            <input
                                                type="submit"
                                                className="post-ans-btn"
                                                value="Post your Answer"
                                            ></input>
                                        </form>
                                        <p>
                                            Not the answer you're looking for? Browse other questions
                                            Tagged
                                            {question.questionTags.map((tag) => (
                                                <Link to="/Tags" key={tag} className="ans-tags">
                                                    {" "}
                                                    {tag}{" "}
                                                </Link>
                                            ))}
                                            <br />
                                            or
                                            <br />{" "}
                                            {
                                                <Link
                                                    to="/AskQuestion"
                                                    style={{ textDecoration: "none", color: "#009dff" }}
                                                >
                                                    ask your own question
                                                </Link>
                                            }
                                        </p>
                                    </section>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default QuestionDetails