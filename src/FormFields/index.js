import React from 'react'
import { FormGroup, Col, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

export default function FormFields(props) {
    const { type, name, id, lbl, ddoptions, checkboxes, radiobtns } = props;
    return (
        <>
            <FormGroup row>
                <Label for={id} sm={2}>{lbl}</Label>
                <Col sm={8}>
                    {(type === "select") ?
                        <Field as={type} name={name} className="form-control">
                            {ddoptions.map((item, index) => (
                                <option key={index} value={item.optionValue}>{item.optionText}</option>
                            ))}
                        </Field>
                        : (type === "checkbox") ?
                            <>
                                {checkboxes.map((item, index) => (
                                    <Col sm={2} className="float-left">
                                        <label>
                                            <Field type="checkbox" name={item.name} value={item.value} />
                                            {item.displaylbl}
                                        </label>
                                    </Col>
                                ))}
                            </>
                            : (type === "radio") ?
                                <>
                                    {radiobtns.map((item, index) => (
                                        <Col sm={2} className="float-left">
                                            <label>
                                                <Field type="radio" id={item.id} name={item.name} value={item.value} />
                                                {item.displaylbl}
                                            </label>
                                        </Col>
                                    ))}
                                </>
                                :
                                <Field type={type} name={name} id={id} className="form-control" />
                    }
                    <ErrorMessage name={name} component="i" />
                </Col>
            </FormGroup>
        </>
    )
}
