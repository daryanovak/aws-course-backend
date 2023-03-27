module.exports.handler  = async (event, context,callback) => {
    const token = event.authorizationToken;
    const [, encodedCredentials] = token.split('Basic ');
    const credentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
    console.log("Credentials",credentials)

    const [username, password] = credentials.split(':');
    const storedPassword = process.env[username];
  
    if (password === storedPassword) {
      callback(null, generatePolicy(username, 'Allow', event.methodArn));
    } else {
      callback('Unauthorized');
    }
  };
  
  const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }
    return authResponse;
  };
  