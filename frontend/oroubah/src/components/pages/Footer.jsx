import React from "react";

function Footer() {

    return (

        <footer style={{position:" relative"
         , marginTop: "485px", bottom :"0" , paddingBottom: "0px" , width :"100%" , background :"#424242" }} >
        <h4 style={{textAlign :"center" , color :"#ffffff" }} >&copy; {new Date().getFullYear()} Copyright:{" Manal & Warod & Muath"}</h4>
        </footer>
      );
    }
    
export default Footer;