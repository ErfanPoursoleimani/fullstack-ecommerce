'use client'
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import useDataStore from '@/app/stores/dataStore';

const Footer: React.FC = () => {
  const {products, dict, isRTL} = useDataStore() 
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`${isRTL && "text-right"} w-full bg-gradient-to-b bg-black/5 max-md:mb-13`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black">{dict.logo}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {dict.footerContent}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-[var(--theme)] hover:text-cyan-700 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-[var(--theme)] hover:text-cyan-700 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-[var(--theme)] hover:text-cyan-700 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-[var(--theme)] hover:text-cyan-700 transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">{dict.riceShop}</h4>
            <ul className="space-y-2">
              {products.filter((p) => p.tagId === 1).map((product) => (
                <li key={product.id}><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.product.products[product.label as keyof typeof dict.product.products]}</Link></li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">امور مشتریان</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.contactUs}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.shippingInfo}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.returnsAndRefunds}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.trackYourOrder}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.FAQ}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.bulkOrders}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">{dict.cookingGuides}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">{dict.getInTouch}</h4>
            <ul className="space-y-3">
              <li className="flex flex-row-reverse gap-3">
                <MapPin size={18} className="text-[var(--theme)] mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">اصفهان، خیابان کاوه، خیابان ابوریحان بیرونی، کوچه مهرانگیز 1، نبش مهرانگیز 2، پلاک 4</span>
              </li>
              <li className={`flex ${isRTL && "flex-row-reverse"} gap-3`}>
                <Phone size={18} className="text-[var(--theme)] flex-shrink-0" />
                <Link href="tel:+1234567890" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">
                  +98 991 163 4345
                </Link>
              </li>
              <li className={`flex ${isRTL && "flex-row-reverse"} gap-3`}>
                <Mail size={18} className="text-[var(--theme)] flex-shrink-0" />
                <Link href="mailto:info@ricemarket.com" className="text-gray-700 hover:text-cyan-700 transition-colors text-sm">
                  soleymanirice@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t-2 border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-600 mb-2">{dict.pay}</p>
              <div className="flex space-x-3">
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">VISA</div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">MC</div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-blue-600">AMEX</div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-blue-500">PayPal</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <Link href="#" className="hover:text-cyan-700 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-cyan-700 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link href="#" className="hover:text-cyan-700 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--theme)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm">
            © {currentYear} SoleymaniRice. All rights reserved. Made with care for rice lovers worldwide. Erfan Poursoleimani
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;