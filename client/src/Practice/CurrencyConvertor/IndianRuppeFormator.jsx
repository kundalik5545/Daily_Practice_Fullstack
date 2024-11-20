import React, { useState } from "react";

function IndianRuppeFormator() {
  const [amount, setAmount] = useState("");

  let formatR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <div>
      <label htmlFor="amount">Enter Total Investment Amount</label>

      <input
        type="number"
              name="amount" 
        id="amount"
              style={{ width: "100px" }}
              placeholder="$0.00"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />

      <p>Formated indian rupee amount: {formatR}</p>
    </div>
  );
}

export default IndianRuppeFormator;
