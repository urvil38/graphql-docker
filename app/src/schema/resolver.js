let ObjectId = require('mongodb').ObjectID;
export default {
    Query : {
        allLinks: async (root,data,{mongo : {Links}}) => {
            return await Links.find({}).toArray();
        },
        allUsers: async (_,data,{mongo : {Users}}) => {
            return await Users.find({}).toArray();
        },
        findUser : async (root,data,{mongo : {Users}}) => {
            let id = new ObjectId(data.id);
            return await Users.findOne({'_id': id});
        }
    },
    Mutation : {
        createLink: async (root,data,{mongo : {Links},user}) => {
            const newLink = Object.assign({id : user && user._id},data)
            const response = await Links.insert(newLink);
            return Object.assign({id : response.insertedIds[0]},newLink);
        },
        createUser : async (root,data,{mongo : {Users}}) => {
            const newUser = {
                name : data.name,
                email : data.authProvider.details.email,
                password : data.authProvider.details.password
            };
            const res = await Users.insert(newUser);
            return Object.assign({id : res.insertedIds[0]} , newUser);
        },
        signinUser: async (root,data,{mongo : {Users}}) => {
            const user = await Users.findOne({email:data.details.email});
            if( data.details.password == user.password){
                return {token: `token-${user.email}`,user}
            }
        }

    },
    Link: {
        id: root => root._id || root.id,
        postedBy : async (root,data,{mongo : {Users}}) => {
            return await Users.findOne({'_id':root.id})
        }
    },
    User: {
        id: root => root._id || root.id,
    }
};