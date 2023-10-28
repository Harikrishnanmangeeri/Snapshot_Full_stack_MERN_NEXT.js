'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Snackbar, Alert } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getCookies } from 'cookies-next';
import axios from 'axios';
import ContentUpload from './Upload_content_cloudnary';
const cookie = getCookies("token");


const ImageUploadModal = ({ isOpen, onClose, onImageUpload, uploadedImage }) => {
  const [selectedImage, setSelectedImage] = useState(uploadedImage);
  const [draft,setDraft]=useState(null)
 console.log(draft);
 const router = useRouter();

 const handleupload = async () => {
  try {
    
    const url = await ContentUpload(draft);
    
    
    await axios.post(
      "http://127.0.0.1:3001/api/user/draft",
      {
        draft: url,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      }
    );
    
    router.push("/publish_idea_snap")
  } catch (error) {
    console.log("from upload", error.message);
  }
 
};

  const handleImageUpload = (file) => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setDraft(file)
    }
    console.log(file);
  };
 




  const handlesubmit =async (e)=>{
    e.preventDefault()
  
    e.target.reset()
    }

 // const [isAlertOpen, setAlertOpen] = useState(false);
  // const showSuccessAlert = () => {
  //   setAlertOpen(true);
  // };

  // const publishHandel = () => {
   
  //   showSuccessAlert();
  // };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" onSubmit={handlesubmit}>
      <DialogTitle align='center'>Upload Idea Snap</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: "700px",
                minHeight: "200px",
             
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Image"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <IconButton component="label" color="secondary">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                <AddPhotoAlternateIcon fontSize="large" style={{ color: 'grey' }} />
              </IconButton>
            )}
          </div>
        </div>
      </DialogContent>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{
          background: "red",
          color: "white",
          borderRadius: "25px",
        }}
        
        sx={{ mt: 3, mb: 2 }}
        onClick={()=>handleupload()}
        // onClick={() => router.push("/publish_idea_snap")}
      >
        Open<ChevronRightIcon/>
      </Button>
{/* 
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={5000} 
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} variant="filled" severity="success">
        "Unlocking Tomorrow's Possibilities, Today! 🚀 Our Next Adventure Is Underway. Stay Tuned for a Spectacular Update - It's a Work in Progress!"
        </Alert>
      </Snackbar> */}
    </Dialog>
  );
};

export default ImageUploadModal;
