import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {fetchCategories} from "../../../store/actions/categoiesActions";

const AppDrawer = () => {
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories.categories);

  useMemo(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {position: "relative", zIndex: "0"},
      }}
      open
    >
      <Box
        sx={{ width: "240px", marginTop: "100px"}}
        role="presentation"
      >
        <Typography variant="h5" textAlign="center">
          Categories
        </Typography>
        <List>
          {categories && categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton>
                <ListItemText primary={category.title} />
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