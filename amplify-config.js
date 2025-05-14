import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_xxx',
    userPoolWebClientId: 'xxx',
    mandatorySignIn: false
  }
})