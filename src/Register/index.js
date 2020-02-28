import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import FormFields from '../FormFields';
import utils from './Utils';
import UserTable from '../Table/UserTable';
import ModalPopup from '../Table/ModalPopup';
import { Col, FormGroup } from 'reactstrap';


export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      fname: '', lname: '', mobileno: '', email: '', password: '', gender: '', city: '', language: '',
      userData: [],
      modalConfig: {
        title: '',
        body: '',
        btntext: '',
        pbtnAction: () => 0,
      }
    }
  }
  currentEdit = null;
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  updateHandler = (id, vals) => {
    let { userData } = this.state;
    Object.assign(userData[id], vals);
    this.currentEdit = null;
    this.setState({ fname: '', lname: '', mobileno: '', email: '', password: '', gender: '', city: '', language: '' })
    this.toggle();
  }
  deleteHandler = (id) => {
    let { userData } = this.state;
    userData.splice(id, 1);
    this.setState({ userData });
    this.toggle();
  }
  showDeletePopup = (id) => {
    utils.deletePopupConfig.pbtnAction = () => this.deleteHandler(id);
    this.setState({ modalConfig: utils.deletePopupConfig })
    this.toggle();
  }
  onEditClick = (id) => {
    let currentUserData = this.state.userData[id];
    this.setState({ ...currentUserData }, console.log(this.state));
    this.currentEdit = id;
  }

  render() {
    let { fname, lname, mobileno, email, password, gender, city, language } = this.state;
    return (
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{ fname: fname, lname: lname, mobileno: mobileno, email: email, password: password, gender: gender, city: city, language: language }}
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            let { userData } = this.state;
            if (this.currentEdit !== null) { //Update case
              let { fname, lname, mobileno, email, password, gender, city, language } = values;
              utils.updatePopupConfig.pbtnAction = () => this.updateHandler(this.currentEdit, values);
              this.setState({ fname, lname, mobileno, email, password, gender, city, language, modalConfig: utils.updatePopupConfig });
              this.toggle();
            } else {
              userData.push(values);
            }
            this.setState({ userData });
            resetForm();
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
        <FormGroup row>
        <Col sm={1}></Col>
          <Col sm={10}>
            {this.state.userData.length > 0 && <UserTable editclicked={this.onEditClick} deleteclicked={this.showDeletePopup} data={this.state.userData} />}
          </Col>
        </FormGroup>

      </div>

    )
  }
}
