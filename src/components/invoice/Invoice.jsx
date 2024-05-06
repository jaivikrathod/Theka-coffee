import React, { useEffect, useState } from "react";
import easyinvoice from "easyinvoice";

export default function Invoice() {
    useEffect(() => {
        fetchData();
      }, []);
      const [OrderData, setOrderData] = useState([]);
    
      const fetchData = async () => {
      const username =window.localStorage.getItem("user");
    
        try {
          const result = await axios.get("http://localhost:8081/outgoingorder", {
            params: {
              username: username,
            },
          });
          // console.log(result);
          setOrderData(result.data);
        } catch (err) {
          console.log("Wrong!!!");
        }
      };
    
//   const [invoiceBase64, setInvoiceBase64] = useState("");

//   const createinvoice = async () => {
//     const data = getSampleData();
//     const result = await easyinvoice.createInvoice(data);
//     setInvoiceBase64(result.pdf);
//   };

//   const downloadInvoice = async () => {
//     const data = getSampleData();
//     const result = await easyinvoice.createInvoice(data);
//     easyinvoice.download("myInvoice.pdf", result.pdf);
//   };

//   const renderInvoice = async () => {
//     document.getElementById("pdf").innerHTML = "loading...";
//     const data = getSampleData();
//     const result = await easyinvoice.createInvoice(data);
//     easyinvoice.render("pdf", result.pdf);
//   };

  // const data = data; // for  data from backend
  // const sampleData = (data) => {
  //   return {data};
  // };
  // You can use this function to get sample data from backend
  const AllData= ()=>{
    let Quantity=[];
    {OrderData.map((Order, i) => {
        Quantity[i] = Order.Quantity;
    })
  }
//   console.log(Quantity[0]);
}

  const getSampleData = () => {
    
    return {
     
      // mode: "development",
      // apiKey: "free",
      images: {
        // logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
      },
      information: {
        number: "2021.0001",
        date: "12-12-2021",
        "due-date": "31-12-2021",
      },
      
      products: [
        {
            
          quantity: OrderData,
          description: "Product 1",

          // Price: "-",
          // "tax-rate": 6,
          // price: 33.87,
        },
        {
          quantity: 4.1,
          description: "Product 2",
          // "tax-rate": 6,
          // price: 12.34,
        },
        {
          quantity: 4.5678,
          description: "Product 3",
          // "tax-rate": 21,
          // price: 6324.453456,
        },
        {
          description: "Total Quantity",
          quantity: 10,
        },
      ],

      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // settings: {
      //   currency: "INR",
      // },
      translate: {
        // price: "-",
        // total: "-",
      },
    };
  };

  return (
    <div>
      {/* <button onClick={createinvoice}>Create Invoice</button>
      <button onClick={downloadInvoice}>Download Invoice</button>
      <button onClick={renderInvoice}>Render Invoice</button> */}
      <br />
      <br />
      <p>
        {/* Invoice Base64 (click create invoice): <small>{invoiceBase64}</small> */}
      </p>
      <div id="pdf"></div>
    </div>
  );
}
