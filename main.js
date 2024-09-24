require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient("https://uhbansivzvpgwtuehajp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYmFuc2l2enZwZ3d0dWVoYWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMTAwOTUsImV4cCI6MjA0Mjc4NjA5NX0.igoEJlLTVYqeX4HvLkHhlnOd26sxjkdMenfAqWRsRoA"); // OMG free supabase key :o

const app = express();
app.use(express.json());

// Endpoint to mark a user as "online" by adding them to the online_users table
app.post('/api/join/:username', async (req, res) => {
  const { username } = req.params;

  // Add the user to the online_users table or mark them as online
  const { data, error } = await supabase
    .from('online_users')
    .upsert({ username, online: true }, { onConflict: ['username'] });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: `${username} is now online`, data });
});

// Endpoint to mark a user as "offline" by removing them from the online_users table
app.post('/api/quit/:username', async (req, res) => {
  const { username } = req.params;

  // Mark the user as offline
  const { data, error } = await supabase
    .from('online_users')
    .update({ online: false })
    .eq('username', username);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: `${username} is now offline`, data });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
