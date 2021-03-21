import React from "react";
import {Card, Form, Col, InputGroup, FormControl} from "react-bootstrap";


class SearchForm extends React.Component {
    DisplayAgeForm() {
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
        }

        return (
            <Form.Group controlId="formBasicRange">
                <Form.Label>Age range</Form.Label>
                <Form.Row>
                    <Col>
                        From
                        <Form.Control type="range" datatype="from" defaultValue={0}
                                      onChange={onAgeChange} min={0} max={age.max} custom/>
                    </Col>
                    <Col>
                        To
                        <Form.Control type="range" datatype="to" defaultValue={100}
                                      onChange={onAgeChange} min={age.min} max={100} custom/>
                    </Col>
                </Form.Row>
                <Form.Text id="passwordHelpBlock" muted>
                    <strong>Min age:</strong> {age.min} <strong>Max age:</strong> {age.max}
                </Form.Text>
            </Form.Group>
        )
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
                                    <Form.Control placeholder="First name"/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Last name"/>
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
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Employees only"
                            />
                        </Form.Group>
                        <this.DisplayAgeForm/>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default SearchForm;