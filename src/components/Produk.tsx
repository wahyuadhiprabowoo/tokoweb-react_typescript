import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Pagination,
  Stack,
  Box,
  LinearProgress,
  Container,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../konstanta/common";
import { Barang } from "../types";
import { formatCurrency } from "../utilities/formatCurrency";
import CircularProgress from "@mui/material/CircularProgress";

function Produk() {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const [searchBox, setSearchBox] = useState<string>("");
  const [searchParams, setSearchParams] = useState<string>("");

  async function FetchProduk() {
    const { data } = await axios.get(
      `${baseURL}api/product?size=10&page=${page}&search=${searchParams}`
    );
    return data;
  }
  const { isLoading, data } = useQuery<Barang>(
    ["product", page, searchParams],
    FetchProduk
  );
  // if (isLoading) {
  //   return (
  //     <Box sx={{ width: "100%" }}>
  //       <LinearProgress />
  //     </Box>
  //   );
  // }

  const handleSearchProduk = (text: string) => {
    setSearchParams(text);
  };
  const handleSearchBox = (e: any) => {
    setSearchBox(e.target.value);
  };

  const handleGoToDetail = (id: number) => {
    navigate(`${id}`);
  };
  // console.log(data?.data.content.length);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <div className="my-12 fullheight">
        <div className="">
          <div className="my-8 text-end">
            <input
              type="text"
              placeholder="Search…"
              className="w-32 input input-bordered md:w-64"
              value={searchBox}
              onChange={handleSearchBox}
            />
            <Button size="large" onClick={() => handleSearchProduk(searchBox)}>
              Cari
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-screen py-32 mx-auto text-center">
            <CircularProgress color="secondary" size={96} />
          </div>
        ) : (
          <div className="">
            {data?.data?.content.length ? (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={{ xs: 3, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 9 }}
              >
                {data?.data?.content.map((value) => (
                  <Grid item xs={4} sm={4} md={3}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={require("../assets/logo/icon-biru.png")}
                          alt="Toko - Icon"
                          onClick={() => handleGoToDetail(value.id)}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                          >
                            <div>
                              <p className="mb-2 badge badge-primary badge-outline">
                                {value.category}
                              </p>
                            </div>
                            {value.name}
                          </Typography>
                          <Typography variant="h6" color="" align="right">
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
            ) : (
              <div className="mx-auto my-24 text-base border-2 card card-normal w-72 md:108 bg-base-100">
                <div className="card-body">
                  <h2 className="mx-auto font-bold text-center card-title">
                    Produk Tidak Ditemukan
                  </h2>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Produk */}
        {/* End Produk */}
        <div className="py-4">
          <Stack spacing={3}>
            <Pagination
              color="primary"
              count={data?.data?.totalPages}
              page={page}
              onChange={handleChangePagination}
            />
          </Stack>
        </div>
      </div>
    </Container>
  );
}

export default Produk;
