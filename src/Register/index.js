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
      userData: [],
      modalConfig: {
        title: '',
        body: '',
        btntext: '',
        pbtnAction: () => 0,
      }
    }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  deleteHandler = (id) => {
    let { userData } = this.state;
    userData.splice(id, 1);
    this.setState({ userData });
    this.toggle();
  }
  showDeletePopup = (id) => {
    utils.deletePopupConfig.pbtnAction = () => this.deleteHandler(id);
    this.setState({ modalConfig: utils.deletePopupConfig }, console.log(this.state))
    this.toggle();
  }

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
            // resetForm({});
            //values.fname = values.lname = values.email = values.mobileno = values.password = values.gender = values.city = '';
            //values.language = [];
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1>Register</h1>
              <FormFields type="text" name="fname" lbl="First Name" id="fname" />
              <FormFields type="text" name="lname" lbl="Last Name" id="lname" />
              <FormFields type="email" name="email" lbl="Email Id" id="emailId" />
              <FormFields type="number" name="mobileno" lbl="Mobile Number" id="mobileno" />
              <FormFields type="radio" name="gender" id="gender" lbl="Gender" radiobtns={utils.radioGroup} />
              <FormFields type="password" name="password" id="password" lbl="Password" />
              <FormFields type="select" name="city" id="city" lbl="City" ddoptions={utils.cityDD} />
              <FormFields type="checkbox" name="language" id="language" lbl="Language" checkboxes={utils.checkboxGroup} />
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
        <ModalPopup isOpen={this.state.modal}
          toggle={this.toggle}
          modaltitle={this.state.modalConfig.title}
          modalbody={this.state.modalConfig.body}
          btntext={this.state.modalConfig.btntext}
          pbtnaction={this.state.modalConfig.pbtnAction}></ModalPopup>
        <br /><br />
        {this.state.userData.length > 0 && <UserTable deleteclicked={this.showDeletePopup} data={this.state.userData} />}
      </div>

    )
  }
}
