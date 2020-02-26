import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import FormFields from '../FormFields';
import utils from './Utils';
import UserTable from '../Table/UserTable';
import ModalPopup from '../Table/ModalPopup';


export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      userData: []
    }
  }
  modalconfig = {
    title: '',
    body: '',
    btntext: '',
    pbtnAction: () => 0,
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{ fname: '', lname: '', mobileno: '', email: '', password: '', gender: '', city: '', language: '' }}
          validate={values => {
            const errors = {};
            let e = '';
            if (!values.email) {
              errors.email = utils.errormessage.required.email;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            e = (!values.fname) ? errors.fname = utils.errormessage.required.fname : null;
            e = (!values.lname) ? errors.lname = utils.errormessage.required.lname : null;
            e = (!values.mobileno) ? errors.mobileno = utils.errormessage.required.mobileno : null;
            e = (!values.password) ? errors.password = utils.errormessage.required.password : null;
            e = (!values.gender) ? errors.gender = utils.errormessage.required.gender : null;
            e = (!values.language) ? errors.language = utils.errormessage.required.language : null;
            e = (!values.city || values.city === '') ? errors.city = utils.errormessage.required.city : null;
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            let { userData } = this.state;
            userData.push(values);
            this.setState({ userData });
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormFields type="text" name="fname" lbl="First Name" id="fname" />
              <FormFields type="text" name="lname" lbl="Last Name" id="lname" />
              <FormFields type="email" name="email" lbl="Email Id" id="emailId" />
              <FormFields type="number" name="mobileno" lbl="Mobile Number" id="mobileno" />
              <FormFields type="radio" name="gender" id="gender" lbl="Gender" radiobtns={utils.radioGroup} />
              <FormFields type="password" name="password" id="password" lbl="Password" />
              <FormFields type="select" name="city" id="city" lbl="City" ddoptions={utils.cityDD} />
              <FormFields type="checkbox" name="language" id="language" lbl="Language" checkboxes={utils.checkboxGroup} />
              <button type="submit" disabled={isSubmitting}>
                Submit
          </button>
            </Form>
          )}
        </Formik>
        <ModalPopup isOpen={this.state.modal}
          toggle={this.toggle}
          modaltitle={this.modalconfig.title}
          modalbody={this.modalconfig.body}
          btntext={this.modalconfig.btntext}
          pbtnaction={this.modalconfig.pbtnAction}></ModalPopup>

        <UserTable deleteclicked={this.showDeletePopup} editclicked={this.onEditClick} data={this.state.userData} />
      </div>

    )
  }
}
