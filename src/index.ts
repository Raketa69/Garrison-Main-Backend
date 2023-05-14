import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer'
import mongoose from 'mongoose';
import cors from 'cors'
import { registerValidation, loginValidation, dishValidation, reservValidation } from './validations/auth'
import { handleValidationErrors, checkAuth } from './utils/utils'
import { UserController, MenuController, ReservController } from './controllers/controllers'
dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.CONNECTION_STRING!)
    .then(() => console.log('DB is OK'))
    .catch(() => console.log('DB ERROR'));

const app: Express = express();

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

// STORE IMAGES
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

// ТЕСТ
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

//---------------------------------------   USER   ------------------------------------------------------
// регистрация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// авторизация
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// получение данных по токену
app.get('/auth/me', checkAuth, UserController.getMe)

//---------------------------------------   MENU   ------------------------------------------------------
// CREATE
app.post('/dishes', checkAuth,
    dishValidation,
    handleValidationErrors,
    MenuController.create)
// UPDATE
app.patch('/dishes/:id', checkAuth,
    dishValidation,
    handleValidationErrors,
    MenuController.update),
    // GET ALL
    app.get('/dishes', MenuController.getAll)
// GET ONE
app.get('/dishes/:id', MenuController.getOne)
// DELETE
app.delete('/dishes/:id', checkAuth, MenuController.remove)

//---------------------------------------   IMAGES   ------------------------------------------------------
// DOWNLOAD IMAGES
app.post('/upload', checkAuth, upload.single('image'), (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File
    res.json({
        url: `/uploads/${file.originalname}`
    });
})

//---------------------------------------   RESERV   ------------------------------------------------------
// CREATE
app.post('/reserv',
    reservValidation,
    handleValidationErrors,
    ReservController.create)
// UPDATE
app.patch('/reserv/:id',
    checkAuth,
    reservValidation,
    handleValidationErrors,
    ReservController.update),
// GET ALL
app.get('/reserv', checkAuth,
    ReservController.getAll),
// GET ONE
app.get('/reserv/:id', checkAuth,
    ReservController.getOne), 
// DELETE
app.delete('/reserv/:id', checkAuth, ReservController.remove)


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
