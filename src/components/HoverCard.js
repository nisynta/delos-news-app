export const hoverOver = (id) => {
  if (typeof id !== "undefined" && id !== null && id !== "") {
    document.getElementById(id).style.boxShadow =
      "0px 8px 8px 0px rgb(154 161 171 / 28%)";
    document.getElementById(id).style.transform = "scale(1.01)";
  }
};

export const hoverLeave = (id) => {
  if (typeof id !== "undefined" && id !== null && id !== "") {
    document.getElementById(id).style.boxShadow =
      "0px 8px 8px 0px rgb(154 161 171 / 15%)";
    document.getElementById(id).style.transform = "scale(1)";
  }
};
