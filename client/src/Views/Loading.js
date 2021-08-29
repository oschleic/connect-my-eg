import React from "react";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import "./Loading.css";

class Loading extends React.Component {
    constructor(props){
        super(props);
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;
        this.state = {
            cssOverride: override,
            loadingText: this.props.loadingText,
        };
    }

    render() { 
        return ( 
        <>
        <RingLoader color={"#1db954"} css={this.state.cssOverride} size={150} id={"spinner"} />
        <label for={"spinner"} className={"loaderLabel"}>{this.state.loadingText}</label>
        </>
         );
    }
}
 
export default Loading;