import React, { useEffect, useState, useRef } from "react";
import { getMostPopular } from "../api/api";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import PaginationCard from "../components/PaginationCard";
import DetailArticle from "../components/DetailArticle";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/css/articles.css";
import iconSearch from "./../assets/images/ic-search-outline.png";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const ArticleLists = () => {
  const [filter, setFilter] = useState("Most Emailed");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);
  const [detailData, setDetailData] = useState(false);

  const history = useHistory();

  const selectedArticle = useRef(null);

  const inputHandle = async (value) => {
    await setFilter(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = () => {
    setLoading(true);
    const onSuccess = (response) => {
      setLoading(false);

      let mostViewed = () => {
        let most_viewed = [];

        for (let i in response.data.results) {
          most_viewed.push({
            id: response.data.results[i].id,
            coverImage:
              response.data.results[i].media[0]?.["media-metadata"][2].url,
            captionImage: response.data.results[i].media[0]?.caption,
            author: response.data.results[i].byline,
            title: response.data.results[i].title,
            abstract: response.data.results[i].abstract,
            publishDate: response.data.results[i].published_date,
            url: response.data.results[i].url,
            keyword: response.data.results[i].adx_keywords,
          });
        }

        return most_viewed;
      };

      setResultData(mostViewed);
    };

    const onFailure = (response) => {
      setLoading(false);
      console.log("error ", response);
    };

    let path = "";
    if (filter === "Most Emailed") {
      path = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=`;
    } else if (filter === "Most Shared") {
      path = `https://api.nytimes.com/svc/mostpopular/v2/shared/7.json?api-key=`;
    } else if (filter === "Most Viewed") {
      path = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=`;
    } else {
      console.log("error");
    }

    getMostPopular(path, onSuccess, onFailure);
  };

  const openDetail = (article) => {
    selectedArticle.current = article;
    setDetailData(true);
  };

  return (
    <React.Fragment>
      {detailData ? (
        <>
          {selectedArticle.current && (
            <DetailArticle
              data={selectedArticle.current}
              setDetailData={setDetailData}
            />
          )}
        </>
      ) : (
        <>
          <div>
            <Row
              className="mt-2 article-header"
              style={{ justifyContent: "space-between" }}
            >
              <Col md={6}>
                <h3 className="logo">DelosNews</h3>
              </Col>
              <Col xs="auto">
                <Row>
                  <Col>
                    <UncontrolledButtonDropdown
                      direction="down"
                      className="mr-1 mb-2 ml-4"
                    >
                      <DropdownToggle
                        caret
                        color="light"
                        style={{
                          fontWeight: "500",
                          fontSize: "22px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          backgroundColor: "#ffffff",
                          borderStyle: "none",
                          marginLeft: "-15px",
                          color: "#292B2C",
                        }}
                      >
                        {filter}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            inputHandle("Most Emailed");
                          }}
                        >
                          Most Emailed
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            inputHandle("Most Shared");
                          }}
                        >
                          Most Shared
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            inputHandle("Most Viewed");
                          }}
                        >
                          Most Viewed
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => history.push("/article/purchase")}
                      className="mr-3 mb-2 ml-4 mt-1"
                      style={{fontWeight: "500"}}
                      variant="primary"
                    >
                      Purchase Article
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div
            className="articles-search mt-4"
            style={{
              marginLeft: "1.3%",
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search by title, publish date, and author"
              value={searchData}
              onChange={(e) => {
                setSearchData(e.target.value);
                handlePageChange(1);
              }}
            />

            <img src={iconSearch} alt="icon" />
          </div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner variant="primary" />
            </div>
          ) : (
            <>
              <div>
                <Row
                  style={{
                    width: "99%",
                    marginLeft: "0.5%",
                  }}
                >
                  {resultData
                    ?.filter((val) => {
                      if (searchData === "") {
                        return val;
                      } else if (
                        (val.title !== null &&
                          val.title
                            .toLowerCase()
                            .includes(searchData.toLowerCase())) ||
                        (val.author !== null &&
                          val.author
                            .toLowerCase()
                            .includes(searchData.toLowerCase())) ||
                        (val.publishDate !== null &&
                          val.publishDate
                            .toLowerCase()
                            .includes(searchData.toLowerCase()))
                      ) {
                        return val;
                      }
                      return false;
                    })
                    .slice(
                      (currentPage - 1) * recordPerPage,
                      (currentPage - 1) * recordPerPage + recordPerPage
                    )
                    .map((resData, i) => {
                      return (
                        <Col
                          lg={4}
                          md={6}
                          style={{ cursor: "pointer" }}
                          key={i}
                        >
                          <NewsCard
                            data={resData}
                            id={i}
                            cardOnClick={() => openDetail(resData)}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </div>
              <div className="article-pagination">
                <PaginationCard
                  rows={resultData}
                  currentPage={currentPage}
                  recordPerPage={recordPerPage}
                  handlePageChange={handlePageChange}
                  searchData={searchData}
                />
              </div>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default ArticleLists;
