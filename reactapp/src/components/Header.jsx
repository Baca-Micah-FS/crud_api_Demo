import React from "react";
import { Link } from "react-router";
import { FaGraduationCap } from "react-icons/fa6";

const Header = (props) => {
  const styles = {
    myHeader: {
      width: "100%",
      height: "105px",
      padding: "14",
      backgroundColor: "pink",
      color: "rgb(163, 173, 194)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    left: {
      display: "flex",
      flexDirection: "row",
      color: "#778da9",
      width: "30%",
    },
    logo: {
      height: "105px",
      width: "80px",
      marginRight: "10px",
      alignItems: "center",
      padding: "5px 10px",
      color: "#778da9",
    },
    searchCont: {
      border: "1px solid #ddd",
      display: "flex",
      flexDirection: "row",
      borderRadius: "2px",
      width: "40%",
      marginRight: "4rem",
    },
    inputIcon: {
      background: "#ddd",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      fontSize: "1rem",
    },
    inputwithIcon: {
      border: "none",
      flex: 1,
      padding: "10px",
    },
    rightSide: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginRight: "2%",
      color: "black",
    },
    rightIcons: {
      display: "flex",
      margin: ".5rem",
      backgroundColor: "rgb(163, 173, 194)",
      color: "black",
    },
    myIcon: {
      display: "flex",
      justifyContent: "space-around",
      marginLeft: "11px",
      marginTop: "8px",
      color: "white",
      fontSize: "12px",
    },
    iconAvatar: {
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "9px",
      width: "20px",
    },
  };

  return (
    <header id="headerBackground" style={styles.myHeader}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <FaGraduationCap style={styles.logo} />
        </div>
        <h1>Report Card</h1>
      </div>

      <div style={styles.rightSide}>
        <div style={styles.myIcon}></div>
        <button style={styles.rightIcons}>
          <Link to={"/"}>
            <small>Home</small>
          </Link>
        </button>
        <button style={styles.rightIcons}>
          <Link to={"/Grades"}>
            <small>Grades</small>
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
