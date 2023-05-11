import Pagination from "react-js-pagination";
import { Col } from "react-bootstrap";
import "../assets/css/articles.css";

const PaginationCard = ({
  rows,
  currentPage,
  recordPerPage,
  handlePageChange,
  searchData,
}) => {
  const setValue = () => {
    const searchFilter = rows?.filter((val) => {
      if (searchData === "") {
        return val;
      } else if (
        (val.title !== null &&
          val.title.toLowerCase().includes(searchData.toLowerCase())) ||
        (val.author !== null &&
          val.author.toLowerCase().includes(searchData.toLowerCase())) ||
        (val.publishDate !== null &&
          val.publishDate.toLowerCase().includes(searchData.toLowerCase()))
      ) {
        return val;
      }
      return false;
    }).length;
    return searchFilter;
  };

  return (
    <Col lg={12}>
      <Pagination
        itemClass="page-item1"
        linkClass="page-link1"
        activePage={currentPage}
        itemsCountPerPage={recordPerPage}
        totalItemsCount={setValue()}
        pageRangeDisplayed={5}
        onChange={(val) => {
          handlePageChange(val);
        }}
      />
    </Col>
  );
};

export default PaginationCard;
