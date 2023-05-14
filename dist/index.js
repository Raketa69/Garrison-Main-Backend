"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./validations/auth");
const utils_1 = require("./utils/utils");
const controllers_1 = require("./controllers/controllers");
dotenv_1.default.config();
const port = process.env.PORT;
mongoose_1.default.connect(process.env.CONNECTION_STRING)
    .then(() => console.log('DB is OK'))
    .catch(() => console.log('DB ERROR'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static('uploads'));
// STORE IMAGES
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// ТЕСТ
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
//---------------------------------------   USER   ------------------------------------------------------
// регистрация
app.post('/auth/register', auth_1.registerValidation, utils_1.handleValidationErrors, controllers_1.UserController.register);
// авторизация
app.post('/auth/login', auth_1.loginValidation, utils_1.handleValidationErrors, controllers_1.UserController.login);
// получение данных по токену
app.get('/auth/me', utils_1.checkAuth, controllers_1.UserController.getMe);
//---------------------------------------   MENU   ------------------------------------------------------
// CREATE
app.post('/dishes', utils_1.checkAuth, auth_1.dishValidation, utils_1.handleValidationErrors, controllers_1.MenuController.create);
// UPDATE
app.patch('/dishes/:id', utils_1.checkAuth, auth_1.dishValidation, utils_1.handleValidationErrors, controllers_1.MenuController.update),
    // GET ALL
    app.get('/dishes', controllers_1.MenuController.getAll);
// GET ONE
app.get('/dishes/:id', controllers_1.MenuController.getOne);
// DELETE
app.delete('/dishes/:id', utils_1.checkAuth, controllers_1.MenuController.remove);
//---------------------------------------   IMAGES   ------------------------------------------------------
// DOWNLOAD IMAGES
app.post('/upload', utils_1.checkAuth, upload.single('image'), (req, res) => {
    const file = req.file;
    res.json({
        url: `/uploads/${file.originalname}`
    });
});
//---------------------------------------   RESERV   ------------------------------------------------------
// CREATE
app.post('/reserv', auth_1.reservValidation, utils_1.handleValidationErrors, controllers_1.ReservController.create);
// UPDATE
app.patch('/reserv/:id', utils_1.checkAuth, auth_1.reservValidation, utils_1.handleValidationErrors, controllers_1.ReservController.update),
    // GET ALL
    app.get('/reserv', utils_1.checkAuth, controllers_1.ReservController.getAll),
    // GET ONE
    app.get('/reserv/:id', utils_1.checkAuth, controllers_1.ReservController.getOne),
    // DELETE
    app.delete('/reserv/:id', utils_1.checkAuth, controllers_1.ReservController.remove);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
