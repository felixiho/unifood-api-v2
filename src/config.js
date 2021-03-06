
import dotenv from 'dotenv';

dotenv.config(); 

export default  
    {   
        "port": 3002,
        "bodyLimit": "100kb",
        "corsHeaders": ["Link"],
        "db": process.env.DB_CONNECTION
    } 