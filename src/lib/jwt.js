import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


export const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; 
  }
};
