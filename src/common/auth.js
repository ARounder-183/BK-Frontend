/**
 * @file auth
 */

const ANONYMOUS_USER = {
    id: null,
    isAuthenticated: false,
    username: "anonymous",
};

let currentUser = {
    id: "",
    username: "",
};

const auth = {
    HTTP_STATUS_UNAUTHORIZED: 401,

    getCurrentUser() {
        return currentUser;
    },

    redirectToLogin() {
        const callbackUrl = encodeURIComponent(window.location.href);
        const appCode = process.env.REACT_APP_APP_ID;
        const loginUrl = process.env.REACT_APP_LOGIN_URL;
        window.location.href = `${loginUrl}?app_id=${appCode}&c_url=${callbackUrl}`;
    },
};

export default auth;
