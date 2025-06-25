const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes')
const purchaseRoutes=require('./routes/purchaseRoutes')
const transferRoutes = require('./routes/transferRoutes');

// other routes like dashboardRoutes, purchaseRoutes, etc.

dotenv.config();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/transfer', transferRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));