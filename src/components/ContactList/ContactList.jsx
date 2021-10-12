import { useSelector, useDispatch } from "react-redux";
import { contactsOperations } from "../../redux/contacts";
import { contactsSelectors } from "../../redux/contacts";

import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function ContactList() {
  const dispatch = useDispatch();

  const listForRender = useSelector(contactsSelectors.getFilteredContacts);

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Demo>
              <List>
                {listForRender.map(({ name, number, id }) => (
                  <ListItem key={id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          dispatch(contactsOperations.deleteContact(id))
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <AccountCircleIcon
                        sx={{ fontSize: 40 }} 
                        color="primary"
                      />
                    </ListItemAvatar>
                    <ListItemText primary={name} secondary={number} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ContactList;
