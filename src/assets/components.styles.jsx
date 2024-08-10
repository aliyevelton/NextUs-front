import styled from "styled-components";

export const DefaultBtn = styled.button({
  fontFamily: "Poppins",
  cursor: "pointer",
  padding: "12px 28px",
  width: "fit-content",
  fontWeight: 500,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  fontSize: 20,
  borderRadius: 5,
  border: `1px solid`,
  transition: "0.4s",
  "&:hover": {
    opacity: 0.7,
  },
  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: "transparent !important",
    borderColor: "#8f8f8f !important",
    color: "#8f8f8f !important",
    "&:hover": {
      opacity: 1,
    },
  },
});

export const DefaultInput = styled.input({
  boxShadow: "0px 1px 2px 0px #0000000d",
  display: "flex",
  padding: "16px",
  alignIitems: "center",
  gap: "2px",
  borderRadius: "6px",
  border: "1.5px solid #D9D9D9",
  fontFamily: "Poppins !important",
  fontSize: 16,
  "&:focus": {
    outlineColor: "#6875D1",
    borderColor: "transparent",
  },
});

export const DefaultTextArea = styled.textarea({
  boxShadow: "0px 1px 2px 0px #0000000d",
  display: "flex",
  padding: "12px 16px",
  alignIitems: "center",
  gap: "2px",
  borderRadius: "6px",
  border: "1.5px solid #D9D9D9",
  fontFamily: "Poppins",
  fontSize: 16,
  height: 167,
  resize: "none",
  "&:focus": {
    outlineColor: "#6875D1",
    borderColor: "transparent",
  },
});

export const PageSection = styled.section((row) => ({
  padding: "68px 0",
  display: "flex",
  flexDirection: "column",
  gap: 32,
  ".page__section-top": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    h1: {
      color: "#181818",
      fontSize: 28,
      fontWeight: 500,
    },
    a: {
      color: "#4F59A9",
      fontSize: 20,
      fontWeight: 500,
      transition: "0.4s",
      "&:hover": {
        opacity: 0.7,
      },
    },
  },
  ".page__section-bottom": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 24,
  },
}));
