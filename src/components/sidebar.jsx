import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Drawer,
  useMediaQuery,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import foxNews from "../assets/foxNews.png";
import cnn from "../assets/cnn.png";
import reuters from "../assets/reuters.png";
import bbc from "../assets/bbc.webp";
import ap from "../assets/ap.png";
import wsj from "../assets/wsj.png";
import bloomberg from "../assets/bloomberg.png";
import toi from "../assets/TOI.webp";

const Sidebar = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:912px)");

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, filter: "all" },
    { name: "Positive", icon: <MoodIcon />, filter: "positive" },
    { name: "Neutral", icon: <SentimentNeutralIcon />, filter: "neutral" },
    { name: "Negative", icon: <SentimentDissatisfiedIcon />, filter: "negative" },
    { name: "CNN", icon: <Avatar alt="CNN" src={cnn} />, filter: "cnn" },
    { name: "Reuters", icon: <Avatar alt="Reuters" src={reuters} />, filter: "reuters" },
    { name: "BBC News", icon: <Avatar alt="BBC News" src={bbc} />, filter: "bbc-news" },
    { name: "The Wall Street Journal", icon: <Avatar alt="WSJ" src={wsj} />, filter: "the-wall-street-journal" },
    { name: "Associated Press", icon: <Avatar alt="AP" src={ap} />, filter: "associated-press" },
    { name: "Bloomberg", icon: <Avatar alt="Bloomberg" src={bloomberg} />, filter: "bloomberg" },
    { name: "Fox News", icon: <Avatar alt="Fox News" src={foxNews} />, filter: "fox-news" },
    { name: "The Times Of India", icon: <Avatar alt="Times Of India" src={toi} />, filter: "the-times-of-india" },
  ];

  const handleClick = (item) => {
    setActiveFilter(item.name);
    onFilterChange(item.filter);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const renderMenuItems = (items) =>
    items.map((item, index) => (
      <ListItem
        key={index}
        disableRipple
        onClick={() => handleClick(item)}
        className={`rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-100 ${
          activeFilter === item.name ? "bg-purple-200" : ""
        }`}
        sx={{
          padding: "10px 16px",
          marginBottom: "6px",
          position: "relative",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {activeFilter === item.name && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-l-lg" />
        )}

        <ListItemIcon
          className={`transition-colors duration-300 ${
            activeFilter === item.name ? "text-purple-900" : "text-purple-800"
          }`}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            className: `transition-all ${
              activeFilter === item.name
                ? "text-purple-800 font-semibold"
                : "text-gray-800"
            }`,
          }}
        />
      </ListItem>
    ));

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "rgba(243, 232, 255, 1)",
            },
          }}
        >
          <MenuIcon sx={{ color: activeFilter !== "Home" ? "#7c3aed" : "#4b5563" }} />
        </IconButton>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "85%",
              maxWidth: "320px",
              minWidth: "240px",
              boxSizing: "border-box",
              paddingTop: "0px",
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
            },
          }}
        >
          <div className="flex justify-between items-center p-4 bg-purple-50 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-purple-800">News Filters</h2>
            <IconButton onClick={() => setDrawerOpen(false)} className="hover:bg-purple-100">
              <CloseIcon sx={{ color: "#7c3aed" }} />
            </IconButton>
          </div>

          <div className="overflow-y-auto">
            <div className="p-3">
              <h3 className="text-sm font-medium text-purple-700 px-3 py-2 uppercase tracking-wider">Sentiment</h3>
              <List dense>{renderMenuItems(menuItems.slice(0, 4))}</List>
            </div>

            <Divider sx={{ my: 1 }} />

            <div className="p-3">
              <h3 className="text-sm font-medium text-purple-700 px-3 py-2 uppercase tracking-wider">Sources</h3>
              <List dense>{renderMenuItems(menuItems.slice(4))}</List>
            </div>
          </div>
        </Drawer>
      </>
    );
  }

  // For desktop view, use a simplified structure similar to the old sidebar
  return (
    <div className="h-screen bg-white p-4">
      <h2 className="text-xl font-bold text-purple-800 mb-6">News Filters</h2>
      
      <div>
        <h3 className="text-sm font-medium text-purple-700 px-2 py-2 uppercase tracking-wider">Sentiment</h3>
        <List dense>{renderMenuItems(menuItems.slice(0, 4))}</List>
      </div>

      <Divider sx={{ my: 2 }} />

      <div>
        <h3 className="text-sm font-medium text-purple-700 px-2 py-2 uppercase tracking-wider">Sources</h3>
        <List dense>{renderMenuItems(menuItems.slice(4))}</List>
      </div>
    </div>
  );
};

export default Sidebar;
