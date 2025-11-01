import { footerSections, legalInfo } from '@/data/company';

import React from 'react';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-xl font-bold text-white mb-4">
                {section.title}
              </h4>
              
              {section.content && (
                <div className="text-sm space-y-1">
                  {section.content.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              )}
              
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-sm">
          <p>{legalInfo.copyrightNotice}</p>
          <div className="mt-2 space-x-4">
            <a href={legalInfo.privacyPolicy} className="hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <a href={legalInfo.termsOfService} className="hover:text-white transition-colors">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;