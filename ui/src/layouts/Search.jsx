import React from "react";
import Header from "../containers/Header";

import 'static/css/main.css';


class SearchLayout extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <this.props.view/>
            </div>
        );
    }
}

export default SearchLayout;