import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../controllers/api";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const UsersComponent = (props) => {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const UserCard = ({ product: { name, email, phone, slug } }) => {
    return (
      <div class="card" style={{ width: "100%", border: "2px solid #cccccc" }}>
        <div class="card-body">
          <Heading as="h3" size="lg" className="mb-23">
            {capitalize(name)}
          </Heading>
          <p class="card-text my-2">{email}</p>
          <p class="card-text my-2">{phone}</p>
          {/* <p className="font-weight-bold mb-2">Hello</p> */}
          <a
            href={"/menu/" + slug}
            className="btn btn-primary mt-2"
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/menu/" + slug);
            }}
          >
            View Menu
          </a>
        </div>
      </div>
    );
  };

  let [productData, setProductData] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let [loading, setLoading] = useState(false);

  let headers = {
    "Content-Type": "application/json",
  };

  const fetchrecords = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/guest/users", config);
      if (!res) return false;
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(async () => {
    $(document).ready(function () {
      $("#myInput").on("input", function () {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $("#grid div").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

    const products = await fetchrecords();
    if (!products) {
      new AWN().alert("Network Error. Kindly check your internet connection", {
        durations: { alert: 0 },
      });
    }
    setProductData(products.users);
    console.log(products);
    setLoading(true);
    $("body").css({ background: "#ffffff" });
  }, [refreshData]);

  return (
    // <Button colorScheme="blue">Button</Button>
    <div className="container mt-4">
      <div className="px-2">
        <div className="text-center">
          <Heading as="h3" size="xl">
            Our Amazing Users
          </Heading>
        </div>

        <div className="mt-5">
          <div className="row mb-4 justify-content-end">
            <div className="col-sm-4 col-9">
              <form
                className="form-inline"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-group mb-2 col-sm-12 pl-0">
                  <label htmlFor="inputPassword2" className="sr-only">
                    Search
                  </label>
                  <input
                    type="search"
                    className="form-control col-sm-12"
                    id="myInput"
                    placeholder="Search..."
                  />
                </div>
              </form>
            </div>
            <div className="col-sm-2 col-3 p-0">
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setLoading(false);
                    setRefreshData(!refreshData);
                  }}
                  className="btn w-100 btn-success waves-effect waves-light mb-2"
                >
                  <span className="d-none d-md-inline-block">Refresh</span>

                  <i className="mdi mdi-refresh px-1" />
                </button>
              </div>
            </div>
            {/* end col*/}
          </div>

          <Center>
            <Box w="100%">
              <SimpleGrid
                columns={{ sm: 2, md: 2, lg: 3 }}
                spacing={10}
                id="grid"
              >
                {loading &&
                  productData &&
                  productData.length >= 1 &&
                  productData.map((product, index) => (
                    <UserCard product={product} />
                  ))}
              </SimpleGrid>

              {loading && productData && productData.length === 0 && (
                <div className="text-center py-3">
                  <Heading as="h6" size="sm"></Heading>
                  <h3> Kindly check back later.</h3>
                </div>
              )}
              {!loading && (
                <div className="text-center py-5 my-5 h-100">
                  <div
                    class="spinner-border avatar-xxl text-primary m-2"
                    role="status"
                  ></div>
                  <h4> Loading...</h4>
                </div>
              )}
              {/* {product}
            {Array(20)
              .fill("")
              .map((_, i) => (
                <MenuCard property={property} />
              ))} */}
            </Box>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
