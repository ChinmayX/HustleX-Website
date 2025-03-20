import Image from "next/image";
import React from "react";

const links = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Career", href: "/career" },
  {
    name: "Get access",
    href: "https://play.google.com/store/apps/details?id=com.hustlex.mvp",
  },
];

const policies = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "Cancellation & Refund", href: "/cancellation&refund" },
];

const socialLinks = [
  { href: "https://twitter.com/hustlexclub", src: "/twitter.png" },
  { href: "https://www.instagram.com/hustlex.club/", src: "/instagram.png" },
  { href: "mailto:chinmaypdev.offical@gmail.com", src: "/mail.png" },
  {
    href: "https://www.linkedin.com/company/hustlexclub/",
    src: "/linkdinLogo.png",
  },
];

export const Footer = () => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat p-8 xl:p-16 border-t-1 border-neutral-900"
      style={{ backgroundImage: "url(/footer-bg.png)" }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-white">
        <div className="flex flex-col items-center justify-between gap-2 xl:items-start ">
          <Image
            src="/small-white.png"
            alt="HustleX Logo"
            width={72}
            height={72}
            className="mb-2"
          />
          <div className="flex space-x-4 mb-4 ">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 p-3 flex items-center justify-center bg-gray-100/10 border-gray-100/80 border-1 rounded-full transition-transform transform hover:-translate-x-1 hover:-translate-y-1 shadow-xl"
              >
                <Image
                  src={social.src}
                  alt="Social Icon"
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
          <p className="text-gray-100/60 text-m text-center xl:text-left">
            © 2025 | HustleX
          </p>
          <p className="text-gray-100/40 text-xs text-center xl:text-left">
            HustleX is a brand owned and operated by <br /> XELITE Studios PVT
            LTD
          </p>
          <p className="text-gray-100/40 text-xs text-center xl:text-left">
            #12 Nelamangala Bangalore India
          </p>
        </div>

        <div className="flex flex-col space-y-2  text-center xl:px-20 px-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-s font-medium text-gray-50/60 uppercase hover:underline flex justify-between items-center mb-6"
            >
              {link.name}{" "}
              <Image width={16} height={16} src="/icon.svg" alt="" />
            </a>
          ))}
        </div>

        <div className="flex flex-col space-y-2  text-center xl:px-20 px-8">
          {policies.map((policy, index) => (
            <a
              key={index}
              href={policy.href}
              className="text-s font-medium text-gray-50/60 uppercase hover:underline flex justify-between items-center mb-6 "
            >
              {policy.name}{" "}
              <Image width={16} height={16} src="/icon.svg" alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
