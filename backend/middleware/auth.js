import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    })
  }

  const token = authorization.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    })
  }
}

export const authenticateAdmin = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    })
  }

  const token = authorization.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      })
    }
    req.admin = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    })
  }
}
