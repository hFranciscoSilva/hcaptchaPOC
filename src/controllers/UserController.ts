import { Request, Response } from "express";
import axios from "axios";
const {verify} = require('hcaptcha');
const fs = require('fs');


class UserController{

    async log_user(request: Request, response: Response){
        const comment : {message} = request.body
        console.log()

        const secret = ''
        const token = comment['h-captcha-response']

        const theDate = new Date()
        const day = theDate.getUTCDate();
        const month = theDate.getUTCMonth()+1;
        const twoDigitMonth = month<10? "0" + month: month;
        const twoDigitYear = theDate.getUTCFullYear().toString().substr(2)
        const hours = theDate.getUTCHours();
        const mins = theDate.getUTCMinutes();
        const seconds = theDate.getUTCSeconds();
        const formattedDate = `${day}/${twoDigitMonth}/${twoDigitYear}- ${hours}:${mins}:${seconds}`;


        verify(secret, token)
        .then((data)=>{
            if(data.success == true){
                fs.appendFile('message.log', `Tentativa funcionou -  ${formattedDate}\n`, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }else{
                fs.appendFile('error.log', `Tentativa não funcionou -  ${formattedDate}\n`, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }
        })

        return response.status(200).json("Uhuuuuuu")

    }

    async index(request: Request, response: Response){

        return response.render("demo")
    }


}

/* 
        //Validate if user exists and return the user
        const validated = null

        //User not founded
        if(validated == undefined){
            return response.status(200).json("Não foi possível fazer login...")
        }else{

            //Base64 is really secure?
            const cookieEncoded = Buffer.from(JSON.stringify(validated), 'utf-8').toString('base64');
            
            //Need to fix the data that are going to frontend
            const infos = {'Usuario': validated, 'Cookie': cookieEncoded}

            var date = new Date(Date.now());

            date.setHours(date.getHours() + 1) 
        
            return response
            .cookie("CookieSession",infos.Usuario) //Need to add some security flags
            .status(403)
            .json("Não foi possível login!")
        }
*/


export {UserController}