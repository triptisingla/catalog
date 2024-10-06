import { React, useContext, useState } from "react";
import axios from "axios";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);

  const handleFileChange = (e) => {
    const productPhoto = e.target.files[0];
    setProductPhoto(productPhoto);
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("productPhoto", productPhoto);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/product/postProduct",
        formData,
        {
          withCredentials: true,
        }
      );
      setName("");
      setPrice(0);
      setSize("");
      setProductPhoto(null);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="product">
        <div className="container">
          <form action="" onSubmit={handleProduct}>
            <input
              type="text"
              placeholder="Name of the product"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter size in length, width (inches) format"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Photo
              </label>

              <input
                type="file"
                accept=".jpg, .png"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit">Submit Product</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ProductForm;
