import React, { Fragment } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'

type MenuProps = {
  title: string
  links: LinkProps[]
}

type LinkProps = {
  text: string
  href: string
}

const BreedMenu: React.FC<MenuProps> = ({ title, links }) => {
  return (
    <div className="">
      <HeadlessMenu as="div" className="relative inline-block text-left">
        <div>
          <HeadlessMenu.Button className="inline-flex justify-between w-full px-3 py-2 text-sm font-medium text-neutral-100 bg-neutral-900 rounded-lg bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:ring-opacity-75 transition-all">
            {title}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-sky-200 hover:text-sky-100"
              aria-hidden="true"
            />
          </HeadlessMenu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 text-neutral-900 transition-all">
              {links.map((link, index) => (
                <HeadlessMenu.Item key={index}>
                  {({ active }) => (
                    <MyLink href={link.href}>
                      <button
                        className={`${
                          active ? 'bg-slate-300 ' : ''
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {link.text}
                      </button>
                    </MyLink>
                  )}
                </HeadlessMenu.Item>
              ))}
            </div>
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  )
}

const MyLink: React.FC<any> = props => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

export default BreedMenu
