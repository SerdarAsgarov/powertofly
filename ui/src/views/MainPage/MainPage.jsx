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

        const [params, setParams] = React.useState({
            "firstName": null,
            "lastName": null,
            "email": null,
            "minAge": null,
            "maxAge": null,
            "isEmployee": null,
            "page": 1,
        })

        let [requestNumber, setRequestNumber] = React.useState(1);

        const setRequestParams = (newParams) => {
            let paramsCopy = params;

            for (let paramName in newParams) {
                paramsCopy[paramName] = newParams[paramName];
            }

            if (!("page" in newParams)) {
                paramsCopy["page"] = 1;
            }

            setParams(paramsCopy);

            loadData();
        }


        const loadData = () => {
            sendAPIRequest("users", params, requestNumber).then((response) => {
                setUsers(response.data.users);
                setPagesData({
                    "total": response.data.total,
                    "pages": response.data.pages,
                    "source": response.data.source,
                    "page": params["page"]
                });

                // Caching the first page
                if (requestNumber === 1) {
                    console.log("Storing data locally")
                    response.data.source = "local";
                    localStorage.setItem("cached_users", JSON.stringify(response));
                }

                setRequestNumber(requestNumber+1);
            }).catch(err => alert(err));
        };

        return (
            <Row>
                <Col xs={4}>
                    <SearchForm setRequestParams={setRequestParams}/>
                </Col>
                <Col xs={8}>
                    <SearchResults loadData={loadData} users={users} pagesData={pagesData} setRequestParams={setRequestParams}/>
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
