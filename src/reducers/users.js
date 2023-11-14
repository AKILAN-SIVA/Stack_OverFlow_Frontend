const usersReducer = (states = [], action) => {
    switch (action.type) {
        case "FETCH_USERS":
            return action.payload;
        case "UPDATE_CURRENT_USER":
            return {
                ...states,
                result: action.payload,
            };
        default:
            return states;
    }
};

export default usersReducer;