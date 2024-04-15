// pages/api/login.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const users = JSON.parse(process.env.USERS);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Successful login
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      // Failed login
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
