import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../konstanta/common";
import { ProdukFavorit } from "../types";
import { formatCurrency } from "../utilities/formatCurrency";

const Favorit = () => {
  async function FetchProdukFavorit() {
    const { data } = await axios.get(`${baseURL}api/product/favorites`);
    return data;
  }
  const { isLoading, error, data } = useQuery<ProdukFavorit>(
    ["favorite"],
    FetchProdukFavorit
  );

  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  if (error) {
    <div className="shadow-xl card w-96 bg-base-100">
      <div className="justify-center card-body">
        <h2 className="card-title">Error</h2>
      </div>
    </div>;
  }
  const navigate = useNavigate();
  const handleGoToDetail = (id: number) => {
    navigate(`produk/${id}`);
  };
  return (
    <div className="mx-12 my-12">
      <div>
        <h3 className="my-12 text-4xl font-bold text-center text-cyan-500">
          Favorit Produk
        </h3>
      </div>
      {isLoading ? (
        <div className="w-full h-screen py-32 mx-auto text-center">
          <CircularProgress color="secondary" size={96} />
        </div>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 3, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 10 }}
          gap={{ md: 4, lg: 6 }}
        >
          {data?.data?.map((value) => (
            <Grid item xs={4} sm={4} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    onClick={() => handleGoToDetail(value.id)}
                    component="img"
                    height="140"
                    image={require("../assets/logo/icon-hitam.png")}
                    alt="Toko - Icon"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      <div>
                        <p className="mb-2 badge badge-primary badge-outline">
                          {value.category}
                        </p>
                      </div>
                      {value.name}
                    </Typography>

                    <Typography variant="h5" color="" align="right">
                      {formatCurrency(value.price)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="medium"
                    color="primary"
                    onClick={() => handleGoToDetail(value.id)}
                  >
                    Detail Produk
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorit;
