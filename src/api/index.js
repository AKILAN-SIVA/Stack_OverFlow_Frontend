import axios from 'axios';


const API = axios.create({ baseURL: 'https://stackoverflow-r1wz.onrender.com/' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token
            }`;
    }
    return req;
});

export const logIn = (authData) => API.post('/user/login', authData)
export const signUp = (authData) => API.post('/user/signup', authData)

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, answerVideo, userAnswered, userId) =>
    API.patch(`/answer/post/${id}`, {
        noOfAnswers,
        answerBody,
        answerVideo,
        userAnswered,
        userId,
    });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
    API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get("/user/getAllUser");

export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
