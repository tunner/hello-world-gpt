
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const poolData = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID, // Your user pool id here
        ClientId: process.env.REACT_APP_CLIENT_ID // Your client id here
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const authenticationData = {
        Username: email,
        Password: password
    };
    
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
        Username: email,
        Pool: userPool
    };
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            const accessToken = result.getAccessToken().getJwtToken();
            // Store the token in local storage
            localStorage.setItem('cognitoToken', accessToken);
            alert('Sign-in successful!');
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
});
