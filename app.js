const USER_POOL_ID = "eu-west-1_4VMHTzsl9";
const CLIENT_ID = "48enkg3rdbn9914ip1vqlv7nf7";
// Sign-in functionality and user info retrieval
if (localStorage.getItem('cognitoToken')) {
    let idToken = getIdToken(); // Replace with logic to get the token
    let userId = extractSub(decodeToken(idToken)); // Ensure userId is fetched

    await fetchUserInfo(localStorage.getItem('cognitoToken'), userId);
}

// Login actions
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get cognito token and idToken
    const accessToken = getAccessToken();
    const idToken = localStorage.getItem('cognitoToken');

    // Extract userID
    const userId = extractSub(decodeToken(idToken));
    // Fetch user information
    await fetchUserInfo(accessToken, userId);
});

// Logout clearing data
function logout() {
    localStorage.removeItem('gender');
    localStorage.removeItem('birthdate');
    document.getElementById('gender').value = '';
    document.getElementById('birthdate').value = '';
}

// Logout handler
document.getElementById('signOutBtn').addEventListener('click', logout);