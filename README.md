# RN-GraphQL-Chat
## Description:

React native realtime chat app, using
- GraphQL
- Apollo
- GraphCool

## Instructions
At your terminal, run:

```
git clone https://github.com/gabrielrangel95/RN-GraphQL-Chat.git
cd rn-graphql-chat
yarn install
```

### :warning: before run the app you must do the follow steps:
- Inside the src frolder, go to apollo/config
- Create a file called `keys.js`
- Inside the file, create a const: 
```
export const keys = {
  LINK_HTTP: '',
  LINK_WS: '',
};
```
- Go to graphcool console (https://console.graph.cool/)
- click at `endpoints`
- copy the url at the `simple` tab and past at `LINK_HTTP`
- copy the url at subscriptions tab and past at `LINK_WS`
- At the graphcool console, creat a new schema: 

```
type Message @model {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  from: String!
  message: String!
}
```

Click at preview changes and save it.
After this, your apple will be able to run.

