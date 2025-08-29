const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

/**
 * Helper function to alternate caps
 * Example: input = ["a","b","c"] => "CbA"
 */
function alternateCapsReverse(alphabets) {
  let str = alphabets.join("");
  let reversed = str.split("").reverse().join("");
  let result = "";

  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toUpperCase();
    } else {
      result += reversed[i].toLowerCase();
    }
  }
  return result;
}

// ====== POST /bfhl ======
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        if (!isNaN(num)) {
          if (num % 2 === 0) even_numbers.push(item.toString());
          else odd_numbers.push(item.toString());
          sum += num;
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: "dheeraj_udatha_31082004", // <-- replace with your name + dob
      email: "udathadheeraj.sagar2022@vitstudent.ac.in", // <-- replace with your email
      roll_number: "22BCE1833", // <-- replace with your roll number
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternateCapsReverse(alphabets),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: error.message,
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("BFHL API is running ✅. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
