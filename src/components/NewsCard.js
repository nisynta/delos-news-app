import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { hoverLeave, hoverOver } from "./HoverCard";

const NewsCard = ({
  data, // object
  id, // string id
  cardOnClick, // function
}) => {
  const coverImageStyle = {
    height: "250px",
    marginBottom: "16px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <Card
        id={id}
        style={data && { minHeight: "45vh", marginTop: "35px" }}
        onClick={cardOnClick}
        onMouseEnter={() => {
          hoverOver(id);
        }}
        onMouseLeave={() => {
          hoverLeave(id);
        }}
      >
        <Card.Body>
          <div
            style={{
              ...coverImageStyle,
              backgroundImage: `url("${data?.coverImage}")`,
            }}
          ></div>

          <div>
            <Row>
              <Col>
                <div>
                  <Card.Title>{data?.title}</Card.Title>
                </div>
                <span>
                  {data?.author} | {data?.publishDate}
                </span>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsCard;
