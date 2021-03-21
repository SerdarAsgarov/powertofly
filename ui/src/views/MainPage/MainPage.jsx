import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import SearchForm from "./sections/SearchForm";
import SearchResults from "./sections/SearchResults";
import sendAPIRequest from "utils/request";


class MainPage extends React.Component {
    DisplaySearch() {
        const [users, setUsers] = React.useState([]);
        const [pagesData, setPagesData] = React.useState({
            "total": 0,
            "pages": 0,
        })


        const loadData = () => {
            sendAPIRequest("users", []).then((response) => {
                setUsers(response.data.users);
                setPagesData({
                    "total": response.data.total,
                    "pages": response.data.pages
                })
            }).catch(err => alert(err));
        };

        return (
            <Row>
                <Col xs={4}>
                    <SearchForm/>
                </Col>
                <Col xs={8}>
                    <SearchResults loadData={loadData} users={users} pagesData={pagesData}/>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Container className="main-page">
                <this.DisplaySearch/>
            </Container>
        );
    }
}

export default MainPage;
