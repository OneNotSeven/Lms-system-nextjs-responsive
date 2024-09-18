import * as Yup from "yup"

export const formSignUpSchema = Yup.object({
    name: Yup.string().required("enter your name"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4).required("password required"),
    c_password: Yup.string().required("confirm password required").oneOf([Yup.ref("password"), null], "password not match"),
})

export const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("password required")
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const editinfoSchema=Yup.object({
    name: Yup.string().required("enter your name"),
    contact: Yup.string().min(10).max(10).matches(phoneRegExp, "Phone number is not valid"),
    address: Yup.string(),
})

export const teacherYupProfiles=Yup.object({
    name: Yup.string().required("enter your name"),
    lastname: Yup.string().required("enter your name"),
    profession: Yup.string().required("enter your name"),
    email: Yup.string().email("Invalid email").required("Required"),
    bio: Yup.string().required("enter bio"),
})

export const chaptersSchema=Yup.object({
    courseName: Yup.string().required("enter your course name"),
    courseDesc: Yup.string().required("enter your course description"),
    title: Yup.string().required("Required"),
    desc: Yup.string().required("enter description"),
    chaptername: Yup.string().required("enter chapter"),
    tags:Yup.string().required("tags")
})

export const chaptersSchemaSecond=Yup.object({
   
    title: Yup.string().required("Required"),
    desc: Yup.string().required("enter description"),
    chaptername: Yup.string().required("enter chapter"),

})



export const emailVerifySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
   
})

export const passwordChecking = Yup.object({
    password: Yup.string().min(4).required("password required"),
    c_password: Yup.string().required("confirm password required").oneOf([Yup.ref("password"), null], "password not match"),
   
})