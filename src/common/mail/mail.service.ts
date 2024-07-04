
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

export class MailService{
    private readonly  transporter:Mail<SentMessageInfo>;
    constructor(){
        this.transporter= nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })  
}

sendMailHtml(to:string, subject:string, html:string){

    const from = process.env.MAIL_USER
    this.transporter.sendMail({from:from, to:to, subject:subject, html:html});
    

}
}