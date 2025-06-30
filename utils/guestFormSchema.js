import * as Yup from "yup"

export default validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Full name is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^(?:\+92|0)?3[0-9]{2}[-]?[0-9]{7}$/, "Invalid phone number")
})
