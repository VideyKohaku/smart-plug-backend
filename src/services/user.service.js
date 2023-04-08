const User = require("../models/user.model");
const { BadRequestError } = require("../core/error.reponse");
const pickFields = require("../utils/pickFields");
const { format } = require("morgan");

class UserService {
    static async _format(obj){
        const fields = ["name", "_id"]
        return pickFields(obj, fields);
    }

    static async _formatList(users){
        const newList = users.map((user)=>UserService._format(user))
        return newList;
    }

    static async getAllUsers() {
        const users = await User.find({}).lean();
        // console.log(users, "in UserService");
        const formatUsers = await UserService._formatList(users);
        return await Promise.all(formatUsers);
    }

}

module.exports = UserService;
