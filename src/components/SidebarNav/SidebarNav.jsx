import { useEffect, useRef, useState } from "react";
import "./SidebarNav.css";
import createTask from "../../../public/assets/createTask.svg";

export const SidebarNav = () => {
  const [navigations, setNavigations] = useState([
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "fa-regular fa-grid-2",
      path: "",
      children: [],
    },
    {
      id: "board",
      title: "Project Board",
      icon: "fa-light fa-folder",
      path: "",
      children: [
        {
          id: "crossXWebapp",
          title: "Cross X Web app",
          icon: "",
          path: "",
        },
        {
          id: "bakingApp",
          title: "Banking App",
          path: "",
        },
      ],
      open: false,
    },
    {
      id: "feed",
      title: "Feed",
      icon: "fa-compass",
      path: "",
      children: [],
    },
    {
      id: "message",
      title: "Messages",
      icon: "fa-comment-dots",
      path: "",
      count: 7,
      children: [],
    },
    {
      id: "teamMembers",
      title: "Team members",
      icon: "fa-users",
      path: "",
      children: [],
    },
  ]);

  const navRef = useRef(null)
  const [openSidebar, isOpenSidebar] = useState(false);

  const [selectedNav, setSelectedNav] = useState(navigations[0].id);
  const [selectedSubNav, setSelectedSubNav] = useState(null);

  const userProfile = {
    userId: "",
    name: "Comeron Williamson",
    profileUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    username: "xComeron_88",
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target) && openSidebar) {
        isOpenSidebar(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef, openSidebar]);

  const onToggerSubPart = ({id}) =>{
    const localNavigations = structuredClone(navigations);
    const navigationidx = navigations.findIndex((nav) => nav.id === id);
    localNavigations[navigationidx].open = !navigations[navigationidx].open;
    setNavigations(localNavigations);

  }

  const isEmpty = (value) => {
    if (
      value?.length === 0 ||
      value === 0 ||
      value === undefined ||
      value === null
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div ref={navRef} className={'ui-sidebar-nav ' + (openSidebar? 'ui-sidebar-nav--open':'') }>
      <div className="ui-sidebar-nav__profile">
        <div className="ui-sidebar-nav__profile__left">
          <div className="ui-sidebar-nav__profile__left__cover">
            <img
              className={"ui-sidebar-nav__profile__left__cover__image "} 
              src={userProfile.profileUrl}
              alt="profileurl"
            />
          </div>
          
        </div>
        <div className="ui-sidebar-nav__profile__right">
          <div className="ui-sidebar-nav__profile__right__name">
            {userProfile.name}
          </div>
          <div className="ui-sidebar-nav__profile__right__username">
            {userProfile.username}
          </div>
        </div>
      </div>
      <div className="ui-sidebar-nav__navs">
        {navigations.map((navigation) => {
          const isActive = navigation.id === selectedNav;
          const itemClassName = (isActive ? 'ui-sidebar-nav__navs__item--select ' : '') + 'ui-sidebar-nav__navs__item';
          return (
          <div className={itemClassName} key={navigation.id}>
            {isActive && <div className="ui-sidebar-nav__navs__item__arrow">
              
              </div>}
            <div className="ui-sidebar-nav__navs__item__main" role='button' tabIndex={'0'} onClick={()=> {
              setSelectedNav(navigation.id);
              setSelectedSubNav(null);
            }
            }>
              <div className="ui-sidebar-nav__navs__item__main__icon">
                <i className="fa-users"></i>
              </div>
              <div className="ui-sidebar-nav__navs__item__main__name">
                {navigation.title}
              </div>
              {!isEmpty(navigation.count) && (
                <div className="ui-sidebar-nav__navs__item__main__count">
                  {navigation.count}
                </div>
              )}
              {!isEmpty(navigation.children) && (
                <div className="ui-sidebar-nav__navs__item__main__extends" role='button' tabIndex={'0'} onClick={() => onToggerSubPart({id : navigation.id})} >
                  {navigation.open ? <i className="fa-angle-up"></i> : <i className="fa-angle-down"></i> }
                </div>
              )}
            </div>
            {}
            {!isEmpty(navigation.children) && navigation.open && (
              <div className="ui-sidebar-nav__navs__item__parts">
                {navigation.children.map((subPart) =>{
                  const isSubPartSelected = selectedSubNav === subPart.id;
                  const subPartClassName = (isSubPartSelected ? 'ui-sidebar-nav__navs__item__parts__part--selected ' : '') + 'ui-sidebar-nav__navs__item__parts__part';
                  return (
                    <div
                      className={subPartClassName}
                      key={subPart.id}
                    >
                      {/* <div className="ui-sidebar-nav__navs__item__parts__part__step"></div> */}
                      <div className="ui-sidebar-nav__navs__item__parts__part__name" 
                      role='button'
                      tabIndex={'0'}
                      onClick={(()=>{
                        setSelectedNav(navigation.id);
                        setSelectedSubNav(subPart.id);
                        
                      })}>{subPart.title}</div>
                      
                    </div>
                  );

                })}
              </div>
            )}
          </div>
                )
        
                })}
      </div>
      <div className="ui-sidebar-nav__create">
        <div className="ui-sidebar-nav__create__avater">
          <img src={createTask} alt="createTask" />
        </div>
        <div className="ui-sidebar-nav__create__wrapper">
              <div className="ui-sidebar-nav__create__wrapper__descrption"
              >
                Don't have any new task?
              </div>
              <div className="ui-sidebar-nav__create__wrapper__btn">
                  Create new task  +
              </div>
        </div>
      </div>
      </div>
      <div className={"ui-menu-button " + (openSidebar? 'ui-menu-button--close' : '' )} role={'button'} tabIndex={'0'} onClick={()=>isOpenSidebar(true)}>
        <i class="fa fa-bars"></i>
      </div>
    </>
    
  );
};