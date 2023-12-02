import * as dao from "./dao.js";
/*
let currentUser = null;
*/
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    app.post("/api/users", createUser);
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { id } = req.params;
        const user = req.body;
        const status = await dao.updateUser(id, user);
        const currentUser = await dao.findUserById(id);
        req.session['currentUser'] = currentUser;
        res.send(status)
        /*
        currentUser = await dao.findUserById(userId);
        res.json(status);
        */
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        console.log(currentUser);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        if (currentUser) {
            res.json(currentUser);
            return;
        } else {
            res.sendStatus(403);
        }
    };
    const account = async (req, res) => {
        const currentUser = req.session["currentUser"];
        res.json(currentUser);
    };

    const signout = (req, res) => {
        req.session.destroy();
        // currentUser = null;
        res.sendStatus(200);
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/account", account);

    app.post("/api/users/signout", signout);
}
export default UserRoutes;