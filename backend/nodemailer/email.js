import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_UPDATE_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { sender, transporter } from "./nodemailer.config.js";


export const sendVerificationEmail=async(email,verficationToken)=>{
    const recipients=email
    try{
    await transporter.sendMail({
  from: sender,
  to: recipients,
  subject: "Verify your email",
  html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verficationToken),
  headers: {
    "X-Category": "Email Verification"
  }
});

    }catch(error){
        console.log('error in sending email',error)
        throw new Error('error sending email',error)
    }
}

export const sendWelcomeEmail=async(email,name)=>{
    const recipients=email
    try{
       
         await transporter.sendMail({
  from: sender,
  to: recipients,
  subject: "Welcome to Our Service",
  html: WELCOME_EMAIL_TEMPLATE.replace('{username}', name),
  headers: {
    "X-Category": "Email Verification"
  }
});
        
 
     }catch(error){
         console.log('error in welcome email',error)
         throw new Error('error welcome email',error)
     }
}

export const sendForgetPasswordEmail=async(email,resetUrl)=>{
    const recipients=email
    try{
            await transporter.sendMail({
            from: sender,
            to: recipients,
            subject: "Change Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
            headers: {
                "X-Category": "Password Reset"
            }
        })

    }catch(error){
        console.log('error in forget password email',error);
        throw new Error('error forget password email',error);
    }
}

export const sendPasswordResetSuccessEmail=async(email)=>{
    try{
        const recipients=email

        await transporter.sendMail({
            from: sender,
            to: recipients,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            headers: {
                "X-Category": "Password Reset Success"
            }
        })

    }catch(err){
        console.log('error in password reset success email',err);
        throw new Error('error in password reset success email');
    }
}

export const sendPasswordUpdateSuccessEmail=async(email)=>{

    const recipients=email
    try{
            await transporter.sendMail({
            from: sender,
            to: recipients,
            subject: "Password Updated",
            html: PASSWORD_UPDATE_SUCCESS_TEMPLATE,
            headers: {
                "X-Category": "Password update"
            }
        })

    }catch(error){
        console.log('error in update password email',error);
        throw new Error('error update password email',error);
    }
}