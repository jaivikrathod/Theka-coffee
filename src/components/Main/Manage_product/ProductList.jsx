import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
import { Link } from "react-router-dom";
import "../../../css/Table.css";
import * as XLSX from "xlsx";
import ContentHeader from "../../header/ContentHeader";
import Edit_product from "../../commonForAll/Edit_product_modal";

export default function ProductList() {
  useEffect(() => {
    fetchData();
  }, []);
  const [ProductData, setProductData] = useState([]);
  const tableRef = useRef(null);
  const [search, setSearch] = useState("");

  const [productFilter, setProductFilter] = useState("None");
  const [categoryFilter, setCategoryFilter] = useState("None");

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleProductFilterChange = (event) => {
    // console.log(event.target.value);
    setProductFilter(event.target.value);
  };

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "product_list.xlsx"); // Writing the file
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8081/products");
      // console.log(result);
      setProductData(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const reload = () => {
    location.reload();
  };

  const [selectedProductId, setSelectedProductId] = useState([]);

  const handleModalOpen = (product) => {
    setSelectedProductId(product);
  };
  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Product List"
          sub_content="Information about Product"
        />
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={productFilter}
                  onChange={handleProductFilterChange}
                >
                  <option value="None">Select Product-Name</option>
                  {ProductData.map((product, index) => (
                    <option value={product.Product_name} key={index}>
                      {product.Product_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select2">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                >
                  <option className="form-control form-control2 " value="None">
                    Select Category
                  </option>
                  <option className="form-control form-control2 " value="Brew">
                    Brew
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Powder"
                  >
                    Powder
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Bottle"
                  >
                    Bottle
                  </option>
                  <option className="form-control form-control2 " value="Syrup">
                    Syrup
                  </option>
                </select>
              </div>

              <div className="input-group  mainSearch mb-3">
                <input
                  type="search"
                  className="form-control  form-control2 search-table"
                  tabIndex="-1"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-search Icon searchIconTable" />

                <i
                  onClick={reload}
                  className="bi Icon reloadIcon bi-arrow-clockwise"
                />
                <i
                  onClick={downloadExcel}
                  className="fa-solid download Icon fa-arrow-down"
                />
              </div>
            </div>
            <div className="table2 responsive-table">
              <table className="table table-bordered " ref={tableRef}>
                <thead className="table-success">
                  <tr >
                    <th className="text-center">Sr. no</th>

                    <th className="text-center">Product_id</th>
                    <th className="text-center">Product name</th>
                    <th className="text-center">Product Description</th>
                    <th className="text-center">Expiry Limit(in days)</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Weight( Qt. / grams. / Ltr.)</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductData.filter((item) => {
                    //filter
                    if (
                      productFilter !== "None" &&
                      item.Product_name !== productFilter
                    )
                      return false;
                    if (
                      categoryFilter !== "None" &&
                      item.category !== categoryFilter
                    )
                      return false;

                    if (search.trim() === "") return true; // Return all items if search is empty

                    // Convert search term to lowercase
                    const lowerCaseSearch = search.toLowerCase();

                    // Check if any of the specified fields include the search term
                    return (
                      (item.Product_id &&
                        item.Product_id.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Product_name &&
                        item.Product_name.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Product_descripiton &&
                        item.Product_descripiton.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Expire_limit &&
                        item.Expire_limit.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.category &&
                        item.category
                          .toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.weight &&
                        item.weight
                          .toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch))
                    );
                  }).map((product, i) => {
                    return (
                      <tr key={i} >
                        <td className="text-center"> {i + 1} </td>
                        <td className="text-center"> {product.Product_id} </td>
                        <td className="text-center"> {product.Product_name} </td>
                        <td className="text-center"> {product.Product_descripiton} </td>
                        <td className="text-center"> {product.Expire_limit} </td>
                        <td className="text-center"> {product.category} </td>
                        <td className="text-center"> {product.weight} </td>
                        <td className={"editDelete text-center"}>
                          <button
                            className={"btn edit"}
                            id="edit"
                            data-bs-toggle="modal"
                            data-bs-target="#editproduct"
                            onClick={() => handleModalOpen(product)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
              <div className="plusIcon mt-5">
                <Link to="/add-product">
                  <i className="fa-solid fa-circle-plus"></i>
                </Link>
              </div>
          </div>
        </div>
      </div>
      <Edit_product product={selectedProductId}/>
    </>
  );
}
