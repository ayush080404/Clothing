import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_QvpwjtnQlOudJM",
  key_secret: "zE0xZ30Idcr0qwxB7ZjT3Wjb",
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
