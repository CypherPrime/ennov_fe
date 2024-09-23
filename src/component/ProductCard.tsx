// File: ProductCard.tsx
import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating, Box } from "@mui/material";
import './mainContentStyles.css'
import { useNavigate } from "react-router-dom";

interface props{
name:string;
description:string;
price:number;
onclickLearn:()=>void
}

const ProductCard: React.FC<props> = ({name,price,description,onclickLearn}) => {
  const [rating, setRating] = React.useState<number | null>(4);
const navigate = useNavigate()
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        "&:hover .image-overlay": {
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          alt="Lizard"
          height="200"
          image="https://cdn-images.farfetch-contents.com/14/82/97/77/14829777_26844957_1000.jpg"
          sx={{
            filter: "brightness(80%)",
            "&:hover": {
              filter: "brightness(100%)",
              transition: "filter 0.3s ease-in-out",
            },
          }}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <div className="card-container-description">
          {description}
        </div>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button size="large" variant="contained" sx={{backgroundColor: '#ff4b2b',textTransform:'capitalize',}}>
          Add to Cart
        </Button>
        <Button onClick={onclickLearn} size="large" variant="outlined" sx={{borderColor:'#ff4b2b',color:'#ff4b2b',borderWidth:1,textTransform:'capitalize'}}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
