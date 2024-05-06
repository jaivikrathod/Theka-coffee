const express = require("express");
const app = express();
const port = 8081;
const mysql = require("mysql");
const cors = require("cors");
// const bcrypt = require('bcrypt')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// import products2 from "./export_product";

// const product = Object.keys(products2);

// const salt = 10;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "theka_coffee",
  multipleStatements: true,
});

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ Error: "You are not authorized..." });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.json({ Error: "Invalid token" });
    req.User_id = decoded.User_id;
    next();
  });
};

app.get("/api", (req, res) => {
  return res.json({ message: "Connected...." });
});

app.get("/get_product", (req, res) => {
  con.query("SELECT Product_name FROM product_table", (err, result, field) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    const products = result.map((row) => row["Product_name"]);
    res.json({ data: products });
  });
});

app.get("/add_warehouse", (req, res) => {
  con.query("SELECT Warehouse_id FROM warehouse", (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    const warehouses = result.map((row) => row["Warehouse_id"]);
    res.json({ data: warehouses });
  });
});

app.get("/users", (req, res) => {
  con.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/products", (req, res) => {
  con.query("SELECT * FROM product_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/warehouse", (req, res) => {
  con.query("SELECT * FROM warehouse", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/stock", (req, res) => {
  const username = req.query.username;
  console.log(username);

  con.query(
    "SELECT * FROM stock where User_id=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/getTotalStock", (req, res) => {
  con.query(
    "SELECT COUNT(stock_id) AS total_rows FROM stock",
    (err, result) => {
      if (err) return res.json({ Error: "Error in fetching stock total" });

      return res.send(result);
    }
  );
});
app.get("/getAllOrder", (req, res) => {
  // const warehouse =req.query.warehouse;

  con.query(
    "SELECT * FROM order WHERE order_status='accept'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getTotalYourOrders", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT COUNT(*) AS total_rows FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Sender_id=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Extract the total number of rows from the result
        const totalRows = result[0].total_rows;
        res.send({ totalRows });
      }
    }
  );
});

app.get("/yourorder", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT `order`.*, product_table.Product_name FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Sender_id=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/incomingorder", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT `order`.*, product_table.Product_name FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? AND `order`.order_status = 'pending'",
    [username],
    (err, result) => {
      // con.query("SELECT `order`.*, product_table.Product_name, stock_table.quantity FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id JOIN stock_table ON `order`.Product_id = stock_table.Product_id WHERE `order`.Reciever_id = ? AND `order`.order_status = 'pending'",[username], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getTotalIncomigOrders", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT COUNT(*) AS total_rows FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? AND `order`.order_status = 'pending'",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Extract the total number of rows from the result
        const totalRows = result[0].total_rows;
        res.send({ totalRows });
      }
    }
  );
});

app.get("/outgoingorder", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT `order`.*, product_table.Product_name FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? AND `order`.order_status IN ('Recieved','Accepted') ",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/return-order", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT `order`.*, product_table.Product_name FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? AND `order`.order_status = 'Returned' ",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getTotalOutgoingOrders", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT COUNT(*) AS total_rows FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? AND `order`.order_status = 'Accepted'",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Extract the total number of rows from the result
        const totalRows = result[0].total_rows;
        console.log(totalRows);
        res.send({ totalRows });
      }
    }
  );
});

app.get("/getManager", (req, res) => {
  const username = req.query.username;
  console.log(username);
  if (username === "Admin") {
    con.query(
      "SELECT User_id from `users` WHERE User_type != 'admin'",
      (err, result) => {
        if (err) return res.json({ Error: "User not found..." });

        return res.send(result);
      }
    );
  } else {
    con.query(
      "SELECT Superior_Manager from users where User_id = ?",
      [username],
      (err, result) => {
        if (err) return res.json({ Error: "User not found..." });

        return res.send(result);
      }
    );
  }
});

//get message
app.get("/getMessage", (req, res) => {
  const sender = req.query.username;
  console.log(sender);

  con.query(
    "SELECT * FROM messages WHERE Receiver_id = ? OR Sender_id = ?",
    [sender, sender],
    (err, result) => {
      if (err) return res.json({ Error: "Cannot read message..." });

      return res.send(result);
    }
  );
});

//get history
app.get("/history", (req, res) => {
  const username = req.query.username;

  con.query(
    "SELECT `order`.*, product_table.Product_name FROM `order` JOIN product_table ON `order`.Product_id = product_table.Product_id WHERE `order`.Reciever_id=? OR `order`.Sender_id = ?  ORDER BY `order`.Order_date DESC LIMIT 10",
    [username, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getUser", (req, res) => {
  const username = req.query.username;
  console.log(username);

  con.query(
    "SELECT * FROM users WHERE User_id = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/demo", (req, res) => {
  const sql =
    "INSERT INTO `users` (`User_id`, `Password`, `First_Name`, `Last_Name`, `Email`, `Mobile_number`, `User_type`, `Date`) VALUES (?, ?, '', '', '', '', '', current_timestamp()) ";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Cannot hashed password..." });

    const values = [req.body.username, hash];

    con.query(sql, values, (err, result) => {
      if (err) return res.json({ Error: "Cannot insert data..." });

      return res.json({ Status: "Success" });
    });
  });
});

app.post("/demo", (req, res) => {
  const saltRounds = 10; // Define the number of salt rounds
  bcrypt.genSalt(saltRounds, (err, salt) => {
    // Generate salt using bcryptjs
    if (err) return res.json({ Error: "Cannot generate salt..." });

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      // Hash password using bcryptjs
      if (err) return res.json({ Error: "Cannot hash password..." });

      const sql =
        "INSERT INTO `users` (`User_id`, `Password`, `First_Name`, `Last_Name`, `Email`, `Mobile_number`, `User_type`, `Date`) VALUES (?, ?, '', '', '', '', '', current_timestamp()) ";
      const values = [req.body.username, hash];

      con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Cannot insert data..." });

        return res.json({ Status: "Success" });
      });
    });
  });
});

//login
// app.post('/', (req, res) => {
//   const sql = "SELECT * FROM users where User_id = ?";
//   con.query(sql, [req.body.username], (err, result) => {
//     if (err) return res.json({ Error: "Login internal server error..." })

//     if (result.length > 0) {
//       bcrypt.compare(req.body.password.toString(), result[0].Password, (err, response) => {
//         if (err) return res.json({ Error: "Invalid password..." })

//         if (response) {
//           const token = jwt.sign({ username: result[0].User_id }, process.env.SECRET_KEY, { expiresIn: '10h' })

//           res.cookie('token', token)
// res.append(Path2D = "")
// window.localStorage.setItem("loggedIn", "true")
//           return res.json({ Status: "Success" })
//         }
//         else {
//           return res.json({ Error: "Password didn't match..." })

//         }
//       })
//     }
//     else {
//       return res.json({ Error: "Invald username..." })
//     }
//   })
// })

app.post("/", (req, res) => {
  const sql = "SELECT * FROM users where User_id = ?";
  con.query(sql, [req.body.username], (err, result) => {
    if (err) return res.json({ Error: "Login internal server error..." });

    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          // Using bcryptjs.compare instead of bcrypt.compare
          if (err) return res.json({ Error: "Invalid password..." });

          if (response) {
            const token = jwt.sign(
              { username: result[0].User_id },
              process.env.SECRET_KEY,
              { expiresIn: "10h" }
            );

            res.cookie("token", token);
            // res.append(Path2D = "")
            // window.localStorage.setItem("loggedIn", "true")
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password didn't match..." });
          }
        }
      );
    } else {
      return res.json({ Error: "Invalid username..." });
    }
  });
});

//set new password
app.post("/newpass", (req, res) => {
  // const username = req.name;
  const pass = req.body.password;
  const conpass = req.body.conpassword;
  console.log(pass + " " + conpass);
  // const { token, password, conpassword } = req.body;
  const username = req.body.username;
  console.log(username);
  // con.query(sql, username, (err, result) => {
  if (pass === conpass) {
    const saltRounds = 10; // Define the number of salt rounds
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // Generate salt using bcryptjs
      if (err) return res.json({ Error: "Cannot generate salt..." });

      bcrypt.hash(pass.toString(), salt, (err, hash) => {
        // Hash password using bcryptjs
        if (err) return res.json({ Error: "Cannot hash password..." });

        const values = [hash, username];

        con.query(
          "UPDATE `users` SET `Password` = ? WHERE `User_id` = ?",
          values,
          (err, result) => {
            if (err) return res.json({ Error: "Cannot insert data..." });

            console.log("query executed");
            return res.json({ Status: "Success" });
          }
        );
      });
    });
  } else {
    return res.json({ Error: "Password doesn't match" });
  }
  // })
});

//add-user
let userTypeCounts = {};
// var Superior_Manager = "h3llo";
app.post("/add-user", (req, res) => {
  const generateUsername = (userType) => {
    let abbreviation = "";

    // Determine the abbreviation based on the user type
    switch (userType.toLowerCase()) {
      case "center warehouse manager":
        abbreviation = "cwm";
        break;
      case "sub warehouse manager":
        abbreviation = "subwm";
        break;
      case "outlet manager":
        abbreviation = "otm";
        break;
      default:
        abbreviation = userType.charAt(0).toUpperCase();
    }
    // Initialize count if it doesn't exist
    if (!userTypeCounts[abbreviation]) {
      userTypeCounts[abbreviation] = 1;
    }

    // Generate the username
    let username = abbreviation + userTypeCounts[abbreviation];

    // Increment the count for the user type
    userTypeCounts[abbreviation]++;

    // return username;
    return username.toUpperCase();
  };

  const saltRounds = 10; // Define the number of salt rounds
  bcrypt.genSalt(saltRounds, (err, salt) => {
    // Generate salt using bcryptjs
    if (err) return res.json({ Error: "Cannot generate salt..." });

    bcrypt.hash("123", salt, (err, hash) => {
      // Hash password using bcryptjs

      if (err) return res.json({ Error: "Cannot hash password..." });

      const find_super_manager = async (warehouse) => {
        return new Promise((resolve, reject) => {
          con.query(
            "SELECT users.User_id FROM users WHERE users.Dedicated_Warehouse = (SELECT warehouse.SuperiorWarehouse FROM warehouse WHERE warehouse.Warehouse_id = ?)",
            [warehouse],
            (err, result) => {
              if (err) reject("Error1");
              resolve(result[0].User_id);
            }
          );
        });
      };

      const insertUser = async () => {
        try {
          const warehouse = req.body.warehouse;
          const superManager = await find_super_manager(warehouse);

          const sql =
            "INSERT INTO `users` (`User_id`, `Password`, `Dedicated_Warehouse`,`Superior_Manager`,`First_Name`, `Last_Name`, `Email`, `Mobile_number`, `User_type`, `Date`) VALUES (?, ?,?,?, ?, ?, ?, ?, ?, current_timestamp()) ";

          const values = [
            generateUsername(req.body.position),
            hash,
            req.body.warehouse,
            superManager,
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.mobilenumber,
            req.body.position,
          ];

          con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Cannot insert data..." });

            return res.json({ Status: "Success" });
          });
        } catch (error) {
          console.error("Error:", error);
        }
      };

      insertUser();

      // const warehouse = req.body.warehouse;

      //   const find_super_manager = async () => {
      //     const warehouse = req.body.warehouse;

      //     // if (warehouse.contains("CW")) {
      //     //   return "Cannot have a superior warehouse";
      //     // }
      //     //  else {

      //     con.query(
      //       "SELECT users.User_id FROM users users WHERE users.Dedicated_Warehouse = (SELECT warehouse.SuperiorWarehouse FROM warehouse WHERE warehouse.Warehouse_id = ?)",
      //       [warehouse],
      //       (err, result) => {
      //         if (err) return "Error1";

      //         // con.query(
      //         //   "SELECT User_id FROM users WHERE Dedicated_Warehouse = ?",
      //         //   [result[0].Dedicated_Warehouse],
      //         //   (err, result) => {
      //         //     if (err) return  "Error2"

      //         //     return result[0].User_id;
      //         //   }
      //         // );
      //         return result[0].SuperiorWarehouse;
      //       }
      //     );
      //     // }
      //   };

      //   const sql =
      //     "INSERT INTO `users` (`User_id`, `Password`, `Dedicated_Warehouse`,`Superior_Manager`,`First_Name`, `Last_Name`, `Email`, `Mobile_number`, `User_type`, `Date`) VALUES (?, ?,?,?, ?, ?, ?, ?, ?, current_timestamp()) ";

      //   const values = [
      //     generateUsername(req.body.position),
      //     hash,
      //     req.body.warehouse,
      //     find_super_manager(),
      //     req.body.firstname,
      //     req.body.lastname,
      //     req.body.email,
      //     req.body.mobilenumber,
      //     req.body.position,
      //   ];

      //   con.query(sql, values, (err, result) => {
      //     if (err) return res.json({ Error: "Cannot insert data..." });

      //     return res.json({ Status: "Success" });
      //   });
      // })
      // .catch((error) => {
      //   console.error("Error:", error);
    });
  });
});
// });

// add-warehouse

let warehouseTypeCount = {};
app.post("/add-warehouse", (req, res) => {
  console.log(req.body.type);

  const generateWarehouseID = (warehouseType) => {
    let abbreviation = "";
    const state_abbreviation = req.body.state;
    const city_abbreviation = req.body.city;
    const area_abbreviation = req.body.Area;

    // Determine the abbreviation based on the user type
    switch (warehouseType) {
      case "Center warehouse":
        abbreviation = "cw" + state_abbreviation.slice(0, 2);
        break;
      case "Sub warehouse":
        abbreviation = "subw" + city_abbreviation.slice(0, 2);
        break;
      case "Outlet":
        abbreviation = "otl" + area_abbreviation.slice(0, 2);
        break;

      default:
        abbreviation = warehouseType.charAt(0).toUpperCase();
    }
    // Initialize count if it doesn't exist
    if (!warehouseTypeCount[abbreviation]) {
      warehouseTypeCount[abbreviation] = 1;
    }

    // Generate the username
    let WarehouseID = abbreviation + warehouseTypeCount[abbreviation];

    // Increment the count for the user type
    warehouseTypeCount[abbreviation]++;

    // return username;
    return WarehouseID.toUpperCase();
  };

  const sql =
    " INSERT INTO `warehouse` (`Warehouse_id`, `Warehouse_type`, `State`, `city`, `area`, `SuperiorWarehouse`) VALUES (?,?,?,?,?,?)";
  const values = [
    generateWarehouseID(req.body.type),
    req.body.type,
    req.body.state,
    req.body.city,
    req.body.Area,
    req.body.Superior,
  ];

  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Cannot insert data..." });

    return res.json({ Status: "Success" });
  });
});

//add product
let ProductTypeCount = {};

app.post("/add-product", (req, res) => {
  const generateProductID = (product, category) => {
    let abbreviation = "";
    let temp = product.slice(0, 2);
    let temp2 = category.slice(0, 2);
    abbreviation = temp + temp2;

    // Initialize count if it doesn't exist
    if (!ProductTypeCount[abbreviation]) {
      ProductTypeCount[abbreviation] = 1;
    }

    // Generate the username
    let productID = abbreviation + ProductTypeCount[abbreviation];

    // Increment the count for the user type
    ProductTypeCount[abbreviation]++;

    // return username;
    return productID.toUpperCase();
  };
  const sql =
    " INSERT INTO `product_table` (`Product_id`, `Product_name`, `Product_descripiton`, `Expire_limit`, `category`, `weight`) VALUES (?,?,?,?,?,?)";

  const values = [
    generateProductID(req.body.productname, req.body.category),
    req.body.productname,
    req.body.description,
    req.body.ExpiryLimit,
    req.body.category,
    req.body.weight,
  ];

  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Cannot insert data..." });

    return res.json({ Status: "Success" });
  });
});

//add stock
// let StockTypeCount = {};

app.post("/add-stock", (req, res) => {
  // const generateStockID = () => {
  //   let abbreviation = "STCK";
  //   if (!StockTypeCount[abbreviation]) {
  //     StockTypeCount[abbreviation] = 1;
  //   }
  //   StockTypeCount[abbreviation]++;
  //   let stockID = abbreviation + StockTypeCount[abbreviation];
  //   return stockID;
  // };
  const sql =
    " INSERT INTO `stock` ( `Product_name`, `User_id`, `quantity`, `manufacture_date`, `expiry_date`, `supplier_name`) VALUES (?,?,?,?,?,?);";

  const values = [
    // generateStockID(),
    req.body.productname,
    req.body.username,
    req.body.Quantity,
    req.body.Manufacture_Date,
    req.body.Expiry_Date,
    req.body.Supplier_Name,
  ];

  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Cannot insert data..." });

    return res.json({ Status: "Success" });
  });
});
// app.post("/MakeOrder", (req, res) => {
//   // function get_reciever(sender){
//   //   con.query("SELECT Superior_Manager FROM users WHERE User_id=?",[sender],(err,result)=>{
//   //     console.log( result.Superior_Manager);
//   //     return result[0].Superior_Manager;
//   //   })
//   // }
//   // function get_product_Id(productname){
//   //   con.query("SELECT Product_id  FROM product_table WHERE Product_name=?",[productname],(err,result)=>{
//   //     console.log(result.Product_id);
//   //     return result[0].Product_id;
//   //   })
//   // }
// function get_val(){

//   function get_reciever(sender) {
//     return new Promise((resolve, reject) => {
//       con.query("SELECT Superior_Manager FROM users WHERE User_id=?", [sender], (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result[0].Superior_Manager);
//         }
//       });
//     });
//   }

//   function get_product_Id(productname) {
//     return new Promise((resolve, reject) => {
//       con.query("SELECT Product_id FROM product_table WHERE Product_name=?", [productname], (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result[0].Product_id);
//         }
//       });
//     });
//   }
//   Promise.all([get_reciever(req.body.sender), get_product_Id(req.body.productname)])
//   .then(([receiver, productId]) => {
//     // Do something with receiver and productId
//     console.log("Receiver:", receiver);

//     console.log("Product ID:", productId);
//     // Send response
//     // res.status(200).send("Order made successfully");
//     return values = [
//       "o11  ",
//       "",
//       req.body.sender,
//       //  "",
//       // get_reciever(req.body.sender),
//       // get_product_Id(req.body.productname),
//       // "",
//       receiver,
//       productId,
//       "",
//       "",
//       "",
//       "",
//       "",
//       // req.body.Quantity,
//       // req.body.DueDate,
//       // "pending",
//       // req.body.Description,
//     ];
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//     // Send error response
//     res.status(500).send("Internal Server Error");
//   });

// }

//   const sql =
//     "INSERT INTO `order` (`Order_id`, `Stock_id`, `Sender_id`, `Reciever_id`, `Product_id`, `Quantity`, `Order_date`, `Due_date` , `Order_status`, `Description`) VALUES (?, ?, ?, ?, ?, ?, current_timestamp(), ?, ?, ?)";

//   con.query(sql, get_val(), (err, result) => {
//     if (err) return res.json({ Error: "Cannot insert data..." });

//     return res.json({ Status: "Success" });
//   });
// });

//////////////forget
app.post("/MakeOrder", (req, res) => {
  function get_val() {
    return new Promise((resolve, reject) => {
      function get_reciever(sender) {
        return new Promise((resolve, reject) => {
          con.query(
            "SELECT Superior_Manager FROM users WHERE User_id=?",
            [sender],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result[0].Superior_Manager);
              }
            }
          );
        });
      }

      function get_product_Id(productname) {
        return new Promise((resolve, reject) => {
          con.query(
            "SELECT Product_id FROM product_table WHERE Product_name=?",
            [productname],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result[0].Product_id);
              }
            }
          );
        });
      }

      con.query(
        "SELECT MAX(Order_id) AS maxOrderId FROM `order`",
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            let nextOrderId = result[0].maxOrderId
              ? Number.parseInt(result[0].maxOrderId) + 1
              : 1;
            console.log(nextOrderId);
            Promise.all([
              get_reciever(req.body.sender),
              get_product_Id(req.body.productname),
            ])
              .then(([receiver, productId]) => {
                // Do something with receiver and productId
                console.log("Receiver:", receiver);
                console.log("Product ID:", productId);
                resolve([
                  "",
                  req.body.sender,
                  receiver,
                  productId,
                  req.body.Quantity,
                  req.body.DueDate,
                  "pending",
                  req.body.Description,
                ]);
              })
              .catch((err) => {
                console.error("Error:", err);
                reject(err);
              });
          }
        }
      );
    });
  }

  const sql =
    "INSERT INTO `order` ( `Sender_Stock_id`, `Sender_id`, `Reciever_id`, `Product_id`, `Quantity`, `Order_date`, `Due_date`, `Order_status`, `Description`) VALUES ( ?, ?, ?, ?, ?, current_timestamp(), ?, ?, ?)";

  get_val()
    .then((values) => {
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error:", err);
          return res.json({ Error: "Cannot insert data..." });
        }
        return res.json({ Status: "Success" });
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    });
});

// app.post("/acceptReject", async (req, res) => {
//   const orderId = req.body.Order.Order_id;
//   const mod = req.body.mode;
//   const receice_qt = req.body.Order.Quantity;

//   try {
//     // Update order status
//     const orderUpdateResult = await updateOrderStatus(orderId, mod);

//     if (!orderUpdateResult.success) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Update stock quantity
//     const stockUpdateResult = await updateStockQuantity(req.body.Order.Product_name, req.body.Order.Reciever_id, 2);

//     if (!stockUpdateResult.success) {
//       return res.status(404).json({ message: "Stock not found" });
//     }

//     // Both updates succeeded
//     return res.json({ message: "Order and stock updated successfully" });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return res.status(500).json({ Error: "Internal Server Error" });
//   }
// });

app.post("/acceptReject", async (req, res) => {
  let stock_id2 = "";
  function getsuperior_quantity(userId,Product_name) {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT quantity,stock_id from stock WHERE User_id = ? AND Product_name=?",
        [userId,Product_name],
        (err, result) => {
          if (err) return reject(err);

          resolve({
            quantity: result[0].quantity,
            stock_id: result[0].stock_id,
          });
        }
      );
    });
  }
  const orderId = req.body.Order.Order_id;
  const mod = req.body.mode;
  const receice_qt = req.body.Order.Quantity;
  // console.log("Order quantity" + receice_qt);
  // console.log(req.body.Order);
  // console.log(req.body.Order.Product_name);
  // console.log(req.body.Order.Reciever_id);
  console.log(mod);
  try {
    // Update order status
    const orderUpdateResult = await updateOrderStatus(orderId, mod);

    if (!orderUpdateResult.success) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (mod !== "Rejected" && mod !== "") {
      const { quantity, stock_id } = await getsuperior_quantity(
        req.body.Order.Reciever_id,req.body.Order.Product_name
      );
      // const qt = await quantity.quantity
      stock_id2 = stock_id;
      const finalStock = quantity - receice_qt;
      // Update stock quantity
      console.log("Total" + quantity);
      console.log("Final quantity" + finalStock);
      const stockUpdateResult = await updateStockQuantity(
        req.body.Order.Product_name,
        req.body.Order.Reciever_id,
        finalStock
      );

      if (!stockUpdateResult.success) {
        return res.status(404).json({ message: "Stock not found" });
      }

      // Both updates succeeded
      return res.json({ message: "Order and stock updated successfully" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
});

// Function to update order status
function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE `order` SET `Order_status` = ? WHERE `order`.`Order_id` = ?",
      [status, orderId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve({ success: result.affectedRows > 0 });
      }
    );
  });
}

// Function to update stock quantity
function updateStockQuantity(productName, userId, newQuantity) {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE `stock` SET `stock`.`quantity` = ? WHERE `stock`.Product_name = ? AND `stock`.User_id = ?",
      [newQuantity, productName, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve({ success: result.affectedRows > 0 });
      }
    );
  });
}

// app.post("/acceptReject", (req, res) => {
//   const orderId = req.body.Order.Order_id;
//   // console.log(orderId);
//   const mod = req.body.mode;
//   console.log(req.body.stock);

//   con.query("UPDATE `order` SET `Order_status` = ? WHERE `order`.`Order_id` =?",[mod,orderId], (err, result) => {
//     if (err) return res.json({ Error: "Internal Server Error" });

//     if (result.length === 0) {
//       return res.json({ message: "Order not found" });
//     }
//     else{
//       return res.json({ message: "Order updated" });

//     }

//     // "SELECT users.User_id FROM users WHERE users.Dedicated_Warehouse = (SELECT warehouse.SuperiorWarehouse FROM warehouse WHERE warehouse.Warehouse_id = ?)",

//   });

//   con.query("UPDATE `stock` SET `stock`.`quantity` = ? WHERE `stock`.Product_name=? AND `stock`.User_id = ? ",[2,req.body.Order.Product_name,req.body.Order.Reciever_id], (err, result) => {
//     if (err) return res.json({ Error: "Internal Server Error" });

//     if (result.length === 0) {
//       return res.json({ message: "Stock not found" });
//     }
//     else{
//       return res.json({ message: "Stock updated" });

//     }

//   });
// });

// app.post("/delete-Product", (req, res) => {
//   // const username = req.body.username;
//   const Product_ID = req.body.product;
//   console.log(" product id:- " +Product_ID);
//   const delete_query = "DELETE FROM product_table WHERE Product_id=?";
//   con.query(delete_query, [Product_ID], (err, result) => {
//     if (err) return res.json({ Error: "Internal issue" });

//     if (result.length == 0) {
//       return res.json({ message: "Product not found" });
//     }
//     res.json({ message: "Product Deleted" });
//   });
// });

app.post("/delete-Stock", (req, res) => {
  // const username = req.body.username;
  const Stock_ID = req.body.stock;
  console.log(Stock_ID);
  const delete_query = "DELETE FROM stock WHERE stock_id=?";
  con.query(delete_query, [Stock_ID], (err, result) => {
    if (err) return res.json({ Error: "Internal issue" });

    if (result.length == 0) {
      return res.json({ message: "Stock not found" });
    }
    res.json({ message: "Stock Deleted" });
  });
});

app.post("/cancel-order", (req, res) => {
  // const username = req.body.username;
  const Order_id = req.body.order;
  console.log(Order_id);
  const delete_query = "DELETE FROM `order` WHERE Order_id=?";
  con.query(delete_query, [Order_id], (err, result) => {
    if (err) return res.json({ Error: "Internal issue" });

    if (result.length == 0) {
      return res.json({ message: "Order not found" });
    }
    res.json({ message: "Order Deleted" });
  });
});

app.post("/delivered-order", async (req, res) => {
  const Order_id = req.body.order.Order_id;

  const update_status =
    "UPDATE `order` SET `Order_status` = 'Recieved', `Order_received_date`=current_timestamp(),`Reciever_Stock_id`=? WHERE `order`.`Order_id` = ?";
  const update_stock =
    " INSERT INTO `stock` ( `Product_name`, `User_id`, `quantity`,  `supplier_name`,`manufacture_date`,`expiry_date`) VALUES (?,?,?,?,current_timestamp(), DATE_ADD(current_timestamp(), INTERVAL 5 DAY));";
  console.log(req.body.order.Product_name);
  const values = [
    req.body.order.Product_name,
    req.body.username,
    req.body.order.Quantity,
    "",
  ];

  //   await new Promise(async (resolve, reject) => {
  //     con.query(update_stock, values, (err, result) => {
  //       if (err) reject(err);
  //       else resolve(result.insertId);
  //     }).then (async(lastInsertId)=>{

  //     await new Promise((resolve, reject) => {
  //         con.query(update_status, [lastInsertId,Order_id], (err, result) => {
  //           if (err) reject(err);
  //           else resolve(result);
  //         });
  //       });

  //       res.json({ Status: "Success" });
  //     });
  //   });
  // }
  await new Promise(async (resolve, reject) => {
    con.query(update_stock, values, (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  })
    .then(async (lastInsertId) => {
      await new Promise((resolve, reject) => {
        con.query(update_status, [lastInsertId, Order_id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      res.json({ Status: "Success" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/update-Quantity", (req, res) => {
  const quantity = req.body.data.updatedQuntity;
  const Stock_ID = req.body.argument.StockId;
  // console.log(quantity);
  // console.log(Stock_ID);
  const update_stock =
    "UPDATE `stock` SET `quantity` = ? WHERE `stock`.`stock_id` = ?";
  con.query(update_stock, [quantity, Stock_ID], (err, result) => {
    if (err) return res.json({ Error: "Internal issue" });

    if (result.length == 0) {
      return res.json({ message: "Stock not found" });
    }
    res.json({ message: "Stock Updated" });
  });
});

app.post("/edit-product", (req, res) => {
  const productID = req.body.product_id;
  const description = req.body.data.description;
  const Expiry_Limit = req.body.data.Expiry_Limit;
  const Category = req.body.data.Category;
  const Weight = req.body.data.Weight;
  // console.log();
  const update_product =
    "UPDATE `product_table` SET `Product_descripiton` = ?, `Expire_limit` = ?, `category` = ?, `weight` = ? WHERE `product_table`.`Product_id` = ?";
  con.query(
    update_product,
    [description, Expiry_Limit, Category, Weight, productID],
    (err, result) => {
      if (err) return res.json({ Error: "Internal issue" });

      if (result.length == 0) {
        return res.json({ message: "Product not found" });
      }
      res.json({ message: "Product Updated" });
    }
  );
});

app.post("/return-order", async (req, res) => {
  const Order_id = req.body.argument.Order_ID;
  console.log(Order_id);
  const Reason = req.body.data.Reason;
  const return_order =
    "UPDATE `order` SET `Order_status` = 'Returned', `Return_date`=current_timestamp(),`description_for_return`=? WHERE `order`.`Order_id` = ?";
  const minus_stock =
    "UPDATE stock JOIN `order` ON stock.stock_id = `order`.Reciever_Stock_id SET stock.quantity = stock.quantity - `order`.Quantity WHERE `order`.Order_id = ?";
  // const combinedQuery = return_order + "; " + minus_stock;

  const minusStockPromise = new Promise((resolve, reject) => {
    con.query(minus_stock, [Order_id], (err, result) => {
      if (err) {
        reject({ Error: "Internal issue" });
      } else {
        if (result.length == 0) {
          reject({ message: "Order not found" });
        } else {
          resolve({ message: "Order Updated" });
        }
      }
    });
  });

  const returnOrderPromise = new Promise((resolve, reject) => {
    con.query(return_order, [Reason, Order_id], (err, result) => {
      if (err) {
        reject({ Error: "Internal issue" });
      } else {
        if (result.length == 0) {
          reject({ message: "Order not found" });
        } else {
          resolve({ message: "Order Updated" });
        }
      }
    });
  });

  Promise.all([minusStockPromise, returnOrderPromise])
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/forgot", (req, res) => {
  const username = req.body.username;
  const mobilenumber = req.body.mobile;
  console.log(mobilenumber);
  const sql = "SELECT * FROM users where User_id = ? AND Mobile_number = ?";
  con.query(sql, [username, mobilenumber], (err, result) => {
    if (err) return res.json({ Error: "Internal Server Error" });

    if (result.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = result[0].User_id;

    // res.cookie('username', user);
    res.json({ message: "Password reset link sent" });
    // const token  = jwt.sign({userId:user},process.env.SECRET_KEY,{expiresIn:'10h'});
  });
});

//set new password
app.post("/newpass", (req, res) => {
  // const username = req.name;
  const pass = req.body.password;
  const conpass = req.body.conpassword;
  console.log(pass + " " + conpass);
  // const { token, password, conpassword } = req.body;
  const username = req.body.username;
  console.log(username);
  // con.query(sql, username, (err, result) => {
  if (pass === conpass) {
    const saltRounds = 10; // Define the number of salt rounds
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // Generate salt using bcryptjs
      if (err) return res.json({ Error: "Cannot generate salt..." });

      bcrypt.hash(pass.toString(), salt, (err, hash) => {
        // Hash password using bcryptjs
        if (err) return res.json({ Error: "Cannot hash password..." });

        const values = [hash, username];

        con.query(
          "UPDATE `users` SET `Password` = ? WHERE `User_id` = ?",
          values,
          (err, result) => {
            if (err) return res.json({ Error: "Cannot insert data..." });

            console.log("query executed");
            return res.json({ Status: "Success" });
          }
        );
      });
    });
  } else {
    return res.json({ Error: "Password doesn't matched with each other" });
  }
  // })
});

app.put("/updateUser", (req, res) => {
  const values = [
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Email,
    req.body.Mobile_number,
    req.body.username,
  ];

  con.query(
    "UPDATE `users` SET First_Name = ?,Last_Name = ?,Email = ?,Mobile_number=? WHERE User_id = ?",
    values,
    (err, result) => {
      if (err) return res.json({ Error: "Cannot update user..." });

      return res.json({ Status: "Successfully updated.." });
    }
  );
});

app.post("/sendMessage", (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  console.log(sender + " " + receiver + " " + req.body.message);

  con.query(
    "INSERT INTO `messages` (`messade_id`, `Sender_id`, `Receiver_id`, `Message`, `Date`) VALUES (NULL, ?, ?, ?, current_timestamp())",
    [sender, req.body.receiver, req.body.message],
    (err, result) => {
      if (err) return res.json({ Error: "Unable to sent meaasge" });

      return res.json({ Status: "Successfully Sent" });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost/${port}`);
});

// app.get("fetch-product",(req,res)=>{
//   const get_product = "SELECT * FROM product_table";
//   // console.log(get_product);
//   con.query(get_product,(err,result,field)=>{
//     if(err){
//       console.error("Error while fetching data",err);
//       return;
//     }
//     res.json(result);
//   })
// })
