import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import CustomLink from "./CustomLink";
import Link from "next/link";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { SlMenu } from "react-icons/sl";
import { GrClose } from "react-icons/gr";

import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import ConnectChain from "../engine/connectchain";

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/listed-nfts";
      case 2:
        return "/my-nfts";

      default:
        break;
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);

            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 transition duration-300
        ${
          active === item
            ? "dark:text-white text-nft-black-1"
            : "dark:text-nft-gray-3 text-nft-gray-2"
        }
         `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        setIsOpen(false);

        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case "/":
      if (active !== "Explore NFTs") setActive("Explore NFTs");
      break;
    case "/listed-nfts":
      if (active !== "Listed NFTs") setActive("Listed NFTs");
      break;
    case "/my-nfts":
      if (active !== "My NFTs") setActive("My NFTs");
      break;

    case "/create-nft":
      setActive("");
      break;

    default:
      setActive("");
  }
};

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // useEffect(() => {
  //   setTheme("dark");
  // }, [setTheme]);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [active, router, router.pathname]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1 dark:shadow-md shadow-md">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {
              setActive("Explore NFTs");
            }}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={40}
              height={40}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-bold text-xl ml-1">
              BridgeHead
            </p>
          </div>
        </Link>

        <Link href="/">
          <div
            className="hidden md:flex cursor-pointer"
            onClick={() => {
              setActive("Explore NFTs");
              setIsOpen(false);
            }}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={40}
              height={40}
              alt="logomobile"
            />
          </div>
        </Link>

        <div className="flex-1 flexCenter w-full dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 mr-4 px-4 mx-4 rounded-md   sm:w-full sm:py-3  ">
          <FaSearch className={theme === "light" ? "filter invert" : ""} />

          <input
            type="text"
            placeholder="Search NFT..."
            className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-2 font-normal text-xs outline-none  "
            //onChange={(e) => setDebouncedSearch(e.target.value)}
            //value={debouncedSearch}
          />
        </div>
      </div>

      {/* dropdown menu */}
      <div className="mr-4 px-4 ">
        <Menu as="div" className="relative inline-block ">
          <Menu.Button className="text-blue-600">hello</Menu.Button>
          <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg dark:bg-gray-900  hover:shadow-2xl rounded-lg">
            <Menu.Item>
              <CustomLink className="dropdown-link" href="/pcreate">
                Create N2D
              </CustomLink>
            </Menu.Item>
            <Menu.Item>
              <CustomLink className="dropdown-link" href="/post">
                New Post
              </CustomLink>
            </Menu.Item>

            <Menu.Item>
              <CustomLink className="dropdown-link" href="/admin/dashboard">
                Admin Dashboard
              </CustomLink>
            </Menu.Item>

            <Menu.Item>
              <a
                className="dropdown-link"
                href="#"
                // onClick={logoutClickHandler}
              >
                Logout
              </a>
            </Menu.Item>

            <Menu.Item>
              <button
                className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
                onClick={toggleTheme}
              >
                <span className="text-lg">
                  {isMounted && theme === "dark" ? (
                    <FaSun className="text-xl bg-nft-dark" />
                  ) : (
                    <FaMoon className="text-xl" />
                  )}
                </span>
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      <ConnectChain />

      {/* dark theme mode button */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-4">
          <button
            className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
            onClick={toggleTheme}
          >
            <span className="text-lg">
              {isMounted && theme === "dark" ? (
                <FaSun className="text-xl bg-nft-dark" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </span>
          </button>
        </div>

        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup
              setActive={setActive}
              router={router}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2 cursor-pointer">
        {isOpen ? (
          <GrClose
            onClick={() => setIsOpen(false)}
            className={theme === "light" ? "filter invert" : ""}
          />
        ) : (
          <SlMenu
            onClick={() => setIsOpen(true)}
            className={theme === "light" ? "filter invert" : ""}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 flex justify-center">
              <ButtonGroup
                setActive={setActive}
                router={router}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
