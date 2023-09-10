import * as yup from "yup"

export const  loginSchema = yup.object().shape({
    name:yup.string().required("This field is required").min(2,"Field must contain at least 2 letters"),
    password:yup.string().required("This field is required")
});

export const addUserSchema = yup.object().shape({
    name:yup.string().required("This field is required").min(2,"Field must contain at least 2 letters"),
    password:yup.string().required("This field is required"),
    role:yup.string().required("This field is required").oneOf(["admin","member"],"Choose admin or member"),
    email:yup.string().email("Enter email format"),
    phone:yup.string().length(10,"Must be length of 10, Enter without \"0\""),
    consent:yup.boolean().default(false)
})

export const editScheama = yup.string().required("This field is required") // only name can be changed
