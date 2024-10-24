
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signInButton = loginForm.querySelector('button');
    const helloWorldText = document.getElementById('hello-world');

    // Check if token is already stored
    const token = localStorage.getItem('cognitoToken');
    if (token) {
        helloWorldText.innerText = "Hey Ciao, you are logged in!";
        signInButton.innerText = "Log Out";
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (signInButton.innerText === "Log Out") {
            // Log out the user
            localStorage.removeItem('cognitoToken');
            helloWorldText.innerText = "ByeBye";
            signInButton.innerText = "Sign In";
        } else {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const poolData = {
                UserPoolId: USER_POOL_ID, // Your user pool id here
                ClientId: CLIENT_ID // Your client id here
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
                    helloWorldText.innerText = "Hey Ciao, you are logged in!";
                    signInButton.innerText = "Log Out";
                },

                onFailure: function(err) {
                    alert(err.message || JSON.stringify(err));
                },
            });
        }
    });
});
