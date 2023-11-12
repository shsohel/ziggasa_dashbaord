/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import {
  FaCopyright,
  FaFacebookSquare,
  FaInstagram,
  FaPhone,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { VscMail } from "react-icons/vsc";
import Logo from "../assets/Logo.png";
import Logo2 from "../assets/images/icons/Logo.png";
import { navMenu } from "../pages/api/mode";

export const Footer = () => {
  return (
    <div>
      <div className="container ">
        <div className=" grid grid-cols-1 gap-0 py-6 md:grid-cols-2 md:gap-6  lg:grid-cols-4">
          <div className="col-span-1  my-2 flex justify-center text-center md:block ">
            <div>
              <div className="hidden w-44 dark:block">
                <Image src={Logo} alt="logo" />
              </div>
              <div className="block w-44 dark:hidden">
                <Image width={130} src={Logo2} alt="logo" />
              </div>
              <div className=" my-2">
                <div className="flex items-center gap-2 px-2 text-sm">
                  <span>
                    <FaPhone />
                  </span>
                  <span>+880 1811 275653</span>
                </div>
                <div className="mt-1 flex items-center gap-2 px-2 text-sm">
                  <span>
                    <VscMail />
                  </span>
                  <span>linkcaps@gmail.com</span>
                </div>
              </div>
              <div className="my-2 flex gap-3 px-2">
                <FaFacebookSquare size={20} className="hover:cursor-pointer" />
                <FaInstagram size={20} className="hover:cursor-pointer" />
                <FaTwitter size={20} className="hover:cursor-pointer" />
                <FaYoutube size={20} className="hover:cursor-pointer" />
                <FaLinkedin size={20} className="hover:cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="col-span-2 my-2 px-2  md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-2  gap-4 lg:grid-cols-4 ">
              {navMenu.map((nav, index) => (
                <div key={index} className="col-span-1">
                  <h2 className="text-lg font-semibold uppercase text-primary">
                    {nav.mainItem}
                  </h2>
                  {nav.subItem.map((subNav, index) => (
                    <div key={index} className="flex flex-col ">
                      <Link
                        href={subNav.link}
                        className="py-1 text-[0.9rem] font-semibold"
                      >
                        {subNav.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className=" col-span-2 my-2 lg:col-span-1">
            <h5 className="mb-1 text-2xl font-medium">News Letter</h5>
            <div className=" mt-5">
              <input
                placeholder="Enter Email"
                className="w-full border-0 border-b border-secondary-light bg-inherit    focus:outline-none dark:border-white"
              />
              <div className="mt-2 text-center">
                <button className="bg-primary  py-1 px-2 uppercase text-white">
                  Submit
                </button>
              </div>
            </div>
            <div className=" mt-4 text-[0.8rem] font-semibold text-neutral-400">
              <input type="checkbox" className=" mr-1 bg-white " />
              <span>
                Yes. I'd like to receive marketing emails from Edge and agree to
                it's
                <span className="ml-1 text-sky-500">
                  <Link href="/">terms of business.</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-10 flex items-center justify-center gap-2 border-t py-5 md:mb-0">
          <Link href="#">Linkcaps</Link>
          <span>
            <FaCopyright />
          </span>
          <div>All Rights Reserved 2023</div>
        </div>
      </div>
    </div>
  );
};
