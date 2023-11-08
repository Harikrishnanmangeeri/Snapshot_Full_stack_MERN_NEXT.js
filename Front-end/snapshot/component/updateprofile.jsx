'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookies } from 'cookies-next';
const cookie = getCookies('token')
import { EditRounded as EditIcon } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { useRouter } from 'next/navigation'
export default function UpdateProfile() {
  const router = useRouter()
  const [profile,setprofile]=useState()
  
  useEffect(()=>{async function profile(){
    const profiles = await axios.get('http://127.0.0.1:3001/api/user/profile',
    {
     headers: {
       Authorization: `Bearer ${cookie.token} `,
       
     },
   })
    setprofile(profiles.data)
 }profile()},[])
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bio = e.target.bio.value;
    const username = e.target.username.value;
    const website = e.target.website.value;
    const contact = e.target.contact.value;

   
    try {
        if (cookie.token) {
        
          await axios.put(
            'http://127.0.0.1:3001/api/user/Editprofile',
            {
              bio: bio,
              website: website,
              contact: contact,
              username: username,
            },
            {
              headers: {
                Authorization: `Bearer ${cookie.token} `,
                
              },
            }
           
          );
  
          router.push("/user_profile");
          // console.log('success');
        } else {
          console.error('Token is missing in cookies.');
        
        }
      } catch (error) {
        console.error('from send',error);
      }
    e.target.reset();
  };

  return (
    <Container component="main">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={5} sx={{ borderRadius: "9px" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "3vh",
            }}
          >
            <Typography component="h1" variant="h5">
              Update Profile
            </Typography>
            {profile?.map((data) => (
              <form noValidate onSubmit={handleSubmit}>
                <Avatar
                  src={data.avatar} // Display user's avatar
                  alt="Profile Picture"
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "0 auto 1rem",
                  }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  defaultValue={data.bio}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  defaultValue={data.username}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  defaultValue={data.website}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  defaultValue={data.contact}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    background: "Red",
                    color: "white",
                    borderRadius: "9px",
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>

                {/* Example of an edit icon */}
                <IconButton color="primary" >
                  <EditIcon />
                </IconButton>
              </form>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}