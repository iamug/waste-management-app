import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../controllers/api";
import { useToast } from "@chakra-ui/react";
import { Affix } from "rsuite";
import { Helmet } from "react-helmet";
import { Drawer, DrawerBody, DrawerHeader } from "@chakra-ui/react";
import { DrawerCloseButton } from "@chakra-ui/react";
import { DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import MenuCard from "./menucards";
import { Heading } from "@chakra-ui/react";
import { capitalize } from "../../controllers/utils";

const MenuComponent = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const param = useParams();
  const toast = useToast();
  let [showDrawer, toggleShowDrawer] = useState(false);
  let [userData, setUserData] = useState([]);
  let [products, setProducts] = useState([]);
  let [productData, setProductData] = useState([]);
  let [categories, setCategories] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let [loading, setLoading] = useState(false);
  let [valid, setValid] = useState(true);
  let [cartItems, setCartItems] = useState([]);

  console.log({ param });

  let headers = {
    "Content-Type": "application/json",
  };

  const { id, tablename } = props.match.params;

  const fetchrecords = async () => {
    try {
      let res;
      const config = { headers };
      res = await API.get(
        "/api/guest/products/" + id + "/" + tablename,
        config
      );
      // if (tablename) {
      //   res = await API.get(
      //     "/api/guest/products/" + id + "/" + tablename,
      //     config
      //   );
      // } else {
      //   res = await API.get("/api/guest/products/" + id, config);
      // }
      if (!res) return false;
      return res.data;
    } catch (err) {
      return false;
    }
  };

  const fetchcategories = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/guest/categories/", config);
      if (!res) return false;
      return res.data;
    } catch (err) {
      return false;
    }
  };

  const filterProductsByCategory = (cat) => {
    setProductData(
      products.filter(
        (e) => e.productCategory.name.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const toggleCatNav = (e) => {
    var nav = document.querySelectorAll(" #catNav li a");
    for (var i = 0; i < nav.length; ++i) {
      nav[i].classList.remove("active");
    }
    e.target.classList.add("active");
  };

  const handleRemoveFromCart = (item) => {
    const isItemInCart = cartItems.find((value) => value._id === item._id);
    if (isItemInCart) {
      setCartItems(cartItems.filter((el) => el._id !== item._id));
      toast({
        title: "Removed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.find((value) => value._id === item._id);
    const isCatInCart = cartItems.find(
      (value) => value.productCategory._id === item.productCategory._id
    );
    if (isItemInCart) {
      toast({
        title: "Already in cart.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }
    if (isCatInCart) {
      toast({
        title: `You can only select one from ${item.productCategory.name}`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }
    setCartItems([...cartItems, item]);
    toast({
      title: "Cart added.",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };

  const handlePlaceOrder = async () => {
    if (param && param.tablename === undefined) {
      return toast({
        title: "Order failed, Kindly try scan QR code again",
        status: "error",
      });
    }
    const id = "waiting-toast";
    if (!toast.isActive(id)) {
      toast({
        id,
        title: "Please wait....",
        status: "info",
        duration: null,
      });
    }

    let tableName = param && param.tablename;
    let { _id: user, slug } = userData;
    let products = cartItems.map((item) => item["_id"]);
    let body = { tableName, user, products, slug };
    try {
      const config = { headers };
      const res = await API.post("/api/guest/orders", body, config);
      if (res.status == 201) {
        toast.closeAll();
        toast({
          title: "Order successful.",
          status: "success",
        });
        setCartItems([]);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        toast.closeAll();
        toast({
          title: `Order failed. ${err.response.data.msg}`,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast.closeAll();
        toast({
          title: "Order failed, Kindly try again",
          status: "error",
        });
      }
    }
  };

  const DoesNotExist = () => (
    <div className="text-center py-3">
      <Heading as="h6" size="sm">
        This user does not exist.
      </Heading>
      <h3> </h3>
      <a
        href="#"
        onClick={() => {
          props.history.push("/menu");
        }}
        class="btn btn-primary mt-2"
      >
        Go back to users
      </a>
    </div>
  );

  useEffect(async () => {
    const data = await fetchrecords();
    console.log({ data });
    const categories = await fetchcategories();
    if (categories) setCategories(categories.categories);
    if (!data) setValid(false);
    data.user && setUserData(data.user);
    setProductData(data.products);
    setProducts(data.products);
    setLoading(true);
    let imageSrc =
      data?.user?.bannerImg ||
      "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80";
    //"https://source.unsplash.com/1600x900/?jollof";

    document.getElementById("header").style.background =
      "#ffffff url(' " + imageSrc + " ') no-repeat center";
    document.getElementById("header").style.backgroundSize = "cover";

    $(document).ready(function () {
      $("#myInput").on("input", function () {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $("#grid div").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
    return () => {
      $("body").css({ "background-image": "unset" });
    };
  }, [refreshData]);

  return (
    <React.Fragment>
      {loading ? (
        <>
          <div className="">
            <header id="header" className="py-4 py-lg-5 ">
              <div className="container">
                {loading && valid && userData && (
                  <div className="col-sm-12 col-12 col-md-8 col-lg-6 p-0">
                    <div className="text-left bg-white shadow  rounded-lg mx-auto p-2 py-3 row">
                      <div className="col-10">
                        <Heading as="h4" size="lg" className="mb-2">
                          {userData && userData.name}'s Menu
                        </Heading>

                        <Heading as="h6" size="sm" className="text-muted mb-1">
                          Email : {userData && userData.email}
                        </Heading>
                        {userData?.phone && (
                          <Heading
                            as="h6"
                            size="sm"
                            className="text-muted mb-1"
                          >
                            Phone : {userData?.phone}
                          </Heading>
                        )}
                      </div>
                      <div className="col-2 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setLoading(false);
                            setRefreshData(!refreshData);
                          }}
                          className="btn btn-outline-success waves-effect waves-light mb-2 mr-1"
                        >
                          <i className="mdi mdi-refresh" />
                        </button>
                      </div>

                      <Helmet>
                        <title>{userData && userData.name}</title>
                        <meta name="description" content="Your description" />
                        <meta
                          name="keywords"
                          content="Aguziendu Ugochukwu Portfolio events menu app "
                        ></meta>
                      </Helmet>
                    </div>
                  </div>
                )}
              </div>
            </header>

            <div className="container mt-3">
              <Affix top={0} style={{ zIndex: 1 }}>
                <div className="row py-1 py-md-2 border-bottom justify-content-between bg-white">
                  <div className="col-sm-4 col-7 col-md-4">
                    <form
                      className="form-inline"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="form-group mb-2 col-sm-12 px-0">
                        <label htmlFor="" className="sr-only">
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
                  <div className="col-sm-4 col-5 col-md-3 order-12 offset-md-3">
                    <div className="text-right">
                      {/* <button
                        type="button"
                        onClick={() => {
                          setLoading(false);
                          setRefreshData(!refreshData);
                        }}
                        className="btn btn-success waves-effect waves-light mb-2 mr-1"
                      >
                        <i className="mdi mdi-refresh" />
                      </button> */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleShowDrawer(!showDrawer);
                          onOpen();
                        }}
                        className="btn btn-primary waves-effect waves-light mb-2"
                      >
                        <span className="mr-1">Continue</span>{" "}
                        <i className="mdi mdi-cart" />
                        <small className=" badge badge-dark rounded-pill">
                          {cartItems.length}
                        </small>
                      </button>
                    </div>
                  </div>
                  {/* end col*/}
                </div>
              </Affix>

              <Center>
                <Box w="100%">
                  <div className="my-3">
                    <ul className="nav nav-pills" id="catNav">
                      <li className="nav-item">
                        <a
                          className="nav-link active rounded-pill m-1 btn btn-sm border"
                          onClick={(e) => {
                            toggleCatNav(e);
                            setProductData(products);
                          }}
                        >
                          All
                        </a>
                      </li>
                      {categories &&
                        categories.length &&
                        categories.map((item, index) => (
                          <li className="nav-item" key={index}>
                            <a
                              key={index}
                              onClick={(e) => {
                                toggleCatNav(e);
                                filterProductsByCategory(item.name);
                              }}
                              className="nav-link btn btn-sm border rounded-pill m-1"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {loading && productData && (
                    <SimpleGrid
                      columns={[1, 2, 3, 3, 4]}
                      spacing={10}
                      id="grid"
                      className="pt-2"
                      style={{ borderTop: "0px solid #cccccc" }}
                    >
                      {loading &&
                        productData &&
                        productData.length >= 1 &&
                        productData.map((product, index) => (
                          <MenuCard
                            product={product}
                            index={index}
                            key={index}
                            handleAddToCart={handleAddToCart}
                          />
                        ))}
                    </SimpleGrid>
                  )}

                  {loading && !valid && <DoesNotExist />}

                  {loading && productData && productData.length === 0 && (
                    <div className="text-center py-3">
                      <Heading as="h6" size="sm">
                        There are no products yet.
                      </Heading>
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
                </Box>
              </Center>
            </div>
          </div>
          <Drawer onClose={onClose} isOpen={isOpen} size="md" placement="right">
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton className="mt-1" />
                <DrawerHeader borderBottomWidth="1px">
                  <span>
                    Your Cart
                    <small className="font-weight-bold ml-2 badge badge-primary rounded-pill">
                      {cartItems.length}
                    </small>
                  </span>
                </DrawerHeader>
                <DrawerBody>
                  <div className="col-12">
                    {cartItems && cartItems.length > 0 && (
                      <>
                        <ul className="mb-3" style={{ listStyleType: "none" }}>
                          {cartItems.map((item, index) => (
                            <li className="py-2" key={index}>
                              <div>
                                <div className="shadow-sm row g-0 border rounded overflow-hidden flex-md-row">
                                  <div className="col-sm-5 col-5 col-md-5 p-0 ">
                                    <img
                                      src={item.imageUrl}
                                      className="img-fluid"
                                      style={{
                                        height: "120px",
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                    />
                                  </div>
                                  <div className="col-sm-6 col-xs-6 col-6 col-md-6 p-2 pr-0">
                                    <h3 className="font-weight-bolder font-16">
                                      {capitalize(item.name)}
                                    </h3>
                                    <h6 className="mt-3">
                                      {item.productCategory &&
                                        item.productCategory.name &&
                                        item.productCategory.name}
                                    </h6>
                                  </div>
                                  <div className="col-1 p-o">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveFromCart(item)}
                                      className="btn btn-danger btn-sm waves-effect waves-light mt-2 ml-n4"
                                    >
                                      <i className="mdi mdi-close" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="row border shadow py-2 my-3">
                          <div className="col-4 d-flex align-items-center">
                            <span className="font-weight-bolder">
                              Table Name
                            </span>
                          </div>
                          <div className="col-8">
                            <input
                              type="text"
                              className="form-control col-sm-12"
                              placeholder=""
                              value={(param && param.tablename) || null}
                              readOnly={true}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <button
                            onClick={() => handlePlaceOrder()}
                            className="btn btn-primary mt-2 px-3"
                          >
                            Place Order
                          </button>
                        </div>
                      </>
                    )}

                    {cartItems.length === 0 && (
                      <div className="text-center py-3">
                        <Heading as="h6" size="sm">
                          No items in cart.
                        </Heading>
                      </div>
                    )}
                  </div>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        /* content */
        <div className="text-center py-5 my-5 h-100">
          <div
            className="spinner-border avatar-lg text-primary m-2"
            role="status"
          ></div>
          <h4> Loading...</h4>
        </div>
      )}
    </React.Fragment>
  );
};

export default MenuComponent;
