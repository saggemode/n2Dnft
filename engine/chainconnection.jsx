import {
  bscChain,
  polyChain,
  ethChain,
  hardChain,
  bscTest,
  ethTest,
  polyTest,
} from "../engine/chainchange";
import "sf-font";
import { Col, Dropdown } from "@nextui-org/react";

import React from "react";
import { useEffect } from "react";
import { Button, MenuButton, MenuItem, MenuList, Select } from "@chakra-ui/react";
import { Menu } from "@headlessui/react";
import CustomLink from "../components/CustomLink";
import { AddIcon, ChevronDownIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import Image from "next/image";

const Chainconnection = () => {
  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const blockImage = React.useMemo(() => {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    var init = "Set Network";
    if (selectedValue == eth) {
      return (
        <img src="./ethereumlogo.png" width={"160px"} alt="ethereumlogo" />
      );
    } else if (selectedValue == bsc) {
      return <img src="./bsc.png" width={"160px"} alt="bsc" />;
    } else if (selectedValue == pol) {
      return <img src="./polygonwhite.png" width={"160px"} />;
    } else if (selectedValue == mum) {
      return <h3>Mumbai Testnet</h3>;
    } else if (selectedValue == bsct) {
      return <h3>BSC Testnet</h3>;
    } else if (selectedValue == goe) {
      return <h3>Goerli Testnet</h3>;
    } else if (selectedValue == hard) {
      return <h3>Hardhat Node</h3>;
    } else if (selectedValue == init) {
      return (
        <div className="mt-4">
          <h3>Select Network</h3>
        </div>
      );
    }
  });

  async function enableChain() {
    var bsc = "Binance Smart Chain";
    var poly = "Polygon";
    var eth = "Ethereum";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } else if (eth == selectedValue) {
      ethChain();
    } else if (hard == selectedValue) {
      hardChain();
    } else if (bsct == selectedValue) {
      bscTest();
    } else if (goe == selectedValue) {
      ethTest();
    } else if (mum == selectedValue) {
      polyTest();
    }
  }
  useEffect(() => {
    enableChain();
  }, [selected]);

  return (

    <div className="mr-4 px-4 ">
      <Menu as="div" className="relative inline-block ">
        <Menu.Button className="text-blue-600"> {blockImage}</Menu.Button>
        <Menu.Items
          className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg dark:bg-gray-900  hover:shadow-2xl rounded-lg"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          textValue={selected}
        >
          <Menu.Item textValue="Ethereum" key="Ethereum">
            <img src="ethereumlogo.png" width={"110px"} />
          </Menu.Item>

          <Menu.Item textValue="Binance Smart Chain" key="Binance Smart Chain">
            <img src="bsc.png" width={"110px"} />
          </Menu.Item>

          <Menu.Item textValue="Polygon" key="Polygon">
            <img src="polygonwhite.png" width={"110px"} />
          </Menu.Item>

          <Menu.Item textValue="Hardhat" key="Hardhat">
           <h5> HardHat Node</h5>
          </Menu.Item>

          {/* <Menu.Item textValue="Goerli" key="Goerli">
            Goerli TestNet
          </Menu.Item> */}

          {/* <Menu.Item textValue="Bsctest" key="Bsctest">
            BSC TestNet
          </Menu.Item> */}

          {/* <Menu.Item textValue="Mumbai" key="Mumbai">
            Mumbai TestNet
          </Menu.Item> */}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Chainconnection;
