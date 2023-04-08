const { CREATED, DELETED, OK } = require('../core/success.response');
const UserService =  require("../services/user.service");

class UserController{
    static async getAllUsers(req, res){
        new OK({
            message: "Users",
            metadata: await UserService.getAllUsers()
        }).send(res)
    }
}

module.exports = UserController;