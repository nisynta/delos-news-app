import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import NewsCard from "./NewsCard";

const PurchaseArticle = () => {
  const [getArticle, setGetArticle] = useState([]);
  const openArticle = useRef(null);
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let cartArray = [];
    cartArray = JSON.parse(localStorage.getItem("articles"));
    setGetArticle(cartArray);
  };

  const openArticleByUrl = (article) => {
    openArticle.current = article;
    window.open(openArticle.current);
  };

  return (
    <React.Fragment>
      <div>
        <Row
          className="mt-2 article-header"
          style={{ justifyContent: "space-between" }}
        >
          <Col md={6}>
            <h5
              className="article-purchase-title"
              onClick={() => history.push("/articles")}
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="mr-2 mb-1" size={18} />
              Purchase Article
            </h5>
          </Col>
        </Row>
      </div>
      <Row
        style={{
          width: "99%",
          marginLeft: "0.5%",
        }}
      >
        {" "}
        {getArticle?.length !== 0 && getArticle !== null ? (
          <>
            {getArticle.map((data, i) => {
              return (
                <>
                  <Col lg={4} md={6} style={{ cursor: "pointer" }} key={i}>
                    <NewsCard
                      data={data}
                      id={i}
                      cardOnClick={() => openArticleByUrl(data.url)}
                    />
                  </Col>
                </>
              );
            })}
          </>
        ) : (
          <p
            style={{ padding: "40px 0px", textAlign: "center" }}
            className="d-block mx-auto"
          >
            No Data Available
          </p>
        )}
      </Row>
    </React.Fragment>
  );
};

export default PurchaseArticle;
