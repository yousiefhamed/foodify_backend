const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/order", (req, res) => {
  const filePath = path.join(__dirname, "order.json");
  let order = [];

  if (fs.existsSync(filePath)) {
    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      order = JSON.parse(fileData);
    } catch (error) {
      console.error("Error reading or parsing file:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.json(order);
});

app.post("/updateOrder", (req, res) => {
  const filePath = path.join(__dirname, "order.json");
  console.log(req);
  try {
    // Parse the request body
    const order = req.body;

    // Write the updated order data to the file
    fs.writeFileSync(filePath, JSON.stringify(order));

    // Respond with success message
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    // Respond with an appropriate error message and status code
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
