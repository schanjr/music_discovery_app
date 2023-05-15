/* eslint-disable */
import React, {useState, forwardRef} from 'react';
import {List, ListItem, Collapse, Button, Drawer,} from '@material-ui/core';
import clsx from 'clsx';
import {ExpandLess, ExpandMore, MenuOpen,} from '@material-ui/icons';
import {NavLink as RouterLink, NavLinkProps} from 'react-router-dom';
import useStyles from './navigationSideBarStyle.js';
import navigationRoutes from "src/views/navigationRoutes";

export interface MenuItem {
  children?: MenuItem[];
  name: string;
  url?: string;
  links?: MenuItem[];
}

interface MenuState {
  [key: string]: boolean;
}

interface MenuBarProps {
  className?: string;
  menuItems?: { data: MenuItem[] };
}

const MenuBar = (props: MenuBarProps) => {
  const menuItemsData = props.menuItems ? props.menuItems : navigationRoutes // default use the routes, otherwise allow user to send in menu items
  const [drawerOpened, setDrawerOpened] = useState(false)
  const [menu, setMenu] = useState<MenuState>({});
  const {className, ...rest} = props;
  const classes = useStyles();
  const handleClick = (item: string) => {
    const newData = {...menu, [item]: !menu[item]};
    setMenu(newData);
  };
  const handleNavigationToggle = (event: object) => {
    setDrawerOpened(!drawerOpened)
  }
  const CustomRouterLink = forwardRef<HTMLDivElement, NavLinkProps>((props, ref) => (
          <div ref={ref} style={{flexGrow: 1}}>
            <RouterLink {...props} />
          </div>
  ));
  const handleMenu = (children: MenuItem[], level = 0) => {
    return children.map(({children, name, url = "", links}) => {
      const subMenu: string = classes[`subMenu${level}` as keyof typeof classes];
      if (!children) {
        return (
                <List component="div" disablePadding key={name}>
                  <ListItem className={classes.item} disableGutters key={name}>
                    <Button
                            className={clsx({
                              [classes.btnRoot]: true,
                              [classes.button]: true,
                              [subMenu]: true,
                            })}
                            component={CustomRouterLink}
                            to={url}
                    >
                      {name}
                    </Button>
                  </ListItem>
                </List>
        );
      }
      return (
              <div key={name}>
                <ListItem className={classes.item} disableGutters key={name} onClick={() => handleClick(name)}>
                  <Button
                          className={clsx({
                            [classes.btnRoot]: true,
                            [classes.button]: true,
                            [subMenu]: true,
                          })}
                  >
                    {name} {menu[name] ? <ExpandLess/> : <ExpandMore/>}
                  </Button>
                </ListItem>
                <Collapse in={(menu[name])} timeout="auto" unmountOnExit>
                  {handleMenu(children, level + 1)}
                </Collapse>
              </div>
      );
    });
  };
  return (
          <div className={classes.root}>
            <MenuOpen className={clsx(classes.item, classes.menuOut)}
                      aria-controls="customized-menu"
                    // aria-haspopup="true"
                    // variant="contained"
                    // color="primary"
                      onClick={(obj) => handleNavigationToggle(obj)}
            >
              Music
            </MenuOpen>
            <Drawer anchor="left" classes={{paper: classes.drawer}}
                    open={drawerOpened}
                    variant="persistent">
              <MenuOpen className={clsx(classes.item, classes.menuOut)}
                        onClick={(obj) => handleNavigationToggle(obj)}/>
              <List {...rest} >
                {handleMenu(menuItemsData.data)}
              </List>
            </Drawer>
          </div>
  );
};
export default MenuBar;
