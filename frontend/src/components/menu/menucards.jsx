import React from "react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { formatAmount, capitalize } from "../../controllers/utils";

const MenuCard = ({ product, index, handleAddToCart }) => {
  return (
    <div
      class="card"
      style={{ width: "100%", border: "1px solid #cccccc" }}
      key={index}
    >
      <Image
        height={{ base: "260px", sm: "260px", md: "200px", lg: "170px" }}
        objectFit="cover"
        src={product.imageUrl}
        alt={product.name}
      />
      {/* <img
        class="card-img-top"
        height={{ md: 40 }}
        loading="lazy"
        src={product.imageUrl}
        alt={product.name}
      /> */}
      <div class="card-body">
        <Heading as="h3" size="md" className="mb-1">
          {capitalize(product.name)}
        </Heading>

        <p class="card-text my-2">
          {capitalize(product.description).toString().substring(0, 40)}
        </p>
        {/* <p>
          <span className="text-muted mb-2">
            {" "}
            {product.productCategory &&
              product.productCategory.name &&
              product.productCategory.name}
          </span>
        </p> */}
        {/* <p className="font-weight-bold mb-2">{formatAmount(product.price)}</p> */}
        <button
          onClick={() => handleAddToCart(product)}
          class="btn btn-primary mt-2"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
