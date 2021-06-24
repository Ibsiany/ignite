import { injectable } from "tsyringe";
import nodemailer,{Transporter} from 'nodemailer';
import { IMailProvider } from "../IMailProvider";
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class SesMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        }).catch(err => console.error(err))
    }
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8")

        const templateParse = handlebars.compile(templateFileContent)

        const templateHTML = templateParse(variables)

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            html: templateHTML
        })

        console.log("Message sent: %s", message.messageId)
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))
    }

}

export {SesMailProvider}

// import { SES } from "aws-sdk";
// import fs from "fs";
// import handlebars from "handlebars";
// import nodemailer, { Transporter } from "nodemailer";
// import { injectable } from "tsyringe";

// import { IMailProvider } from "../IMailProvider";

// @injectable()
// class SESMailProvider implements IMailProvider {
//   private client: Transporter;

//   constructor() {
//     this.client = nodemailer.createTransport({
//       SES: new SES({
//         apiVersion: "2010-12-01",
//         region: process.env.AWS_BUCKET_REGION,
//       }),
//     });
//   }

//   async sendMail(
//     to: string,
//     subject: string,
//     variables: any,
//     path: string
//   ): Promise<void> {
//     const templateFileContent = fs.readFileSync(path).toString("utf-8");

//     const templateParse = handlebars.compile(templateFileContent);

//     const templateHTML = templateParse(variables);

//     await this.client.sendMail({
//       to,
//       from: "Rentx <rentx@rentx.com>",
//       subject,
//       html: templateHTML,
//     });
//   }
// }

// export { SESMailProvider };