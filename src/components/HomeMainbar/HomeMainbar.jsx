import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./HomeMainbar.css"
import { useSelector } from "react-redux"
import Questions from './Questions'
import QuestionList from './QuestionsList'

const HomeMainbar = () => {

    const user = 1;
    const navigate = useNavigate();
    const location = useLocation();
 
    const questionsList = useSelector(state => state.questionsReducer);
    console.log(questionsList);

    // var questionsList = [{
    //     _id: 1,
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
    //     _id: 2,
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
    //     _id: 3,
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

    const checkAuth = () => {
        if (user === null) {
            alert("Login or signup to ask Question ");
            navigate("/Auth/");
        } else {
            console.log(user);
            navigate("/AskQuestion");
        }
    };


    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {location.pathname === "/" ? (
                    <h1>Top Questions</h1>
                ) : (
                    <h1>All Questions</h1>
                )}
                <button onClick={checkAuth} className="ask-btn">
                    AskQuestion
                </button>
            </div>

            <div>
                {questionsList.data === null ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <p>{questionsList.data.length} Questions</p>
                        <QuestionList questionsList={questionsList.data} />
                    </>
                )}
            </div>
        </div>
    )
}

export default HomeMainbar