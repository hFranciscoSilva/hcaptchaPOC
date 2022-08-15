import express, { json } from "express";
import "express-async-errors";
import { UserRoutes } from "./routes";
import  cookieParser  from "cookie-parser";
import bodyParser from "body-parser";
const path = require('path');


const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send('Não tem nada aqui!!')
})


export { app }


