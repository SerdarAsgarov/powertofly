import React from "react";
import {Pagination, Table} from "react-bootstrap";


class SearchResults extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    DisplayPagination() {
        return (
            <Pagination size={"sm"}>
                <Pagination.First/>
                <Pagination.Prev/>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis/>

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis/>
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next/>
                <Pagination.Last/>
            </Pagination>
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
                <this.DisplayPagination/>
            </>
        )
    }
}

export default SearchResults;