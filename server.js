const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes')
const purchaseRoutes=require('./routes/purchaseRoutes')
const transferRoutes = require('./routes/transferRoutes');
const cors=require('cors');
const pool = require('./models/db');
const auth=require('./middlewares/authMiddleware')
// other routes like dashboardRoutes, purchaseRoutes, etc.

dotenv.config();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/transfer', transferRoutes);



app.get('/assets',async (req,res)=>{
    const result=await pool.query('select * from assets')
    console.log("This is the assests")
    res.json(result.rows)
})
app.get('/bases',async (req,res)=>{
    const result=await pool.query('select * from bases')
    console.log("This is the bases",result)
    res.json(result.rows)
})


app.get('/getuserinfo',auth,(req,res)=>{
    const userbase=req.user.base_id
    console.log(userbase)
    res.send(userbase)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));