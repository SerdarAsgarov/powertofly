import React from "react";
import {Card, Form, Col, InputGroup, FormControl} from "react-bootstrap";


class SearchForm extends React.Component {
    DisplayAgeForm(props) {
        const {setRequestParams} = props;

        const [age, setAge] = React.useState({
            min: 0,
            max: 100
        });

        function onAgeChange(event) {
            let value = event.target.value;
            let rangeType = event.target.getAttribute('datatype');

            if (rangeType === "from") {
                setAge({
                    min: value,
                    max: age.max
                });
            } else {
                setAge({
                    min: age.min,
                    max: value
                });
            }

            setRequestParams({
                "minAge": age.min,
                "maxAge": age.max,
            });
        }

        return (
            <Form.Group controlId="formBasicRange">
                <Form.Label>Age range</Form.Label>
                <Form.Row>
                    <Col>
                        From
                        <Form.Control type="range" datatype="from" defaultValue={0}
                                      onChange={onAgeChange} onClick={onAgeChange} min={0} max={age.max} custom/>
                    </Col>
                    <Col>
                        To
                        <Form.Control type="range" datatype="to" defaultValue={100}
                                      onChange={onAgeChange} onClick={onAgeChange} min={age.min} max={100} custom/>
                    </Col>
                </Form.Row>
                <Form.Text id="passwordHelpBlock" muted>
                    <strong>Min age:</strong> {age.min} <strong>Max age:</strong> {age.max}
                </Form.Text>
            </Form.Group>
        )
    }

    onStringChange = (event) => {
        let input = event.target;
        let key = input.getAttribute("datatype")

        let params = {};
        params[key] = input.value.length ? input.value : null;

        this.props.setRequestParams(params);
    }

    render() {
        return (
            <Card>
                <Card.Header><strong>Search filters</strong></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Row>
                                <Col>
                                    <Form.Control onChange={this.onStringChange} datatype="firstName" placeholder="First name"/>
                                </Col>
                                <Col>
                                    <Form.Control onChange={this.onStringChange} datatype="lastName" placeholder="Last name"/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="example@gmail.com"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    datatype="email"
                                    onChange={this.onStringChange}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Employees only"
                                onChange={(event) => {
                                    if(event.target.checked) {
                                        this.props.setRequestParams({"isEmployee": true});
                                    } else {
                                        this.props.setRequestParams({"isEmployee": null});
                                    }
                                }}
                            />
                        </Form.Group>
                        <this.DisplayAgeForm setRequestParams={this.props.setRequestParams}/>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default SearchForm;