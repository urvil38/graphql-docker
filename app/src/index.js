import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress , graphiqlExpress} from 'apollo-server-express';
import schema from './schema';
import connectMongo from './mongo-connector';
const { authenticate } = require('./authentication')
const PORT = 8080 || process.env.PORT;

const start = async () => {
    let mongo;
    try {
        mongo = await connectMongo(); 
    } catch (error) {
        console.error("############ Please start mongodb server!! ###############");
    }
    const buildOption = async (req,res) => {
        const user = await authenticate(req,mongo.Users)
        return {
            schema,
            context: {mongo,user}
        }
    }
    let app = express();
    app.use('/graphql',bodyParser.json(), graphqlExpress(buildOption));
    app.use('/graphiql', graphiqlExpress({
        endpointURL : '/graphql',
        passHeader : `'authorization': 'token-patelurvil38@gmail.com'`,
    }))
    
    app.listen(PORT , () => {
        console.log(`Graphql server is running on port ${PORT}.`);
    })
}

start();