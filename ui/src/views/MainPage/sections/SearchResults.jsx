import React from "react";
import {Col, Pagination, Row, Table} from "react-bootstrap";


class SearchResults extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    DisplayPagination(props) {
        const {pagesData, setRequestParams} = props;

        let pages = [];


        if (pagesData.pages < 6) {
            for (let i = 1; i <= pagesData.pages; i++) {
                pages.push(
                    <Pagination.Item key={i} active={pagesData.page === i}
                                     onClick={() => setRequestParams({page: i})}>{i}</Pagination.Item>
                );
            }
        } else {
            let startWith = pagesData.page === 1 ? pagesData.page : pagesData.page - 1;
            let limit = (startWith + 4 < pagesData.pages) ? startWith + 4 : pagesData.pages - 1;

            if (pagesData.page > 2) {
                pages.push(<Pagination.Item key={1} onClick={() => setRequestParams({page: 1})}>{1}</Pagination.Item>);
            }

            if (pagesData.page > 3) {
                pages.push(<Pagination.Ellipsis key="ell-1"/>);
            }

            for (let i = startWith; i <= limit; i++) {
                pages.push(<Pagination.Item key={i} onClick={() => setRequestParams({page: i})}
                                            active={pagesData.page === i}>{i}</Pagination.Item>);
            }
            pages.push(<Pagination.Ellipsis key="ell-2"/>);

            pages.push(<Pagination.Item key={pagesData.pages}
                                        onClick={() => setRequestParams({page: pagesData.pages})}>{pagesData.pages}</Pagination.Item>);
        }


        return (
            <Row>
                <Col xs={9}><Pagination size={"sm"}>{pages}</Pagination></Col>
                <Col xs={3}><strong>Results:</strong> {pagesData.total}</Col>
            </Row>
        )
    }

    render() {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Is Employee?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users.map((row, key) => (
                        <tr key={key}>
                            <td>{row.id}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.email}</td>
                            <td>{row.age}</td>
                            <td>{row.isEmployee ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <this.DisplayPagination pagesData={this.props.pagesData}
                                        setRequestParams={this.props.setRequestParams}/>
            </>
        )
    }
}

export default SearchResults;