import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
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
    onFilterChange(item.filter); // Notify the parent about the filter change
  };

  return (
    <div className="h-screen bg-white p-2">
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disableRipple
            onClick={() => handleClick(item)}
            className={`rounded-lg transition-all duration-300 ease-in-out ${
              activeFilter === item.name ? "bg-purple-200 font-semibold" : ""
            }`}
          >
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
                    : "text-black"
                }`,
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;

