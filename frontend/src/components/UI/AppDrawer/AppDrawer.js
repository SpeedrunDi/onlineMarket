import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {fetchCategories} from "../../../store/actions/categoiesActions";
import {Link} from "react-router-dom";

const AppDrawer = () => {
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories.categories);

  useMemo(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {position: "relative", zIndex: "0"},
      }}
      open
    >
      <Box
        sx={{ width: "240px", marginTop: "80px"}}
        role="presentation"
      >
        <Typography variant="h5" textAlign="center">
          Categories
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
          {categories && categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton component={Link} to={`/?category=${category._id}`}>
                <ListItemText primary={category.title}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default AppDrawer;