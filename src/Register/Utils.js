let utils = {
    intialvalues: {
        fname: '', lname: '', mobileno: '', email: '', password: ''
    },
    errormessage: {
        required: {
            fname: "First Name is required",
            lname: "Last Name is required",
            email: "Email Id is required",
            mobileno: "Mobile Number is required",
            password: "Password is required",
            language: "language is required",
            city: "city is required"
        }
    },
    cityDD: [
        {
            optionValue: '',
            optionText: 'Please Select Location'
        },
        {
            optionValue: 'Pune',
            optionText: 'Pune'
        },
        {
            optionValue: 'Delhi',
            optionText: 'Delhi'
        },
        {
            optionValue: 'Mumbai',
            optionText: 'Mumbai'
        },
        {
            optionValue: 'Kolkata',
            optionText: 'Kolkata'
        }
    ],
    checkboxGroup: [
        {
            name: 'language',
            id: 'marathi',
            value: 'Marathi',
            displaylbl: 'Marathi'

        },
        {
            name: 'language',
            id: 'hindi',
            value: 'Hindi',
            displaylbl: 'Hindi'

        },
        {
            name: 'language',
            id: 'english',
            value: 'English',
            displaylbl: 'English'

        }
    ],
    radioGroup: [
        {
            name: 'gender',
            id: 'male',
            value: 'Male',
            displaylbl: 'Male'
        },
        {
            name: 'gender',
            id: 'female',
            value: 'Female',
            displaylbl: 'Female'
        }
    ],
    deletePopupConfig: {
        title: 'Delete Record',
        body: 'Do you want to delete this record ? This action cannot be undone',
        btntext: 'Delete',
        pbtnAction: () => 0,
    },
    updatePopupConfig: {
        title: 'Update Record',
        body: 'Do you want to update this record ?',
        btntext: 'Update',
        pbtnAction: () => 0,
    },
}

export default utils