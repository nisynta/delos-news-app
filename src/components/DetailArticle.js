import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const DetailArticle = ({ data, setDetailData }) => {
  const [coinLabel, setCoinLabel] = useState("");
  const [coins, setCoins] = useState();
  const [balance, setBalance] = useState(100000);

  const history = useHistory();

  const existArticle = JSON.parse(localStorage.getItem("articles"));

  useEffect(() => {
    diffDate();
  }, []);

  const diffDate = () => {
    let today = new Date();
    let publish_date = new Date(data?.publishDate);
    const diffTime = Math.abs(today.getTime() - publish_date.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      setCoinLabel("(Free)");
      setCoins(0);
    } else if (diffDays <= 7) {
      setCoinLabel("20.000 coins");
      setCoins(20000);
    } else if (diffDays <= 1) {
      setCoinLabel("50.000 coins");
      setCoins(50000);
    } else {
      return;
    }
  };

  let cartItem = {
    id: data.id,
    coverImage: data.coverImage,
    title: data.title,
    author: data.author,
    publishDate: data.publishDate,
    url: data.url,
  };

  const addArticle = () => {
    let cartArray = [];
    // If article cart is not empty
    if (localStorage.getItem("articles")) {
      cartArray = existArticle;
    }
    cartArray.push(cartItem);

    let cartJSON = JSON.stringify(cartArray);
    localStorage.setItem("articles", cartJSON);
  };

  const checkArticle = () => {
    for (const item in existArticle) {
      if (existArticle[item].id === data.id) {
        return true;
      }
    }
    return false;
  };

  const buyArticle = (coin) => {
    let labelCoin = null;
    let result = null;

    if (coin === 0) {
      labelCoin = "free";
      result = balance - coin;
      setBalance(result);
    } else if (coin === 20000) {
      labelCoin = "20000 coins";
      result = balance - coin;
      setBalance(result);
    } else if (coin === 50000) {
      labelCoin = "50000 coins";
      result = balance - coin;
      setBalance(result);
    }

    swal({
      title: "Are you sure?",
      text: `You will buy this article for ${labelCoin}`,
      icon: "warning",
      buttons: ["Cancel", "Ok"],
    }).then((ok) => {
      if (ok) {
        addArticle();
        history.push("/article/purchase");
      }
    });
  };

  return (
    <>
      <section>
        <div className="container mt-4">
          <div className="row justify-content-center mb-8">
            <div className="col-12 col-md-12 col-lg-8 mb-0 mb-lg-0">
              <div className="mb-0 text-center">
                <h2>{data?.title}</h2>
              </div>

              <div className="text-center">
                <img
                  className="mt-4"
                  src={data?.coverImage}
                  alt="cover-image"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p className="font-10 text-muted mt-2">{data?.captionImage}</p>
              </div>

              <div className="mb-0 mt-4 text-justify">
                <b>{data?.author}</b>
                <p>
                  <small>{data?.publishDate}</small>
                </p>

                <p>{data?.abstract}</p>
                <br />

                <span>
                  <p>
                    <b>Keyword:</b>
                    <i> {data?.keyword}</i>
                  </p>
                </span>
              </div>

              <Row
                style={{ justifyContent: "space-between", marginTop: "20%" }}
              >
                <Col md={6} className="mb-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setDetailData(false)}
                  >
                    Back to List of Articles
                  </Button>
                </Col>

                <Col xs="auto" className="mb-4">
                  <Button
                    variant="primary"
                    onClick={() => buyArticle(coins)}
                    disabled={checkArticle()}
                  >
                    Buy Article {coinLabel}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailArticle;
