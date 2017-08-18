const TOKEN_REGEX = /token-(.*)$/;

module.exports.authenticate = async ({headers:{authorization}},Users) => {
    const email = authorization && TOKEN_REGEX.exec(authorization)[1];
    return email !== null && await Users.findOne({'email' : email})
}
